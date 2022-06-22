import sdk from "./initialize-sdk.js";

const editionDrop = sdk.getEditionDrop(
  "0x2f66A5A2BCB272FFC9EB873E3482A539BEB6f02a"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "SECITD DAO", // Name of NFT Collection for DAO
        description: "Una DAO para la Secretaria mas cool.", // Description
        image:
          "https://cdn.dribbble.com/users/1787323/screenshots/9791845/media/81210e0150e626aa9678b53fc46bffa7.png", // Image for NFT
      },
    ]);
    console.log("✅ Un nuevo NFT ha sido creado exitosamente en el drop!");
  } catch (error) {
    console.error("no se pudo crear el nuevo NFT", error);
  }
})();
