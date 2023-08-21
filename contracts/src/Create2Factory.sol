// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Create2.sol";

import "./Synth.sol";
import "./SynthRegistry.sol";
import "./WavesResolver.sol";

contract Create2Factory {
    address public immutable synthRegistry;

    constructor(address _synthRegistry) {
        synthRegistry = _synthRegistry;
    }

    function computeSynthAddress(uint256 _salt) external view returns (address addr) {
        addr = Create2.computeAddress(bytes32(_salt), keccak256(abi.encodePacked(type(Synth).creationCode)));
    }

    function deploySynth(uint256 _salt) external returns (address addr) {
        addr = Create2.deploy(0, bytes32(_salt), type(Synth).creationCode);

        // SynthRegistry(synthRegistry).register(addr);
    }

    // function computeSynthRegistryAddress(uint256 _salt) external view returns (address addr) {
    //     addr = Create2.computeAddress(bytes32(_salt), keccak256(abi.encodePacked(type(SynthRegistry).creationCode)));
    // }

    // function deploySynthRegistry(uint256 _salt, bytes memory bytecode) external returns (address addr) {
    //     addr = Create2.deploy(0, bytes32(_salt), bytecode);

    //     // SynthRegistry(synthRegistry).register(addr);
    // }

    // function computeWavesResolverAddress(uint256 _salt) external view returns (address addr) {
    //     addr = Create2.computeAddress(bytes32(_salt), keccak256(abi.encodePacked(type(WavesResolver).creationCode)));
    // }

    // function deployWavesResolver(uint256 _salt, bytes memory bytecode) external returns (address addr) {
    //     addr = Create2.deploy(0, bytes32(_salt), bytecode);

    //     // WavesResolver(synthRegistry).register(addr);
    // }
}
