import { ethers } from 'ethers';
import {
  AUDIT_BOOK_ABI,
  AUDIT_BOOK_ADDRESS,
  NOT_FOUND_CONNECTED_ADDRESS,
} from 'src/const';
import { ClientWallet } from 'src/lib/wallet/ClientWallet';

export class ClientAuditBook {
  private static _instance: ClientAuditBook;
  private _writer?: ethers.Contract;

  private constructor(
    private readonly _wallet: ClientWallet,
    private readonly _reader: ethers.Contract
  ) {}

  /**
   * インスタンスの取得
   * @return {Promise<ClientAuditBook>} インスタンス
   */
  public static async instance(): Promise<ClientAuditBook> {
    if (!this._instance) {
      const wallet = await ClientWallet.instance();
      const reader = new ethers.Contract(
        AUDIT_BOOK_ADDRESS,
        AUDIT_BOOK_ABI,
        wallet.provider
      );
      this._instance = new ClientAuditBook(wallet, reader);
    }
    return this._instance;
  }

  /**
   * balanceOf
   * @param owner アドレス
   * @return {Promise<bigint>} balance
   */
  balanceOf = async (owner: string): Promise<bigint> => {
    const balance = await this._reader?.balanceOf(owner);
    return balance;
  };

  /**
   * safeMint
   * @param to ミント先アドレス
   * @return {Promise<ethers.ContractTransactionReceipt>} レシート
   */
  safeMint = async (to: string): Promise<ethers.ContractTransactionReceipt> => {
    await this._beforeWrite();
    const tx = await this._writer?.safeMint(to);
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
      AUDIT_BOOK_ADDRESS,
      AUDIT_BOOK_ABI,
      await this._wallet.getSigner()
    );
  };
}
