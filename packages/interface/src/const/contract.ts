import ChaiAbi from "../contracts/Chai.sol/Chai.json";
import TextERC20Abi from "../contracts/TestERC20.sol/TestERC20.json";
import AuditBookAbi from "../contracts/AuditBook.sol/AuditBook.json";
import TestAuditBookAbi from "../contracts/TestAuditBook.sol/TestAuditBook.json";

export const IS_PROD = false;

export const CHAI_ABI = IS_PROD ? ChaiAbi.abi : TextERC20Abi.abi;
export const CHAI_ADDRESS = IS_PROD
  ? "0x4491D1c47bBdE6746F878400090ba6935A91Dab6"
  : "0xDCbf834c250f140d183BD17DfAA4B336Eaa0A568";

export const AUDIT_BOOK_ABI = IS_PROD ? AuditBookAbi.abi : TestAuditBookAbi.abi;
export const AUDIT_BOOK_ADDRESS = IS_PROD
  ? ""
  : "0x73C5E2B0c276fB04C1D4aE9f9207F79f5b932a07";

export const MATIC_TESTNET_MUMBAI_NETWORK_CHAINID = "0x13881";
export const MATIC_MAINNET_CHAINID = "0x89";
export const DECIMAL = 10 ** 18;

// TODO: 本の値段決まったら修正する
export const PRICE = 1000;
