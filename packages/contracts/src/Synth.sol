// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@opengsn/contracts/src/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import {Wave} from "./Wave.sol";
import {SynthAccount} from "./SynthAccount.sol";
import {ERC6551_REGISTRY_ADDRESS} from "./Constants.sol";
import {IERC6551Registry} from "./interfaces/IERC6551Registry.sol";

contract Synth is ERC721, Pausable, AccessControl, ERC2771Recipient {
    event SynthMinted(address indexed owner, address indexed synth, address indexed synthAccount, uint256 synthId);
    event WaveAdded(address indexed wave);
    event WaveRemoved(address indexed wave);
    event ArtWhitelistAdded(address indexed art);
    event ArtWhitelistRemoved(address indexed art);
    event NFTWhitelistAdded(address indexed nft);
    event NFTWhitelistRemoved(address indexed nft);
    event NFTOwnershipToMintSet(bool indexed nftOwnershipToMint);

    // uint256 public eventDate;
    // uint256 public postEventFreeDuration;
    bool private nftOwnershipToMint;
    address private organizer;
    address private synthAccountImplementation;
    string private metadataURI;
    mapping(address => bool) private nftWhitelist;
    mapping(address => bool) public artWhitelist;
    mapping(address => bool) public waveExists;

    using Counters for Counters.Counter;

    Counters.Counter private _synthIdCounter;

    constructor(
        bool _nftOwnershipToMint,
        address _synthAccountImplementation,
        address _art,
        address _organizer,
        string memory _name,
        string memory _metadataURI,
        address[] memory _nftWhitelist
    ) ERC721(_name, "SYNTH") {
        nftOwnershipToMint = _nftOwnershipToMint;
        synthAccountImplementation = _synthAccountImplementation;
        organizer = _organizer;
        metadataURI = _metadataURI;

        artWhitelist[_art] = true;

        for (uint256 i = 0; i < _nftWhitelist.length; i++) {
            nftWhitelist[_nftWhitelist[i]] = true;
        }

        _setupRole(DEFAULT_ADMIN_ROLE, _organizer);
    }

    function mint(address _nftOwned) external returns (address) {
        require(balanceOf(_msgSender()) == 0, "Synth: already claimed");

        if (nftOwnershipToMint == true) {
            require(nftWhitelist[_nftOwned], "Synth: nft not whitelisted");
            require(IERC721(_nftOwned).balanceOf(_msgSender()) > 0, "Synth: user doesn't own nft");
        }

        uint256 synthId = _synthIdCounter.current();

        bytes memory initCallData = abi.encodeWithSignature("initialize(uint256,address)", 7, organizer);

        _safeMint(_msgSender(), synthId);
        _synthIdCounter.increment();
        address synthAccount = IERC6551Registry(ERC6551_REGISTRY_ADDRESS).createAccount(
            synthAccountImplementation, block.chainid, address(this), synthId, 7, initCallData
        );

        emit SynthMinted(_msgSender(), address(this), address(0), synthId);

        return synthAccount;
    }

    function addToArtWhitelist(address _art) external onlyRole(DEFAULT_ADMIN_ROLE) {
        artWhitelist[_art] = true;

        emit ArtWhitelistAdded(_art);
    }

    function removeFromArtWhitelist(address _art) external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete artWhitelist[_art];

        emit ArtWhitelistRemoved(_art);
    }

    function addToNFTWhitelist(address _nft) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nftWhitelist[_nft] = true;

        emit NFTWhitelistAdded(_nft);
    }

    function removeFromNFTWhitelist(address _nft) external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete nftWhitelist[_nft];

        emit NFTWhitelistRemoved(_nft);
    }

    function setNFTOwnershipToMint(bool _bool) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nftOwnershipToMint = _bool;

        emit NFTOwnershipToMintSet(_bool);
    }

    function setMetadataURI(string memory _metadataURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        metadataURI = _metadataURI;
    }

    function addWave(address _wave) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!waveExists[_wave], "Wave already exists");
        require(
            keccak256(abi.encodePacked(Wave(_wave).symbol())) == keccak256(abi.encodePacked("WAVE")),
            "Wave: invalid symbol"
        );

        waveExists[_wave] = true;

        emit WaveAdded(_wave);
    }

    function removeWave(address wave) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(waveExists[wave], "Wave doesn't exist");

        delete waveExists[wave];

        emit WaveRemoved(wave);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _msgSender() internal view override(Context, ERC2771Recipient) returns (address sender) {
        return super._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Recipient) returns (bytes calldata) {
        return super._msgData();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override whenNotPaused {
        require(from == address(0), "Token is not transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
