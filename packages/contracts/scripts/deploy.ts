import { ethers } from 'hardhat';

async function main() {
  const AuditBook = await ethers.getContractFactory('AuditBook');
  const auditBook = await AuditBook.deploy(
    '0x4491d1c47bbde6746f878400090ba6935a91dab6',
    ethers.utils.parseEther('1000'),
    'ipfs://QmZyDPjt35VYvFLB7r76ME78ADMH7ZvuMGbeV4UzbPjPHU'
  );

  await auditBook.deployed();

  console.log(`AuditBookNFT deployed to ${auditBook.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
