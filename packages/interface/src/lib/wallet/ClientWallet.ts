/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";
import {
  MATIC_TESTNET_MUMBAI_NETWORK_CHAINID,
  NOT_FOUND_METAMASK,
} from "src/const";

export type AddEthereumChainParameter = {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
};

export const chainsParams: { [key: string]: AddEthereumChainParameter } = {
  "0x13881": {
    chainId: MATIC_TESTNET_MUMBAI_NETWORK_CHAINID,
    chainName: "Matic Testnet Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    iconUrls: [],
  },
};

export class ClientWallet {
  private static _instance: ClientWallet;
  private constructor(public readonly provider: ethers.BrowserProvider) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientWallet>} ウォレットインスタンス
   */
  public static async instance(): Promise<ClientWallet> {
    if (!this._instance) {
      const { ethereum } = window as any;
      if (!_isInstallWallet(ethereum)) throw new Error(NOT_FOUND_METAMASK);
      const provider = new ethers.BrowserProvider(ethereum);
      this._instance = new ClientWallet(provider);
    }
    return this._instance;
  }

  /**
   * ウォレットと接続
   * @return {Promise<string[]>} 接続したウォレットアドレス一覧
   */
  connect = async (): Promise<string[]> => {
    const conectedAddresses = await this.provider.send(
      "eth_requestAccounts",
      []
    );
    console.log(`Connected: ${conectedAddresses}`);
    return conectedAddresses;
  };

  /**
   * 接続済みウォレットアドレスを取得
   * @return {Promise<string[]>} 接続されているウォレットアドレス一覧
   */
  getConnectedAddresses = async (): Promise<string[]> => {
    return await this.provider.send("eth_accounts", []);
  };

  /**
   * 接続チェーンのID確認
   * @return {Promise<string>} 接続されているウォレットアドレス一覧
   */
  getChainId = async (): Promise<string> => {
    return await this.provider.send("eth_chainId", []);
  };

  /**
   * チェーン切替
   * @param chainId 切替先チェーンのID
   */
  switchChain = async (chainId: string) => {
    await this.provider.send("wallet_switchEthereumChain", [
      {
        chainId: chainId,
      },
    ]);
  };

  /**
   * チェーン追加
   * @param params 切替先チェーンパラメータ
   */
  addChain = async (params: AddEthereumChainParameter) => {
    await this.provider.send("wallet_addEthereumChain", [params]);
  };

  /**
   * チェーン切替。チェーン存在しなかったら追加
   * @param chainId 切替先チェーンのID
   */
  switchChainIfNotExistAdd = async (chainId: string) => {
    try {
      await this.provider.send("wallet_switchEthereumChain", [
        {
          chainId: chainId,
        },
      ]);
    } catch (e) {
      console.log(e);
      console.log("指定のチェーンを追加します。");
      await this.addChain(chainsParams[chainId]);
    }
  };

  /**
   * 署名を取得
   * @return {Promise<ethers.JsonRpcSigner>} 署名
   */
  getSigner = async (): Promise<ethers.JsonRpcSigner> => {
    return await this.provider.getSigner();
  };
}

/**
 * ウォレットがインストール済みか
 * @param ethereum window.ethereum
 * @return {boolean} true -> インストール済み / false 末インストール
 */
const _isInstallWallet = (ethereum: any): boolean => {
  return typeof ethereum !== "undefined";
};
