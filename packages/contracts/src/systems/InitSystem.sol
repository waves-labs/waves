// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {System} from "@latticexyz/world/src/System.sol";

import {WavesAddrs} from "../codegen/tables/WavesAddrs.sol";
import {OrderTokenAddrs} from "../codegen/tables/OrderTokenAddrs.sol";
import {WaveResolverAddrs} from "../codegen/tables/WaveResolverAddrs.sol";
import {SynthAccountImplAddrs} from "../codegen/tables/SynthAccountImplAddrs.sol";

contract InitSystem is System {
    function init(address waves, address order, address waveResolver, address synthAccounImpl) public {
        WavesAddrs.set(waves);
        OrderTokenAddrs.set(order);
        WaveResolverAddrs.set(waveResolver);
        SynthAccountImplAddrs.set(synthAccounImpl);
    }
}
