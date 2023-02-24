const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const { BigNumber } = require('ethers');

describe('AuditBookNFT', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAuditBookFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const TestERC20 = await hre.ethers.getContractFactory('TestERC20');
        const testERC20 = await TestERC20.deploy(BigNumber.from(10).pow(20));

        const AuditBook = await hre.ethers.getContractFactory('AuditBook');
        const auditBook = await AuditBook.deploy(
            testERC20.address,
            BigNumber.from(10).pow(18),
            'ipfs://QmZyDPjt35VYvFLB7r76ME78ADMH7ZvuMGbeV4UzbPjPHU'
        );

        return { auditBook, testERC20, owner, otherAccount };
    }

    describe('Deployment', function () {
        it('Should set the right owner', async function () {
            const { auditBook, owner } = await loadFixture(
                deployAuditBookFixture
            );
            expect(await auditBook.owner()).to.equal(owner.address);
        });
    });

    describe('Mint', function () {
        it('Should success by owner', async function () {
            const { auditBook, testERC20, owner } = await loadFixture(
                deployAuditBookFixture
            );
            await expect(
                testERC20.approve(auditBook.address, BigNumber.from(10).pow(18))
            ).not.to.be.reverted;
            await expect(auditBook.safeMint(owner.address)).not.to.be.reverted;
        });
        it('Should fail by otherAccount', async function () {
            const { auditBook, testERC20, otherAccount } = await loadFixture(
                deployAuditBookFixture
            );
            await expect(
                testERC20
                    .connect(otherAccount)
                    .approve(auditBook.address, BigNumber.from(10).pow(18))
            ).not.to.be.reverted;
            await expect(
                auditBook.connect(otherAccount).safeMint(otherAccount.address)
            ).to.be.reverted;
        });
    });

    describe('Transfers', function () {
        it('Should success', async function () {
            const { auditBook, testERC20, owner, otherAccount } =
                await loadFixture(deployAuditBookFixture);
            await expect(
                testERC20.approve(auditBook.address, BigNumber.from(10).pow(18))
            ).not.to.be.reverted;
            await expect(auditBook.safeMint(owner.address)).not.to.be.reverted;
            await expect(
                auditBook['safeTransferFrom(address,address,uint256)'](
                    owner.address,
                    otherAccount.address,
                    0
                )
            ).not.to.be.reverted;
        });
    });

    describe('chai', function () {
        describe('setPrice', function () {
            it('Should success by owner', async function () {
                const { auditBook } = await loadFixture(deployAuditBookFixture);

                await expect(auditBook.setPrice(BigNumber.from(10).pow(20))).not
                    .to.be.reverted;
            });

            it('Should fail by otherAccount', async function () {
                const { auditBook, otherAccount } = await loadFixture(
                    deployAuditBookFixture
                );

                await expect(
                    auditBook
                        .connect(otherAccount)
                        .setPrice(BigNumber.from(10).pow(20))
                ).to.be.reverted;
            });
        });

        describe('withdraw', function () {
            it('Should success by owner', async function () {
                const { auditBook } = await loadFixture(deployAuditBookFixture);

                await expect(auditBook.withdraw()).not.to.be.reverted;
            });

            it('Should fail by otherAccount', async function () {
                const { auditBook, otherAccount } = await loadFixture(
                    deployAuditBookFixture
                );

                await expect(auditBook.connect(otherAccount).withdraw()).to.be
                    .reverted;
            });
        });
    });
});
