import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
  console.log("🛑 Clave privada no encontrada.");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
  console.log("🛑 URL de la API de Alchemy no encontrada.");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
  console.log("🛑 Dirección de cartera no encontrada.");
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK inicializado por dirección:", address);
  } catch (err) {
    console.error("No se pudo obtener la dirección", err);
    process.exit(1);
  }
})();

export default sdk;
