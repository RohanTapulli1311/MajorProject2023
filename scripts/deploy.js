const hre = require('hardhat');

async function main() {

    const Accounts = await hre.ethers.getContractFactory("Accounts")
    const result = await Accounts.deploy();

    await result.deployed();

    console.log("Factory deployed to:", result.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });