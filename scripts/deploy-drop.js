import { ethers } from "ethers";
import sdk from "./initialize-sdk.js";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "SECITD DAO", // Name of NFT Collection for DAO
      description: "Una DAO para la Secretaria mas cool.", // Description
      image:
        "https://cdn.dribbble.com/users/1787323/screenshots/9791845/media/81210e0150e626aa9678b53fc46bffa7.png", // PFP for NFT collection
      primary_sale_recipient: ethers.constants.AddressZero,
    });

    const editionDrop = sdk.getEditionDrop(editionDropAddress);

    const metadata = await editionDrop.metadata.get();

    console.log(
      "✅ Contrato editionDrop implementado con éxito, dirección:",
      editionDropAddress
    );
    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log("no se pudo implementar el contrato editionDrop", error);
  }
})();
