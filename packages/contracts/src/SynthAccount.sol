// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "highlight/erc721/interfaces/IERC721GeneralMint.sol";
import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

import "./interfaces/IERC6551Account.sol";
import "./interfaces/IERC6551Executable.sol";

contract SynthAccount is
    IERC165,
    IERC1271,
    IERC6551Account,
    IERC6551Executable,
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    enum StyleEnum {
        SHIRT,
        HOODIE,
        HAT,
        DASHIKI,
        PANTS,
        BLANKET,
        POSTER
    }

    enum PaletteEnum {
        MARKER,
        CRAYON,
        PENCIL
    }

    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 private _state;
    uint256 public purchasesRemaining;
    uint256 public artStylesRemaining;
    mapping(address => bool) public artStyleWhitelist;
    mapping(PaletteEnum => bool) public artPalettePurchased;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    // External functions
    function initialize(uint256 _printAmount, address _organizer, address[] memory _artWhitelist)
        external
        initializer
    {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, _organizer);
        _grantRole(UPGRADER_ROLE, _organizer);

        purchasesRemaining = _printAmount;

        for (uint256 i = 0; i < _artWhitelist.length; ++i) {
            artStyleWhitelist[_artWhitelist[i]] = true;
        }
    }

    function purchasePrint(address _art, StyleEnum _style) external returns (uint256, uint256) {
        require(_isValidSigner(_msgSender()), "Invalid signer");
        require(artStyleWhitelist[_art], "Art not whitelisted");
        require(purchasesRemaining > 0, "No prints remaining");

        uint256 tokenId = IERC721GeneralMint(_art).mintOneToOneRecipient(_msgSender());
        // TODO: Send order ro Market Contract

        --purchasesRemaining;

        // TODO: Return the NFT and Order ID
        return (tokenId, 0);
    }

    function purchasePalette(address _art, PaletteEnum _palette) external returns (uint256, uint256) {
        require(_isValidSigner(_msgSender()), "Invalid signer");
        require(!artPalettePurchased[_palette], "Palette already purchased");

        uint256 tokenId = IERC721GeneralMint(_art).mintOneToOneRecipient(_msgSender());
        // TODO: Send order ro Market Contract

        --purchasesRemaining;
        artPalettePurchased[_palette] = true;

        // TODO: Return the NFT and Order ID
        return (tokenId, 0);
    }

    function whitelistArt(address _art) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_isValidSigner(_msgSender()), "Invalid signer");
        artStyleWhitelist[_art] = true;
    }

    function execute(address to, uint256 value, bytes calldata data, uint256 operation)
        external
        payable
        returns (bytes memory result)
    {
        require(_isValidSigner(_msgSender()), "Invalid signer");
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

    // View Functions
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

    // override(ERC721GeneralBase, IERC165)
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlUpgradeable, IERC165)
        returns (bool)
    {
        return (
            interfaceId == type(IERC165).interfaceId || interfaceId == type(IERC6551Account).interfaceId
                || interfaceId == type(IERC6551Executable).interfaceId
                || AccessControlUpgradeable.supportsInterface(interfaceId)
        );
    }

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function token() external view returns (uint256, address, uint256) {
        return _token();
    }

    function state() external view returns (uint256) {
        return _state;
    }

    function owner() public view virtual returns (address) {
        (uint256 chainId, address tokenContract, uint256 tokenId) = _token();
        if (chainId != block.chainid) return address(0);

        return IERC721(tokenContract).ownerOf(tokenId);
    }

    // Virtual Functions
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

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
