// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

// import { IEAS, AttestationRequest, AttestationRequestData } from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
// import { NO_EXPIRATION_TIME, EMPTY_UID } from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

import "../interfaces/IERC6551Account.sol";
import "../interfaces/IERC6551Executable.sol";

contract Synth is IERC165, IERC1271, IERC6551Account, IERC6551Executable {
    uint256 public state;

    constructor() {
        state = 0;
    }

    // error InvalidEAS();

    // // The address of the global EAS contract.
    // IEAS private immutable _eas;

    // /// @notice Creates a new ExampleAttester instance.
    // /// @param eas The address of the global EAS contract.
    // constructor(IEAS eas) {
    //     if (address(eas) == address(0)) {
    //         revert InvalidEAS();
    //     }

    //     _eas = eas;
    // }

    // /// @notice Attests to a schema that receives a uint256 parameter.
    // /// @param schema The schema UID to attest to.
    // /// @param input The uint256 value to pass to to the resolver.
    // /// @return The UID of the new attestation.
    // function attestUint(bytes32 schema, uint256 input) external returns (bytes32) {
    //     return _eas.attest(
    //         AttestationRequest({
    //             schema: schema,
    //             data: AttestationRequestData({
    //                 recipient: address(0), // No recipient
    //                 expirationTime: NO_EXPIRATION_TIME, // No expiration time
    //                 revocable: true,
    //                 refUID: EMPTY_UID, // No references UI
    //                 data: abi.encode(input), // Encode a single uint256 as a parameter to the schema
    //                 value: 0 // No value/ETH
    //             })
    //         })
    //     );
    // }

    receive() external payable {}

    function execute(address to, uint256 value, bytes calldata data, uint256 operation)
        external
        payable
        returns (bytes memory result)
    {
        require(_isValidSigner(msg.sender), "Invalid signer");
        require(operation == 0, "Only call operations are supported");

        ++state;

        bool success;
        (success, result) = to.call{value: value}(data);

        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

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

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return (
            interfaceId == type(IERC165).interfaceId || interfaceId == type(IERC6551Account).interfaceId
                || interfaceId == type(IERC6551Executable).interfaceId
        );
    }

    function token() public view returns (uint256, address, uint256) {
        bytes memory footer = new bytes(0x60);

        assembly {
            extcodecopy(address(), add(footer, 0x20), 0x4d, 0x60)
        }

        return abi.decode(footer, (uint256, address, uint256));
    }

    function owner() public view returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = token();
        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    function _isValidSigner(address signer) internal view returns (bool) {
        return signer == owner();
    }
}
