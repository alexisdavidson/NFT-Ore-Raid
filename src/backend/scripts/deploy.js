async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Fill with correct data and uncomment the correct network before deploy!
  // const teamWallet = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // localhost
  // const whitelistedAddresses = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]; // localhost
  const teamWallet = "0x7327ccC29B7cd5f0Bdc1957c5E32BE1f6Bf31446"; // goerli
  const whitelistedAddresses = ["0xD71E736a7eF7a9564528D41c5c656c46c18a2AEd", "0x7327ccC29B7cd5f0Bdc1957c5E32BE1f6Bf31446"]; // goerli
  
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(teamWallet, whitelistedAddresses);
  console.log("NFT contract address", nft.address)
  
  saveFrontendFiles(nft, "NFT");

  console.log("Frontend files saved")
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
