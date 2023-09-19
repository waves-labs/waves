import { ethers, Contract } from "ethers";
import { Request, Response, Router } from "express";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

// import { synthABI, synthAccountABI, waveABI } from "../../../clients/app/src/generated";

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

export const wavesRouter = Router();

wavesRouter.post("/mint", async function (req: Request, res: Response) {
  const body = req.body as { synth: string; synthAccount: string; wave: string };

  if (!body.synth || !body.synthAccount || !body.wave) {
    res.status(400).send({ error: "Missing synthAccount or waveID" });
    return;
  }

  if (!req.session.siwe?.address || !req.session.siwe.chainId) {
    res.status(400).send({ error: "Missing address or chainId" });
    return;
  }

  const provider = ethers.getDefaultProvider(chainIdMap[req.session.chainId ?? 85431]);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  // TODO: Verify that user owns synth
  // TODO: Verify that wave is not already minted
  // const synth = new Contract(body.synth, synthABI, provider);
  // const synthAccount = new Contract(body.synthAccount, synthAccountABI, provider);
  // const wave = new Contract(body.wave, waveABI, provider);

  const eas = new EAS(chainIdToEASMap[req.session.chainId ?? 85431]);
  eas.connect(wallet);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("address synth, address synthAccount, address wave");
  const encodedData = schemaEncoder.encodeData([
    { name: "synth", value: body.synth, type: "address" },
    { name: "synthAccount", value: body.synthAccount, type: "address" },
    { name: "wave", value: body.wave, type: "address" },
  ]);

  // Make on-chain attestaion
  const schemaUID = "0xea661a71e489106d7e14202004fa984bb857db3956c358fac2bdb115f6e21dc1";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: req.session.siwe.address,
      // expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);

  res.status(200).send({ id: newAttestationUID });
});
