import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './App.css';
import Navigation from './Navbar';
import Home from './Home';

import { useState } from 'react'
import { ethers } from 'ethers'

import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import configContract from './configContract';

const fromWei = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString())

function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    loadContracts(accounts[0], signer)
  }
  

  const loadOpenSeaItems = async (acc, contractAddress) => {
    let openSeaApi = configContract.OPENSEA_API
    // openSeaApi = configContract.OPENSEA_API_TESTNETS // comment this for mainnet
    let finalUrl = `${openSeaApi}/assets?owner=${acc}&asset_contract_address=${contractAddress}&format=json`
    console.log("OpenSea call for url: " + finalUrl)

    let items = await fetch(finalUrl)
    .then((res) => res.json())
    .then((res) => {
        console.log(res.assets)
      return res.assets
    })
    .catch((e) => {
      console.error(e)
      console.error('Could not talk to OpenSea')
      return null
    })

    setLoading(false)
  }

  const loadContracts = async (acc, signer) => {
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)

    setNFT(nft)
    setLoading(false)
    
    loadOpenSeaItems(acc, NFTAddress.address)
  }

  return (
    <BrowserRouter>
      <div className="App" id="wrapper">
        <Navigation />
        <Routes>
          <Route path="/" element={
            <Home web3Handler={web3Handler} account={account} nft={nft} ticketsLeft={300}>
              </Home>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
