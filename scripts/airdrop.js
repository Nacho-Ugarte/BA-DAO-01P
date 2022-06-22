import sdk from "./initialize-sdk.js";

const editionDrop = sdk.getEditionDrop(
  "0x2f66A5A2BCB272FFC9EB873E3482A539BEB6f02a"
);

const token = sdk.getToken("0x6eefd78C9C73505AA71A13FeE31D9718775c9086");

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "Aún no se han reclamado NFT, haz que algunos amigos reclamen sus NFT gratuitos!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("✅ Ir al airdrop", randomAmount, "tokens para", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    console.log("🌈 Comenzando el airdrop...");

    await token.transferBatch(airdropTargets);
    console.log(
      "✅ Tokens lanzados exitosamente a todos los holders de NFT!"
    );
  } catch (err) {
    console.error("Falla en airdroppear tokens", err);
  }
})();
