require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.17',
    etherscan: {
        apiKey: process.env.POLYGONSCAN_API_KEY,
    },
    networks: {
        polygon: {
            url: process.env.POLYGON_ALCHEMY_KEY,
            accounts: [process.env.PRIVATE_KEY],
        },
        mumbai: {
            url: process.env.MUMBAI_ALCHEMY_KEY,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
};
