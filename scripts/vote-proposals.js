import sdk from "./initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0x31c5840b31A1F97745bDCbB1E46954b686828E0F");

const token = sdk.getToken("0x6eefd78C9C73505AA71A13FeE31D9718775c9086");

(async () => {
  try {
    const amount = 420_000;
    const description =
      "Deberia la DAO mintear un adicional de " +
      amount +
      " tokens en el tesoro?";
    const executions = [
      {
        toAddress: token.getAddress(),
        nativeTokenValue: 0,
        transactionData: token.encoder.encode("mintTo", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]),
      },
    ];

    await vote.propose(description, executions);

    console.log("✅ Propuesta creada con éxito para mintear tokens");
  } catch (error) {
    console.error("no se pudo crear la primera propuesta", error);
    process.exit(1);
  }
})();
