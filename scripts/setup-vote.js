import sdk from "./initialize-sdk.js";

const vote = sdk.getVote("0x31c5840b31A1F97745bDCbB1E46954b686828E0F");
const token = sdk.getToken("0x6eefd78C9C73505AA71A13FeE31D9718775c9086");

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Se otorgó con éxito los permisos de contrato de voto para actuar en el contrato de token"
    );
  } catch (error) {
    console.error(
      "no pudo otorgar permisos de contrato de voto en el contrato de token",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    await token.transfer(vote.getAddress(), percent90);

    console.log(
      "✅ Transferidos con éxito " + percent90 + " tokens para votar el contrato"
    );
  } catch (err) {
    console.error("no se pudieron transferir los tokens al contrato de votación", err);
  }
})();
