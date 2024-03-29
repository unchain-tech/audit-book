import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';

dotenv.config();
const {
  POLYGONSCAN_API_KEY,
  POLYGON_ALCHEMY_URL,
  MUMBAI_ALCHEMY_URL,
  PRIVATE_KEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.17',
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  networks: {
    polygon: {
      url: POLYGON_ALCHEMY_URL
        ? POLYGON_ALCHEMY_URL
        : 'https://polygon-mainnet.g.alchemy.com/v2/123abc123abc123abc123abc123abcde',
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : 'remote',
    },
    mumbai: {
      url: MUMBAI_ALCHEMY_URL
        ? MUMBAI_ALCHEMY_URL
        : 'https://polygon-mumbai.g.alchemy.com/v2/123abc123abc123abc123abc123abcde',
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : 'remote',
    },
  },
};

export default config;
