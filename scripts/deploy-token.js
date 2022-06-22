import { AddressZero } from "@ethersproject/constants";
import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const tokenAddress = await sdk.deployer.deployToken({
      name: "SECITD Token", // name of the token
      symbol: "STD", // symbol
      primary_sale_recipient: AddressZero, // 0x0000000000000000000000000000000000000000
    });
    console.log(
      "✅ Módulo de token implementado con éxito, dirección:",
      tokenAddress
    );
  } catch (error) {
    console.error("no se pudo implementar el módulo de token", error);
  }
})();
