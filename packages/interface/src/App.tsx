import React, { useEffect, useState, Fragment } from "react";
import logo from './logo.svg';
import frontcover from './frontcover.png';
import './App.css';
import { ethers } from 'ethers';

function App() {
    
    return (
        <div className="App">
            <header className="topNavigation">
                <div className="topNavigation-left">
                    <p className="white-letter">Audit Book</p>
                </div>
                <div className="topNavigation-right">
                    <button className="button-base connect-wallet-button2">
                        ウォレット接続
                    </button>
                </div>
            </header>
            <div className="audit-book-concept">
                <h1>Audit Bookとは</h1>
                <div className="bg-gray">
                    <p>概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　</p>
                    <p>概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　</p>
                    <p>概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　概要　がいよう　</p>
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
                <button className="button-base connect-wallet-button2">
                    ウォレット接続
                </button>
            </div>
            <footer className="footer">
                <p className="copyright">© 2023 <a href="">UNCHAIN</a> All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default App;
