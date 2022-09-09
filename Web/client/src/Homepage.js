import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import {ethers} from "ethers";
import NFT from "./contracts/NFT.json";
import Marketplace from "./contracts/NFTMarket.json";
import Image from 'react'
import axios from "axios";
import {nftAddress,nftMarketAddress} from "./config";

export default function Homepage(){

    const[nfts,setNfts]=useState([]);
    const[loadingState,setLoadingState]=useState('unloaded');

    useEffect(()=>{
        LoadNfts();
    }, []);

   async function LoadNfts(){
       
        const provider=new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/294ba86a2f504ea0947006554734c90b");
        const web3=new Web3(provider);
        const tokenContract=new web3.eth.Contract(NFT.abi,nftAddress);
        const marketContract = new web3.eth.Contract(Marketplace.abi,nftMarketAddress);
        const results=await marketContract.getPastEvents('MarketItemCreated',{filter:{tokenId:2}});
        console.log(results);
        // const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/294ba86a2f504ea0947006554734c90b");
        // const tokenContract= new ethers.Contract(nftAddress,NFT.abi,provider);
        // const marketContract = new ethers.Contract(nftMarketAddress,Marketplace.abi,provider);

        //return an array of unsold items
        const data= await marketContract.methods.fetchMarketItems().call();

        const items=await Promise.all(data.map(async i=>{
            const tokenUri=await tokenContract.methods.tokenURI(i.tokenId).call();
            const metadata= await axios.get(tokenUri); 
             console.log(tokenUri);
            let price= web3.utils.fromWei(i.price.toString(),'ether');
            let item={
                price,
                tokenId: i.tokenId,
                seller: i.seller,
                owner: i.owner,
                image: metadata.data.image,
                name: metadata.data.name,
                description: metadata.data.description
            }
            console.log(i.tokenId);
            const results=await marketContract.getPastEvents('MarketItemCreated',{filter:{tokenId:2}});
            console.log(results);
            return item;

        }))
        
        setNfts(items);
        setLoadingState('loaded');

    }

    async function buyNFT(nft){
        if(!window.ethereum){
            alert("it looks like that you dont have metamask installed,<br>please install")
            return;
        }
        const web3Modal= new Web3Modal();
        const connection= await web3Modal.connect();
        const provider =new ethers.providers.Web3Provider(connection);
        console.log( (await provider.getNetwork()).chainId);
        console.log (provider._getAddress);
        console.log (provider._getBlock);

        const web3=new Web3(connection);

        //sign the transaction
        const signer = provider.getSigner();
        
        
        const accounts=await web3.eth.getAccounts();
        console.log(signer)
        console.log(accounts);
        var userBalance =await web3.eth.getBalance(accounts[0]);
        userBalance=web3.utils.fromWei(userBalance,'ether');
        if(userBalance < nft.price)
        {
            console.log(userBalance);
            alert("you don't have enough balance to buy");
            return
            
        }
      

        const contract = new ethers.Contract(nftMarketAddress,Marketplace.abi,signer);
        
        //set the price
        const price = ethers.utils.parseUnits(nft.price.toString(),'ether');
       console.log(price);

        
        const transaction = await contract.createMarketSale(nftAddress,nft.tokenId,{value : price});
        await transaction.wait();

        LoadNfts();
    }
    if (loadingState === 'loaded' && !nfts.length)
        {
            return(<h1>NO Items in marketplace</h1>)
        }


    return(
        <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px'}}>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
           {
             nfts.map((nft,i) =>(
               <div key={i} className="border shadow rounded-xl overflow-hidden">
                
                 <img
                     src={nft.image}
                     alt="Picture of the author"
                     width={500}
                     height={500}
                     // blurDataURL="data:..." automatically provided
                     // placeholder="blur" // Optional blur-up while loading
                   />
                           <div className="p-4">
                   <p style={{ height: '64px'}} className="text-2xl font-semibold">
                     {nft.name}
                   </p>
                   <div style={{ height: '70px', overflow: 'hidden'}}>
                     <p className="text-gray-400">{nft.description}</p>
                   </div>
                 </div>
                 <div className="p-4 bg-black">
                   <p className="text-2xl mb-4 font-bold text-white">
                     {nft.price} ETH
                   </p>
                   <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                   onClick={() => buyNFT(nft)}>Buy NFT</button>
               </div>
               </div>
             ))
           }
         </div>
        </div>
      </div>

    )    
}