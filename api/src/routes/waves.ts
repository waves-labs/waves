import { ethers } from "ethers";
import { Request, Response, Router } from "express";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

const chainIdMap = {
  420: "optimism-goerli",
  85431: "base-goerli",
  999: "zora-goerli",
  919: "mode-sepolia",
};

const chainIdToEASMap = {
  420: "0x1a5650D0EcbCa349DD84bAFa85790E3e6955eb84",
  85431: "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A",
  999: "0x086B4803d486a56bbdFAB10b839954A7542F17C0",
  919: "0x2FC89594E0FeDE3faB22089F815e7371e7fF289B",
};

type EventName = "coachella-2024" | "lollapalooza-chicago-2024";
type Artist = "burna-boy" | "bad-bunny" | "drake" | "taylor-swift" | "wizkid" | "kendrick-lamar" | "sza";

const eventToArtistToWaveIDMap: Record<EventName, Record<Artist, number | null>> = {
  "coachella-2024": {
    "burna-boy": 1,
    "bad-bunny": 2,
    drake: 3,
    "taylor-swift": 4,
    "kendrick-lamar": null,
    sza: null,
    wizkid: null,
  },
  "lollapalooza-chicago-2024": {
    wizkid: 1,
    "kendrick-lamar": 2,
    sza: 3,
    "taylor-swift": 4,
    "burna-boy": null,
    "bad-bunny": null,
    drake: null,
  },
};

export const wavesRouter = Router();

wavesRouter.post("/claim", async function (req: Request, res: Response) {
  const body = req.body as { eventName: EventName; synth: string; artist: Artist };

  if (!body.eventName || !body.synth || !body.artist) {
    res.status(400).send({ error: "Missing synth or waveID" });
    return;
  }

  // if (!req.session.address || !req.session.chainId) {
  //   reply.code(400).send({ error: "Missing address or chainId" });
  //   return;
  // }

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    ethers.getDefaultProvider(chainIdMap[req.session.chainId ?? 85431])
  );

  // TODO: Verify that user owns synth
  // TODO: Verify that wave is not claimed
  // TODO: Verify that wave can be claimed

  const eas = new EAS(chainIdToEASMap[req.session.chainId ?? 85431]);
  // @ts-ignore
  eas.connect(wallet);

  const waveID = eventToArtistToWaveIDMap[body.eventName][body.artist];

  if (!waveID) {
    res.status(400).send({ error: "Invalid waveID" });

    return;
  }

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("string eventName, address ticketAddrs, address wavesAddrs, uint256 waveId");
  const encodedData = schemaEncoder.encodeData([
    { name: body.eventName, value: 1, type: "string" },
    { name: "ticketAddrs", value: 1, type: "address" },
    { name: "wavesAddrs", value: 1, type: "address" },
    { name: waveID.toString(), value: 1, type: "uint256" },
  ]);

  // Make on-chain attestaion
  const schemaUID = "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995";

  // const tx = await eas.attest({
  //   schema: schemaUID,
  //   data: {
  //     recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
  //     expirationTime: 0,
  //     revocable: true, // Be aware that if your schema is not revocable, this MUST be false
  //     data: encodedData,
  //   },
  // });

  // const newAttestationUID = await tx.wait();

  // console.log("New attestation UID:", newAttestationUID);

  // Wait for the waves resolver to mint the NFT

  res.send({ success: true });
});
