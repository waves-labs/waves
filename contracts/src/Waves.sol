// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

import "./Synth.sol";
import "./Types.sol";
import "./Ticket.sol";

contract Waves is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    // uint256 public postEventClaimTime;
    address public ticket;
    // address public easRegistry;
    mapping(uint256 => Wave) public waves;

    // bytes32 public constant WAVE_REWARDER_ROLE = keccak256("WAVE_REWARDER_ROLE");

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        // uint256 claimTime,
        address _ticket,
        // address _eas,
        address _owner,
        Wave[] memory _waves,
        string memory _baseUri
    ) ERC1155(_baseUri) {
        // postEventClaimTime = claimTime;
        ticket = _ticket;
        // easRegistry = _eas;

        for (uint256 i = 0; i < _waves.length; i++) {
            waves[_waves[i].id] = _waves[i];

            _tokenIdCounter.increment();
        }

        // _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        // _grantRole(WAVE_REWARDER_ROLE, _owner);
        // _grantRole(WAVE_REWARDER_ROLE, 0x6Bd018B28CE7016b65384e15faC102dbC4190E03);

        _transferOwnership(0x6Bd018B28CE7016b65384e15faC102dbC4190E03);
    }

    // Used by Event Organizer to update the event JSON metadata
    function updateEventJSON(string memory newuri) public {
        _setURI(newuri);
    }

    // Used by Event Organizer to update Waves
    function addWave(Wave memory _wave) public onlyOwner {
        waves[_wave.id] = _wave;
    }

    // Used by Event Organizer to remove Waves
    // function removeWave(uint256 _id) public onlyOwner {
    //     delete waves[_id];

    //     _tokenIdCounter.decrement();
    // }

    // Used by Event Organizer Relayer to mint waves for attendees Synth(ERC-6551)
    function rewardWave(uint256 id, address synth) public onlyOwner {
        _verifyWaveMint(synth, id);

        _mint(synth, id, 1, "");
    }

    // Used by Attendee's Synth(ERC-6551) to claim waves
    // function claimWave(uint256 id) public {
    //     _verifyWaveMint(msg.sender, id);

    //     //TODO: Check Attestation Registry for valid attestation

    //     _mint(msg.sender, id, 1, "");
    // }

    // Used by WAVES app to fetch WAVE tokens for synth
    // function getSynthWaves(address synth) public view returns (WaveUI[] memory) {
    //     uint256[] memory ids = new uint256[](_tokenIdCounter.current());
    //     address[] memory addrs = new address[](_tokenIdCounter.current());

    //     for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
    //         ids[i] = i;
    //         addrs[i] = synth;
    //     }

    //     uint256[] memory balances = balanceOfBatch(addrs, ids);

    //     WaveUI[] memory wavesUI = new WaveUI[](balances.length);

    //     for (uint256 i = 0; i < balances.length; i++) {
    //         if (balances[i] > 0) {
    //             wavesUI[i] = WaveUI(waves[i].id, waves[i].color);
    //         }
    //     }

    //     return wavesUI;
    // }

    // function pause() public onlyOwner {
    //     _pause();
    // }

    // function unpause() public onlyOwner {
    //     _unpause();
    // }

    // function supportsInterface(bytes4 interfaceId) public view override(ERC1155, Owner) returns (bool) {
    //     return super.supportsInterface(interfaceId);
    // }

    function _verifyWaveMint(address to, uint256 id) internal view {
        require(waves[id].id == id, "Waves: wave does not exist");
        require(waves[id].claimedAmount > waves[id].maxAmount, "Waves: waves all claimed");

        require(balanceOf(to, id) == 0, "Waves: user has already claimed");

        Ticket TicketData = Ticket(ticket);

        require(TicketData.balanceOf(to) > 0, "Waves: user has no ticket");

        uint256 startTime = TicketData.startTime();
        require(block.timestamp > startTime, "Waves: event not started");

        uint256 endTime = TicketData.endTime();
        require(block.timestamp < endTime, "Waves: event has ended");
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) onlyOwner {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
