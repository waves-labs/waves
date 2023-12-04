import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    TokenTypeEnum: ["SYNTH", "WAVE", "ART", "ORDER"],
    SynthTypeEnum: ["FESTIVAL", "CONCERT", "TOUR", "CONFERENCE", "OTHER"],
    WaveTypeEnum: ["MUSIC", "ART", "FILM", "GAME", "BOOK", "OTHER", "SPORT"],
    ArtTypeEnum: [
      "ABSTRACT",
      "REALISM",
      "SURREALISM",
      "IMPRESSIONISM",
      "EXPRESSIONISM",
      "FIGURATIVE",
      "CONTEMPORARY",
      "MODERN",
      "OTHER",
    ],
    OrderTypeEnum: ["DASHIKI", "TSHIRT", "POSTER", "HOODIE", "HAT", "MARKER", "CRAYON", "PENCIL"],
    TransferStatusEnum: ["IDLE", "PENDING", "COMPLETE", "FAILED", "CANCELLED"],
  },
  tables: {
    // Waves
    SynthContract: {
      valueSchema: {
        synthType: "SynthTypeEnum",
        artWhitelist: "address[]",
        waveWhitelist: "address[]",
        ticketWhitelist: "address[]",
      },
    },
    WaveContract: {
      valueSchema: {
        waveType: "WaveTypeEnum",
        startTime: "uint256",
        duration: "uint256",
      },
    },
    WaveAttributes: {
      valueSchema: {
        color: "string",
      },
    },
    ArtContract: {
      valueSchema: {
        artType: "ArtTypeEnum",
        script: "string",
      },
    },
    Order: {
      valueSchema: {
        orderType: "OrderTypeEnum",
        artId: "bytes32",
      },
    },
    // Singletons
    WaveResolverAddrs: {
      keySchema: {},
      valueSchema: "address",
    },
    OrderTokenAddrs: {
      keySchema: {},
      valueSchema: "address",
    },
    SynthAccountImplAddrs: {
      keySchema: {},
      valueSchema: "address",
    },
    WavesAddrs: {
      keySchema: {},
      valueSchema: "address",
    },
    // GENERAL
    Asset: {
      valueSchema: {
        image: "string",
        model: "string",
      },
    },
    Identity: {
      valueSchema: {
        createdAt: "uint256",
        metadata: "string",
      },
    },
    TransferStatus: "TransferStatusEnum",
    // OWNERSHIP
    Owner: "address",
    Organizer: "address",
    Artist: "address",
    Creative: "address",
    Token: {
      valueSchema: {
        id: "uint256",
        addrs: "address",
        account: "address",
      },
    },
    // SANITY CHECK
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
  },
  systems: {
    SynthSystem: {
      name: "Synth",
      openAccess: true,
    },
    WaveSystem: {
      name: "Wave",
      openAccess: true,
    },
    ArtSystem: {
      name: "Art",
      openAccess: true,
    },
    OrderSystem: {
      name: "Order",
      openAccess: true,
    },
    TokenSystem: {
      name: "Token",
      openAccess: false,
      accessList: ["SynthSystem", "WaveSystem", "ArtSystem", "OrderSystem"],
    },
  },
  modules: [
    {
      name: "UniqueEntityModule",
      root: true,
      args: [],
    },
    {
      name: "KeysWithValueModule",
      root: true,
      args: [],
    },
  ],
});
