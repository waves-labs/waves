// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {Ticket} from "./Ticket.sol";
import {Waves} from "./Waves.sol";
import {IERC6551Registry} from "./interfaces/IERC6551Registry.sol";
import {ERC6551_REGISTRY_ADDRESS, SYNTH_ERC6551_IMPLEMENTATION_ADDRESS} from "./Constants.sol";

contract SynthGenerator is ERC721, Pausable, Ownable {
    event SynthMinted(address indexed synth, address indexed owner, address indexed generator, uint256 synthId);

    address private ticketAddrs;
    address private wavesAddrs;
    mapping(address => bool) private attendeeClaimedSynth;

    using Counters for Counters.Counter;

    Counters.Counter private _synthIdCounter;

    constructor(address _ticket, address _owner, string memory _eventName) ERC721(_eventName, "SYNTH") {
        ticketAddrs = _ticket;
        transferOwnership(_owner);
    }

    function connectWaves(address _wavesAddrs) external onlyOwner {
        require(wavesAddrs == address(0), "SynthGen: waves already connected");

        Waves waves = Waves(_wavesAddrs);

        require(waves.ticket() == ticketAddrs, "SynthGen: ticket mismatch");
        require(waves.hasRole(waves.DEFAULT_ADMIN_ROLE(), msg.sender), "SynthGen: owner mismatch");

        wavesAddrs = _wavesAddrs;
    }

    function generateSynth() external whenNotPaused returns (address) {
        require(wavesAddrs != address(0), "SynthGen: waves not connected");
        Ticket ticketContract = Ticket(ticketAddrs);

        require(ticketContract.balanceOf(msg.sender) > 0, "SynthGen: must own ticket");
        require(!attendeeClaimedSynth[msg.sender], "SynthGen: already claimed");

        attendeeClaimedSynth[msg.sender] = true;
        uint256 synthId = _synthIdCounter.current();
        IERC6551Registry erc6551Registry = IERC6551Registry(ERC6551_REGISTRY_ADDRESS);
        bytes memory initCallData =
            abi.encodeWithSignature("initialize(address ticketAddrs, address wavesAddrs)", ticketAddrs, wavesAddrs);

        _synthIdCounter.increment();
        _safeMint(msg.sender, synthId);
        address synth = erc6551Registry.createAccount(
            SYNTH_ERC6551_IMPLEMENTATION_ADDRESS, 0, address(this), synthId, 0, initCallData
        );

        emit SynthMinted(synth, msg.sender, address(this), synthId);

        return synth;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
