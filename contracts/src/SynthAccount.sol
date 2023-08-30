// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "highlight/erc721/ERC721Generative.sol";
import "@opengsn/contracts/ERC2771Recipient.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import "./interfaces/IERC6551Account.sol";
import "./interfaces/IERC6551Executable.sol";

contract SynthAccount is IERC165, IERC1271, IERC6551Account, IERC6551Executable, ERC721Generative {
    uint256 private _state;

    // External functions
    // function initialize(bytes calldata data) external initializer {
    //     // ERC721Generative.initialize(data, _observability);
    // }

    function generateArt(uint256 tokenId, address to, bytes calldata data) external {
        // ERC721Generative.
        require(_isValidSigner(msg.sender), "Invalid signer");
        // TODO: Mint Art NFT
        // TODO: Burn Synth NFT

        // IERC721(msg.sender).safeTransferFrom(address(this), to, tokenId, data);
    }

    function execute(address to, uint256 value, bytes calldata data, uint256 operation)
        external
        payable
        returns (bytes memory result)
    {
        require(_isValidSigner(msg.sender), "Invalid signer");
        require(operation == 0, "Only call operations are supported");

        ++_state;

        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    receive() external payable {
        ++_state;
    }

    // View functions
    function isValidSigner(address signer, bytes calldata) external view returns (bytes4) {
        if (_isValidSigner(signer)) {
            return IERC6551Account.isValidSigner.selector;
        }

        return bytes4(0);
    }

    function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4 magicValue) {
        bool isValid = SignatureChecker.isValidSignatureNow(owner(), hash, signature);

        if (isValid) {
            return IERC1271.isValidSignature.selector;
        }

        return "";
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721GeneralBase, IERC165)
        returns (bool)
    {
        return (
            interfaceId == type(IERC165).interfaceId || interfaceId == type(IERC6551Account).interfaceId
                || interfaceId == type(IERC6551Executable).interfaceId || ERC721AUpgradeable.supportsInterface(interfaceId)
        );
    }

    function token() external view returns (uint256, address, uint256) {
        return _token();
    }

    function state() external view returns (uint256) {
        return _state;
    }

    function owner() public view virtual override returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = _token();
        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    // virtual

    function _token() internal view returns (uint256, address, uint256) {
        bytes memory footer = new bytes(0x60);

        assembly {
            extcodecopy(address(), add(footer, 0x20), 0x4d, 0x60)
        }

        return abi.decode(footer, (uint256, address, uint256));
    }

    function _isValidSigner(address signer) internal view returns (bool) {
        return signer == owner();
    }
}
