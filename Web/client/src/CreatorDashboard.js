import React from 'react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
//import Image from 'next/image'
import {nftMarketAddress, nftAddress} from './config'
import Market from './contracts//NFTMarket.json'
import NFT from './contracts/NFT.json'
import Web3 from 'web3'


export default function CreatorDashboard() {
    
  const [nfts, setNfts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const web3=new Web3(window.ethereum);
    const signer = provider.getSigner();
    const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
    const marketContract = new web3.eth.Contract( Market.abi,nftMarketAddress);
    const tokenContract = new web3.eth.Contract( NFT.abi,nftAddress);
    const data = await marketContract.methods.fetchItemsCreated().call({from: accounts[0].toString()});
    console.log(data);
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.methods.tokenURI(i.tokenId).call();
      
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId,
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
      };
      return item;
    }));
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState('loaded');
   
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
               

                        <img
                            src={nft.image}
                            alt="Picture of the author"
                            className="rounded"
                            width={250}
                            height={300} 
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                          />

                <div className="p-4 bg-black">
                  <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
        <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {
                  sold.map((nft, i) => (
                    <div key={i} className="border shadow rounded-xl overflow-hidden">
                      <img src={nft.image} className="rounded" />
                      <div className="p-4 bg-black">
                        <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
        </div>
    </div>
  )
}