import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      /* si falla linea 7 la linea original era -> name: "STD Dao's Proposals", */
      name: "Propuestas de la DAO STD",
      voting_token_address: "0x6eefd78C9C73505AA71A13FeE31D9718775c9086",
      voting_delay_in_blocks: 0,
      voting_period_in_blocks: 6570,
      voting_quorum_fraction: 0,
      proposal_token_threshold: 0,
    });
    console.log(
      "✅ Contrato de voto implementado con éxito, dirección:",
      voteContractAddress
    );
  } catch (err) {
    console.error("No se pudo implementar el contrato de voto", err);
  }
})();
