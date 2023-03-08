import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import frontcover from './frontcover.png';
import './App.css';
import { ethers } from 'ethers';
import AuditBookContractJson from '../../contracts/artifacts/contracts/AuditBook.sol/AuditBook.json';
import TestERC20ContractJson from '../../contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json';
//import contract from './contracts/AuditBook.sol/AuditBook.json';


{
    /************************************ここからグローバルな定数************************************/
}
const AuditBookAbi = AuditBookContractJson.abi;
const AuditBookContractAddress = '0xbDBebF9b9f41C6BCAf9CbC26290Ddc07ea0F490B';

const contractAddress = '0xbDBebF9b9f41C6BCAf9CbC26290Ddc07ea0F490B';

const TestERC20Abi = TestERC20ContractJson.abi;
const TestERC20ContractAddress = '0xbDBebF9b9f41C6BCAf9CbC26290Ddc07ea0F490B';

const MaticTestnetMumbaiNetworkChainId = '0x13881';

function App() {
    const [currentAccount, setCurrentAccount] = useState<string | null>();
    const [metamaskError, setMetamaskError] = useState<boolean | null>();
    const [mineStatus, setMineStatus] = useState<string | null>();
    const [totalMintCount, setTotalMintCount] = useState<number | null>();
    const [showToast, setShowToast] = useState(false);
    const [iaLoading, setIsLoading] = useState(false);

    const connectWallet = async () => {
        const { ethereum } = window as any; // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
        // ウォレット接続処理
        if (!ethereum) {
            alert('Please install Metamask!');
        }

        if (ethereum.networkVersion !== MaticTestnetMumbaiNetworkChainId) {
            try {
                // Mumbai testnet に切り替えます。
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x13881' }], // utilsフォルダ内のnetworks.js を確認しましょう。0xは16進数です。
                });
            } catch (error: any) {
                // このエラーコードは当該チェーンがメタマスクに追加されていない場合です。
                // その場合、ユーザーに追加するよう促します。
                if (error.code === 4902) {
                    try {
                        await ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: '0x13881',
                                    chainName: 'Polygon Mumbai Testnet',
                                    rpcUrls: [
                                        'https://rpc-mumbai.maticvigil.com/',
                                    ],
                                    nativeCurrency: {
                                        name: 'Mumbai Matic',
                                        symbol: 'MATIC',
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: [
                                        'https://mumbai.polygonscan.com/',
                                    ],
                                },
                            ],
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                console.log(error);
            }
        }

        try {
            const network = await ethereum.request({ method: 'eth_chainId' });

            if (network.toString() === '0x13881') {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });
                console.log('Found an account! Address: ', accounts[0]);
                setMetamaskError(null);
                setCurrentAccount(accounts[0]);
            } else {
                setMetamaskError(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const mask = function (number: any) {
        const cha = String(number);
        const topvisible = number.slice(0, 4);
        const bottomvisible = number.slice(-4);
        return (
            <p color="white">
                {topvisible}...{bottomvisible}
            </p>
        );
    };

    const BuyNFT = async () => {
        const { ethereum } = window as any;    // Buttonクリックで実行 -> クライアントサイドの処理なので、windowが参照できethereumが扱える
        const network = await ethereum.request({ method: 'eth_chainId' });

        if (network.toString() === '0x13881') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Address: ", accounts[0]);
            setMetamaskError(null);
            setCurrentAccount(accounts[0]);

            setIsLoading(true);

            try {

                setMineStatus('mining');

                if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const nftContract = new ethers.Contract(contractAddress, AuditBookAbi, signer);

                console.log("Mint start!");

                let nftTxn = await nftContract.mintNft({ gasLimit: 1600000 });

                console.log("Mining... please wait");
                await nftTxn.wait();

                console.log(`Mined, see transaction: ${nftTxn.hash}`);
                setMineStatus('success');

                } else {
                setMineStatus('error');
                console.log("Ethereum object does not exist");
                }

                setIsLoading(false);

            } catch (err) {
                setMineStatus('error');
                console.log(err);
                setIsLoading(false);
                alert("Failed to mint...");
            }
        }
    };

    const renderButtun = (bname: any, isOnClick: any, ahref: any) => {
        if (isOnClick) {
            return (
                <button
                    className="button-base connect-wallet-button2"
                    onClick={connectWallet}
                >
                    {bname}
                </button>
            );
        } else {
            return (
                <a>
                    <button className="button-base connect-wallet-button2">
                        {bname}
                    </button>
                </a>
            );
        }
    };
    const renderBuyButtun = () => {
        return (
            <button
                className="button-base connect-wallet-button2"
                onClick={BuyNFT}
            >
                教科書をミント
            </button>
        );
    };

    const renderDisplayButton = () => {
        return (
            <div>
                {/*{chain && <div>Connected to {chain.name}</div>}
            <button
              disabled={!switchNetwork || chains[0].id === chain?.id}
              key={chains[0].id}
              onClick={() => switchNetwork?.(chains[0].id)}
              >
              {chains[0].name}
              {isLoading && pendingChainId === chains[0].id && ' (switching)'}
            </button>
            <div>{error && error.message}</div>*/}
                {!currentAccount && renderButtun('ウォレットを接続', true, '')}
                {currentAccount && !totalMintCount && !iaLoading && (
                    <div>{renderBuyButtun()}</div>
                )}
                {currentAccount && totalMintCount && !iaLoading && (
                    <div>
                        {renderButtun(
                            'NFT at OpenSea',
                            false,
                            `https://testnets.opensea.io/ja/assets/mumbai/${contractAddress}/${totalMintCount}`
                        )}
                        <p>Congrats! Your NFT minted! </p>
                    </div>
                )}
                {currentAccount && !totalMintCount && iaLoading && (
                    <div>
                        {/*<Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#f6a429'
                size='xl'
                />*/}
                        <p>Please wait just a little bit more.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <header className="topNavigation">
                <div className="topNavigation-left">
                    <p className="white-letter">Audit Book</p>
                </div>
                <div className="topNavigation-right">
                    {/*<button className="button-base connect-wallet-button2" onClick={connectWallet}>
                        ウォレット接続
                    </button>*/}
                    {renderDisplayButton()}
                </div>
            </header>
            <div className="audit-book-concept">
                <h1>Audit Bookとは</h1>
                <div className="bg-gray">
                    <p>
                        概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　
                    </p>
                    <p>
                        概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　
                    </p>
                    <p>
                        概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　
                    </p>
                </div>
            </div>
            <div className="audit-book-content">
                <div className="audit-book-content-left">
                    <img src={frontcover} />
                </div>
                <div className="audit-book-content-right">
                    <h2 className="text-bg-gray">目次</h2>
                    <p>第１章 ○○○○○○○○○○○○○</p>
                    <p className="text-bg-gray">第２章 ○○○○○○○○○○○○○</p>
                    <p>第３章 ○○○○○○○○○○○○○</p>
                    <p className="text-bg-gray">第４章 ○○○○○○○○○○○○○</p>
                    <p>第５章 ○○○○○○○○○○○○○</p>
                    <p className="text-bg-gray">第６章 ○○○○○○○○○○○○○</p>
                    <p>第７章 ○○○○○○○○○○○○○</p>
                    <p className="text-bg-gray">第８章 ○○○○○○○○○○○○○</p>
                    <h3>価格 ○○○ CHAI</h3>
                </div>
            </div>
            <div className="audit-book-button">
                {renderDisplayButton()}
                {/*<button className="button-base connect-wallet-button2" onClick={connectWallet}>
                    ウォレット接続
                </button>*/}
                {currentAccount && !totalMintCount && !iaLoading && (
                    <div>ウォレット接続完了！</div>
                )}
            </div>
            <footer className="footer">
                <p className="copyright">
                    © 2023 <a href="">UNCHAIN</a> All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}

export default App;
