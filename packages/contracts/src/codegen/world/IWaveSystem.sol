// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

/* Autogenerated file. Do not edit manually. */

import { WaveTypeEnum } from "./../common.sol";

/**
 * @title IWaveSystem
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IWaveSystem {
  error NotValidOwner();
  error NotValidStartTime();
  error NotValidDuration();

  function createWave(
    WaveTypeEnum waveType,
    uint16 maxAmount,
    uint256 startTime,
    uint256 duration,
    address artist,
    address creative,
    string calldata name,
    string calldata color
  ) external;

  function modifyWave(address wave, uint256 startTime, uint256 duration, string calldata color) external;

  function mintWaveToken(address wave, address synth, address account) external;

  function setWaveStartTime(address wave, uint256 startTime) external;

  function setWaveDuration(address wave, uint256 duration) external;
}