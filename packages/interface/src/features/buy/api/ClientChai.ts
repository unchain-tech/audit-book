import { ethers } from 'ethers';
import { CHAI_ABI, CHAI_ADDRESS, NOT_FOUND_CONNECTED_ADDRESS } from 'src/const';
import { ClientWallet } from 'src/lib/wallet/ClientWallet';

export class ClientChai {
  private static _instance: ClientChai;
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientChai>} インスタンス
   */
  public static async instance(): Promise<ClientChai> {
    if (!this._instance) {
      const wallet = await ClientWallet.instance();
      const reader = new ethers.Contract(
        CHAI_ADDRESS,
        CHAI_ABI,
        wallet.provider
      );
      this._instance = new ClientChai(wallet, reader);
    }
    return this._instance;
  }

  /**
   * balanceOf
   * @param account アドレス
   * @return {Promise<BigInt>} balance
   */
  balanceOf = async (account: string): Promise<bigint> => {
    const balance = await this._reader?.balanceOf(account);
    return BigInt(balance);
  };

  /**
   * balanceOf
   * @param owner 所有者アドレス
   * @param spender 委任者アドレス
   * @return {Promise<BigInt>} allowance
   */
  allowance = async (owner: string, spender: string): Promise<bigint> => {
    const allowance = await this._reader?.allowance(owner, spender);
    return BigInt(allowance);
  };

  /**
   * approve
   * @param spender 委任者アドレス
   * @param amount 委任者が操作可能なトークン量
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  approve = async (
    spender: string,
    amount: bigint
  ): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer?.approve(spender, amount);
    return (await tx.wait()) as ethers.ContractTransactionReceipt;
  };

  /**
   * 書き込み前処理
   */
  private _beforeWrite = async (): Promise<void> => {
    const connectedAddressList = await this._wallet.getConnectedAddresses();
    if (connectedAddressList.length === 0)
      throw Error(NOT_FOUND_CONNECTED_ADDRESS);
    if (this._writer !== undefined) return;
    this._writer = new ethers.Contract(
      CHAI_ADDRESS,
      CHAI_ABI,
      await this._wallet.getSigner()
    );
  };
}
