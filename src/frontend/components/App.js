import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css';
import Navigation from './Navbar';
import Home from './Home';

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import configContract from './configContract';

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [isWhitelisted, setIsWhitelisted] = useState(false)
  const [balance, setBalance] = useState(0)
  const [ticketsLeft, setTicketsLeft] = useState(5000)
  const [nft, setNFT] = useState({})

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    loadContracts(accounts[0], signer)
  }
  

  const fetchOpenseaStats = async () => {
    let openSeaApi = configContract.OPENSEA_API
    openSeaApi = configContract.OPENSEA_API_TESTNETS // comment this for mainnet

    let finalUrl = `${openSeaApi}/collection/else-exchange-ticket`
    console.log("OpenSea call for url: " + finalUrl)

    let collectionStats = await fetch(finalUrl)
    .then((res) => res.json())
    .then((res) => {
        console.log("Opensea Result:")
        console.log(res.collection.stats)
      return res.collection.stats
    })
    .catch((e) => {
      console.error(e)
      console.error('Could not talk to OpenSea')
      return null
    })

    setTicketsLeft(5000 - collectionStats.count)
  }

  const loadContracts = async (acc, signer) => {
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)

    setNFT(nft)
    setIsWhitelisted(await nft.isWhitelisted(acc))
    setBalance(await nft.balanceOf(acc))
    setLoading(false)
  }

  useEffect(() => {
    fetchOpenseaStats()
  }, [])

  return (
    <BrowserRouter>
      <div className="App" id="wrapper">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <Home web3Handler={web3Handler} loading={loading} account={account} nft={nft} ticketsLeft={ticketsLeft} isWhitelisted={isWhitelisted} balance={balance}>
              </Home>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
