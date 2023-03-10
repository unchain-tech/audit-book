import React, { useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import frontcover from './frontcover.png';
import './App.css';
import { ethers } from 'ethers';
//import AuditBookContractJson from '../../contracts/artifacts/contracts/AuditBook.sol/AuditBook.json';
//import ChaiAndTestERC20ContractJson from '../../contracts/artifacts/contracts/test/TestERC20.sol/TestERC20.json';
//const { ChaiAndTestERC20ContractJson } = require('@audit-book/packages/contracts/artifacts/contracts/AuditBook.sol/AuditBook.json');
//const { AuditBookContractJson } = require('@audit-book/packages/contracts');
//import contract from './contracts/AuditBook.sol/AuditBook.json';
import ChaiAndTestERC20ContractJson from './contracts/test/TestERC20.sol/TestERC20.json';
import AuditBookContractJson from './contracts/AuditBook.sol/AuditBook.json';

{
    /************************************ここからグローバルな定数************************************/
}

const ChaiAndTestERC20Abi = ChaiAndTestERC20ContractJson.abi; // testERC20のABIをChaiでも使い回し
const ChaiContractAddress = '0x4491D1c47bBdE6746F878400090ba6935A91Dab6'; //Chaiの

const AuditBookAbi = AuditBookContractJson.abi;
const AuditBookContractAddress = '0xbDBebF9b9f41C6BCAf9CbC26290Ddc07ea0F490B'; //今は適当

const MaticTestnetMumbaiNetworkChainId = '0x13881';
const MaticMainnetChainId = '0x89';
const Decimal = 10 ** 18;
const Price = 0; //本代。今は適当

function App() {
    /************************************ここからuseState************************************/
    const [currentAccount, setCurrentAccount] = useState<string | null>();
    const [metamaskError, setMetamaskError] = useState<boolean | null>();
    const [mineStatus, setMineStatus] = useState<string | null>();
    const [totalMintCount, setTotalMintCount] = useState<number | null>();
    const [showToast, setShowToast] = useState(false);
    const [iaLoading, setIsLoading] = useState(false);

    /************************************ここから処理系の関数************************************/
    const connectWallet = async () => {
        const { ethereum } = window as any;
        // ウォレット接続処理
        if (!ethereum) {
            alert('Please install Metamask!');
        }

        if (ethereum.networkVersion !== MaticTestnetMumbaiNetworkChainId) {
            try {
                // Mumbai testnet に切り替えます。
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: MaticMainnetChainId }], // utilsフォルダ内のnetworks.js を確認しましょう。0xは16進数です。
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
                                    chainId: MaticMainnetChainId,
                                    chainName: 'Matic(Poygon) Mainnet',
                                    rpcUrls: [
                                        'https://rpc-mainnet.maticvigil.com/',
                                    ],
                                    nativeCurrency: {
                                        name: 'Polygon',
                                        symbol: 'MATIC',
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: [
                                        'https://polygonscan.com/',
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

            if (network.toString() === MaticMainnetChainId) {
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
        const { ethereum } = window as any;
        const network = await ethereum.request({ method: 'eth_chainId' });

        if (network.toString() === MaticMainnetChainId) {
            // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            // console.log("Found an account! Address: ", accounts[0]);
            // setMetamaskError(null);
            // setCurrentAccount(accounts[0]);

            setIsLoading(true);

            try {
                setMineStatus('mining');

                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(
                        ethereum
                    );
                    const signer = provider.getSigner();

                    const ChaiContract = new ethers.Contract(
                        ChaiContractAddress,
                        ChaiAndTestERC20Abi,
                        signer
                    );

                    let yourAllowance =
                        (await ChaiContract.allowance(
                            currentAccount,
                            ChaiContractAddress
                        )) / Decimal;
                    console.log(yourAllowance);

                    if (yourAllowance === 0) {
                        console.log('Chai check start!');
                        let yourchai =
                            (await ChaiContract.balanceOf(currentAccount)) /
                            Decimal;
                        console.log(yourchai);
                        //教科書を買うのに十分なchaiを持っていれば
                        if (yourchai >= Price) {
                            console.log('start to approve');
                            let approveTxn = await ChaiContract.approve(
                                ChaiContractAddress,
                                Price
                            );
                            console.log('approving... please wait');
                            await approveTxn.wait();
                            console.log(
                                `approved, see transaction: ${approveTxn.hash}`
                            );
                            setMineStatus('success');
                        } else {
                            alert('insufficient chai...');
                        }
                    } else if (yourAllowance === Price) {
                        console.log('Already approved');
                    }

                    const nftContract = new ethers.Contract(
                        AuditBookContractAddress,
                        AuditBookAbi,
                        signer
                    );

                    console.log('Mint start!');

                    let nftTxn = await nftContract.safeMint(currentAccount);

                    console.log('Minting... please wait');
                    await nftTxn.wait();

                    console.log(`Minted, see transaction: ${nftTxn.hash}`);
                    setMineStatus('success');
                } else {
                    setMineStatus('error');
                    console.log('Ethereum object does not exist');
                }

                setIsLoading(false);
            } catch (err) {
                setMineStatus('error');
                console.log(err);
                setIsLoading(false);
                alert('Failed to mint...');
            }
        }
    };

    /************************************ここからレンダリング系の関数************************************/
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
                教科書を購入
            </button>
        );
    };

    const renderDisplayButton = () => {
        return (
            <div>
                {!currentAccount && renderButtun('ウォレットを接続', true, '')}
                {currentAccount && !totalMintCount && !iaLoading && (
                    <div>
                        {renderBuyButtun()}
                        <p>ウォレット接続完了！</p>
                    </div>
                )}
                {currentAccount && totalMintCount && !iaLoading && (
                    <div>
                        {renderButtun(
                            'NFT at OpenSea',
                            false,
                            `https://opensea.io/ja/assets/polygon/${AuditBookContractAddress}/${totalMintCount}`
                        )}
                        <p>
                            おめでとうございます! 教科書の購入が完了しました!{' '}
                        </p>
                        <p>
                            この教科書が、あなたのAudit
                            LifeのおTomoになることを願っています!{' '}
                        </p>
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
                        <p>購入手続き中です。少々お待ちください。</p>
                    </div>
                )}
            </div>
        );
    };

    const renderDisplayButton2 = () => {
        return (
            <div>
                {!currentAccount && renderButtun('ウォレットを接続', true, '')}
                {currentAccount && <div>address:{mask(currentAccount)}</div>}
            </div>
        );
    };
    /************************************ここから全体のレイアウト************************************/
    return (
        <div className="App">
            <header className="topNavigation">
                <div className="topNavigation-left">
                    <p className="white-letter">Audit Book</p>
                </div>
                <div className="topNavigation-right">
                    {renderDisplayButton2()}
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
            <div className="audit-book-button">{renderDisplayButton()}</div>
            <footer className="footer">
                <p className="copyright">
                    © 2023 <a href="">UNCHAIN</a> All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}

export default App;
