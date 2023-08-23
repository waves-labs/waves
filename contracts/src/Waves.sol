// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

import {Wave} from "./Types.sol";
import {Ticket} from "./Ticket.sol";

contract Waves is ERC1155, AccessControl {
    event WaveRewarded(address indexed to, address indexed waves, uint256 indexed tokenId);

    bytes32 public constant WAVE_REWARDER_ROLE = keccak256("WAVE_REWARDER_ROLE");
    address public ticket;
    mapping(uint256 => Wave) private waves;

    constructor(address _ticket, address _owner, string memory _baseUri) ERC1155(_baseUri) {
        ticket = _ticket;

        _grantRole(WAVE_REWARDER_ROLE, 0x6Bd018B28CE7016b65384e15faC102dbC4190E03); // Syn Multisig
        _grantRole(WAVE_REWARDER_ROLE, 0x4A486C866050dD2e40410B693609D69096d5661B); // EAS Resolver
        _grantRole(WAVE_REWARDER_ROLE, _owner);
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    function updateEventJSON(string memory newuri) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setURI(newuri);
    }

    function addWave(Wave memory _wave) external onlyRole(DEFAULT_ADMIN_ROLE) {
        waves[_wave.id] = _wave;
    }

    function removeWave(uint256 _id) external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete waves[_id];
    }

    function rewardWave(uint256 id, address to) external onlyRole(WAVE_REWARDER_ROLE) {
        require(waves[id].id == id, "Waves: wave doesn't exist");
        require(waves[id].claimedAmount > waves[id].maxAmount, "Waves: waves claimed");
        require(balanceOf(to, id) == 0, "Waves: user already claimed");

        Ticket ticketData = Ticket(ticket);
        require(ticketData.balanceOf(to) > 0, "Waves: user no ticket");

        uint256 startTime = ticketData.startTime();
        uint256 endTime = ticketData.endTime();

        require(block.timestamp > startTime && block.timestamp < endTime, "Waves: event not active");

        _mint(to, id, 1, "");

        emit WaveRewarded(to, address(this), id);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
