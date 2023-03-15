import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    AUDIT_BOOK_ADDRESS,
    DECIMAL,
    LACK_OF_CHAI,
    MATIC_TESTNET_MUMBAI_NETWORK_CHAINID,
    MISMATCH_CHAIN,
    PRICE,
} from 'src/const';
import { ALREADY_CONNECTED, NOT_CONNECT } from 'src/const/message';
import { ClientAuditBook, ClientChai } from 'src/features/buy';
import { ClientWallet } from 'src/lib/wallet/ClientWallet';
import { UserModel } from 'src/models/UserModel';
import { isInitUserState } from 'src/stores/isInitUserState';
import { UserState, userState } from 'src/stores/userState';

export interface UserController {
    init: () => Promise<void>;
    login: () => Promise<void>;
    buy: (userId: string) => Promise<void>;
}

export const useUserValue = (): UserState => {
    return useRecoilValue(userState);
};

export const useUserController = (): UserController => {
    const setUser = useSetRecoilState(userState);
    const setIsInitUser = useSetRecoilState(isInitUserState);

    /**
     * 初期化
     */
    const init = async (): Promise<void> => {
        const address = await _getConnectedAddress();
        if (address === '') {
            setUser(new UserModel());
            setIsInitUser(true);
            return;
        }
        const auditBook = await ClientAuditBook.instance();
        const balanceOfAuditBook = await auditBook.balanceOf(address);
        setUser(new UserModel(address, balanceOfAuditBook > 0));
        setIsInitUser(true);
    };

    /**
     * ログイン
     */
    const login = async (): Promise<void> => {
        const wallet = await ClientWallet.instance();
        if (
            (await wallet.getChainId()) !== MATIC_TESTNET_MUMBAI_NETWORK_CHAINID
        )
            await wallet.switchChainIfNotExistAdd(
                MATIC_TESTNET_MUMBAI_NETWORK_CHAINID
            );
        const addresses = await wallet.connect();
        const auditBook = await ClientAuditBook.instance();
        const balanceOfAuditBook = await auditBook.balanceOf(addresses[0]);
        setUser(
            new UserModel(addresses[0].toLowerCase(), balanceOfAuditBook > 0)
        );
    };

    /**
     * 購入
     * @param userId ユーザーアドレス
     */
    const buy = async (userId: string): Promise<void> => {
        const chai = await ClientChai.instance();
        const balance = await chai.balanceOf(userId);
        if (balance < PRICE * DECIMAL) throw new Error(LACK_OF_CHAI);
        const allowance = await chai.allowance(userId, AUDIT_BOOK_ADDRESS);
        if (allowance < PRICE * DECIMAL)
            await chai.approve(AUDIT_BOOK_ADDRESS, BigInt(PRICE * DECIMAL));
        const auditBook = await ClientAuditBook.instance();
        await auditBook.safeMint(userId);
        setUser((prevState) => prevState.copyWith({ isOwnAuditBook: true }));
    };

    /**
     * 接続済みウォレットアドレスを取得
     * @return 接続済みウォレットアドレス
     */
    const _getConnectedAddress = async (): Promise<string> => {
        const wallet = await ClientWallet.instance();
        if (
            (await wallet.getChainId()) !== MATIC_TESTNET_MUMBAI_NETWORK_CHAINID
        ) {
            setUser(new UserModel());
            throw new Error(MISMATCH_CHAIN);
        }
        const addresses = await wallet.getConnectedAddresses();
        if (addresses.length === 0) {
            setUser(new UserModel());
            console.log(NOT_CONNECT);
            return '';
        }
        console.log(ALREADY_CONNECTED(addresses[0]));
        return addresses[0].toLowerCase();
    };

    const controller: UserController = {
        init,
        login,
        buy,
    };
    return controller;
};

export const useUserState = (): [UserState, UserController] => [
    useUserValue(),
    useUserController(),
];
