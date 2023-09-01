// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@opengsn/contracts/ERC2771Recipient.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import {SynthAccount} from "./SynthAccount.sol";

contract Synth is ERC721, Pausable, AccessControl, ERC2771Recipient {
    event SynthMinted(address indexed owner, address indexed synth, address indexed synthAccount, uint256 synthId);

    bool private nftOwnershipToMint;
    address private artist;
    address private organizer;
    mapping(address => bool) public nftWhitelist;
    mapping(address => bool) public waveExists;

    using Counters for Counters.Counter;

    Counters.Counter private _synthIdCounter;

    constructor(
        bool _nftOwnershipToMint,
        address _artist,
        address _organizer,
        string memory _name,
        address[] memory _nftWhitelist
    ) ERC721(_name, "SYNTH") {
        nftOwnershipToMint = _nftOwnershipToMint;
        artist = _artist;
        organizer = _organizer;

        for (uint256 i = 0; i < _nftWhitelist.length; i++) {
            nftWhitelist[_nftWhitelist[i]] = true;
        }

        _setupRole(DEFAULT_ADMIN_ROLE, _organizer);
    }

    function mint(address _nftOwned) external returns (address) {
        // require(waves[id].id == id, "Waves: wave doesn't exist");
        // require(waves[id].claimedAmount > waves[id].maxAmount, "Waves: waves claimed");
        // require(balanceOf(to, id) == 0, "Waves: user already claimed");

        //     ownerClaimedSynth[msg.sender] = true;
        //     uint256 synthId = _synthIdCounter.current();
        //     IERC6551Registry erc6551Registry = IERC6551Registry(ERC6551_REGISTRY_ADDRESS);
        //     bytes memory initCallData =
        //         abi.encodeWithSignature("initialize(address ticketAddrs, address wavesAddrs)", ticketAddrs, wavesAddrs);

        //     _synthIdCounter.increment();
        //     _safeMint(msg.sender, synthId);
        //     address synth = erc6551Registry.createAccount(
        //         SYNTH_ERC6551_IMPLEMENTATION_ADDRESS, 0, address(this), synthId, 0, initCallData
        //     );

        // _mint(to, id, 1, "");

        // emit SynthMinted(to, address(this), id);

        return msg.sender;
    }

    function addToNFTWhitelist(address _nft) external onlyRole(DEFAULT_ADMIN_ROLE) {
        nftWhitelist[_nft] = true;
    }

    function removeFromNFTWhitelist(address nft) external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete nftWhitelist[nft];
    }

    function addWave(address _wave) external onlyRole(DEFAULT_ADMIN_ROLE) {
        waveExists[_wave] = true;
    }

    function removeWave(address wave) external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete waveExists[wave];
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
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
