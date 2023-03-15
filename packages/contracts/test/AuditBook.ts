import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import '@nomiclabs/hardhat-ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const initialPrice = ethers.utils.parseEther('1000');
const initialTokenUri = 'ipfs://QmZyDPjt35VYvFLB7r76ME78ADMH7ZvuMGbeV4UzbPjPHU';

describe('AuditBookNFT', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAuditBookFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TestERC20 = await ethers.getContractFactory('TestERC20');
    const testERC20 = await TestERC20.deploy(ethers.utils.parseEther('200000'));
    await testERC20
      .connect(owner)
      .transfer(otherAccount.address, ethers.utils.parseEther('100000'));

    const AuditBook = await ethers.getContractFactory('AuditBook');
    const auditBook = await AuditBook.deploy(
      testERC20.address,
      initialPrice,
      initialTokenUri
    );

    return { auditBook, testERC20, owner, otherAccount };
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { auditBook, owner } = await loadFixture(deployAuditBookFixture);
      expect(await auditBook.owner()).to.equal(owner.address);
    });
    it('Should set the right chai address', async function () {
      const { auditBook, testERC20 } = await loadFixture(
        deployAuditBookFixture
      );
      expect(await auditBook.chai()).to.equal(testERC20.address);
    });
    it('Should set the right initial price', async function () {
      const { auditBook } = await loadFixture(deployAuditBookFixture);
      expect(await auditBook.price()).to.equal(initialPrice);
    });
    it('Should set the right initial token uri', async function () {
      const { auditBook } = await loadFixture(deployAuditBookFixture);
      expect(await auditBook.tokenURI(0)).to.equal(initialTokenUri);
    });
    it('Should set the right initial chai token balance', async function () {
      const { auditBook, testERC20, owner, otherAccount } = await loadFixture(
        deployAuditBookFixture
      );
      expect(await testERC20.balanceOf(owner.address)).to.equal(
        ethers.utils.parseEther('100000')
      );
      expect(await testERC20.balanceOf(otherAccount.address)).to.equal(
        ethers.utils.parseEther('100000')
      );
    });
  });

  describe('Mint', function () {
    it('Should success', async function () {
      const { auditBook, testERC20, owner, otherAccount } = await loadFixture(
        deployAuditBookFixture
      );
      await expect(testERC20.approve(auditBook.address, initialPrice)).not.to.be
        .reverted;
      await expect(auditBook.safeMint(owner.address)).not.to.be.reverted;
      expect(await auditBook.balanceOf(owner.address)).to.equal(1);
      expect(await auditBook.ownerOf(0)).to.equal(owner.address);

      await expect(
        testERC20.connect(otherAccount).approve(auditBook.address, initialPrice)
      ).not.to.be.reverted;
      await expect(
        auditBook.connect(otherAccount).safeMint(otherAccount.address)
      ).not.to.be.reverted;
      expect(await auditBook.balanceOf(otherAccount.address)).to.equal(1);
      expect(await auditBook.ownerOf(1)).to.equal(otherAccount.address);
    });
    it('Should fail on the second mint to same address', async function () {
      const { auditBook, testERC20, owner } = await loadFixture(
        deployAuditBookFixture
      );
      await expect(testERC20.approve(auditBook.address, initialPrice)).not.to.be
        .reverted;
      await expect(auditBook.safeMint(owner.address)).not.to.be.reverted;
      expect(await auditBook.balanceOf(owner.address)).to.equal(1);
      expect(await auditBook.ownerOf(0)).to.equal(owner.address);

      await expect(testERC20.approve(auditBook.address, initialPrice)).not.to.be
        .reverted;
      await expect(auditBook.safeMint(owner.address)).to.be.revertedWith(
        'Already has an AuditBook'
      );
      expect(await auditBook.balanceOf(owner.address)).to.equal(1);
    });
  });

  describe('Transfers', function () {
    it('Should success', async function () {
      const { auditBook, testERC20, owner, otherAccount } = await loadFixture(
        deployAuditBookFixture
      );
      await expect(testERC20.approve(auditBook.address, initialPrice)).not.to.be
        .reverted;
      await expect(auditBook.safeMint(owner.address)).not.to.be.reverted;
      expect(await auditBook.balanceOf(owner.address)).to.equal(1);
      expect(await auditBook.ownerOf(0)).to.equal(owner.address);

      await expect(
        auditBook['safeTransferFrom(address,address,uint256)'](
          owner.address,
          otherAccount.address,
          0
        )
      ).not.to.be.reverted;
      expect(await auditBook.balanceOf(owner.address)).to.equal(0);
      expect(await auditBook.balanceOf(otherAccount.address)).to.equal(1);
      expect(await auditBook.ownerOf(0)).to.equal(otherAccount.address);
    });
  });

  describe('TokenURI', function () {
    describe('setTokenURI', function () {
      it('Should success by owner', async function () {
        const { auditBook } = await loadFixture(deployAuditBookFixture);

        await expect(auditBook.setTokenURI('ipfs://newTokenUri')).not.to.be
          .reverted;
        expect(await auditBook.tokenURI(0)).to.equal('ipfs://newTokenUri');
      });
      it('Should fail by otherAccount', async function () {
        const { auditBook, otherAccount } = await loadFixture(
          deployAuditBookFixture
        );

        await expect(
          auditBook.connect(otherAccount).setTokenURI('ipfs://newTokenUri')
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('chai', function () {
    describe('setPrice', function () {
      const newPrice = ethers.utils.parseEther('2000');

      it('Should success by owner', async function () {
        const { auditBook, testERC20, owner } = await loadFixture(
          deployAuditBookFixture
        );

        await expect(auditBook.setPrice(newPrice)).not.to.be.reverted;
        expect(await auditBook.price()).to.equal(newPrice);

        await expect(testERC20.approve(auditBook.address, initialPrice)).not.to
          .be.reverted;
        await expect(auditBook.safeMint(owner.address)).to.be.revertedWith(
          'ERC20: insufficient allowance'
        );
        expect(await auditBook.balanceOf(owner.address)).to.equal(0);
      });

      it('Should fail by otherAccount', async function () {
        const { auditBook, testERC20, owner, otherAccount } = await loadFixture(
          deployAuditBookFixture
        );

        await expect(
          auditBook.connect(otherAccount).setPrice(newPrice)
        ).to.be.revertedWith('Ownable: caller is not the owner');

        await expect(
          testERC20
            .connect(otherAccount)
            .approve(auditBook.address, initialPrice)
        ).not.to.be.reverted;
        await expect(
          auditBook.connect(otherAccount).safeMint(otherAccount.address)
        ).not.to.be.reverted;
        expect(await auditBook.balanceOf(otherAccount.address)).to.equal(1);
        expect(await auditBook.ownerOf(0)).to.equal(otherAccount.address);
      });
    });

    describe('withdraw', function () {
      it('Should success by owner', async function () {
        const { auditBook, testERC20, owner, otherAccount } = await loadFixture(
          deployAuditBookFixture
        );

        expect(await testERC20.balanceOf(auditBook.address)).to.equal(0);

        await expect(
          testERC20
            .connect(otherAccount)
            .approve(auditBook.address, initialPrice)
        ).not.to.be.reverted;
        await expect(
          auditBook.connect(otherAccount).safeMint(otherAccount.address)
        ).not.to.be.reverted;

        expect(await testERC20.balanceOf(auditBook.address)).to.equal(
          initialPrice
        );
        expect(await testERC20.balanceOf(owner.address)).to.equal(
          ethers.utils.parseEther('100000')
        );

        await expect(auditBook.withdraw()).not.to.be.reverted;

        expect(await testERC20.balanceOf(auditBook.address)).to.equal(0);
        expect(await testERC20.balanceOf(owner.address)).to.equal(
          ethers.utils.parseEther('100000').add(initialPrice)
        );
      });

      it('Should fail by otherAccount', async function () {
        const { auditBook, otherAccount } = await loadFixture(
          deployAuditBookFixture
        );

        await expect(auditBook.connect(otherAccount).withdraw()).to.be.reverted;
      });
    });
  });
});
