import { useAddress, useNetwork, useSDK } from '@thirdweb-dev/react';
import axios from 'axios';
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
// import FileUpload from './FileUpload';
import { ethers } from "ethers";
import Web3 from 'web3';
import debounce from 'lodash/debounce';
import { AbiItem } from 'web3-utils';
import API from '../Config/axiosInit';
import { queryENSForETHAddress } from '../store/ensStore';

type Props = {}

// Exported Types
export type ExternalProvider = {
    isMetaMask?: boolean;
    isStatus?: boolean;
    host?: string;
    path?: string;
    sendAsync?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    send?: (request: { method: string, params?: Array<any> }, callback: (error: any, response: any) => void) => void
    request?: (request: { method: string, params?: Array<any> }) => Promise<any>
}

export default function Landing({ }: Props) {
    const address = useAddress()
    const network = useNetwork()
    const navigate = useNavigate();
    const [accountNftMetadata, setAccountNftMetadata] = useState([])
    const [allNfts, setAllNfts] = useState<string[]>([])
    const [ethAddress, setETHAddress] = useState(null)
    const [allCategories, setAllCategories] = useState([])

    useEffect(() => {
        address && getNftData(address)
        if (window?.ethereum) {
            initEthers()
        }
    }, [address])

    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        const data = await API.get('/categories')
        setAllCategories(data.data)
    }

    const initEthers = async () => {
        // const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider)
        // send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner()
        // const balance = await provider.getBalance("vitalik.eth")
        // const formattedAmt = ethers.utils.formatEther(balance)
        // const providerUrl = `https://eth-mainnet.g.alchemy.com/v2/Sutir0tQfRQsB0GRQERYNKB383HrsQaX`;

        // const providerSec = new ethers.providers.JsonRpcProvider(providerUrl)

        // const resolver = await providerSec.getResolver("vitalik.eth");
        // const content = resolver && await resolver.getContentHash();

        // const addr = await queryENSForETHAddress("0x8f73b852c2bDBf31aDeD68610CC6C3f059E34F1D")
        // console.log("=======addr=====", addr)
        // const name = 'dineshn.eth'
        // const ethereum: any = window.ethereum
        // const accounts = await ethereum.enable();
        // console.log("====accounts===", accounts)
        // const web3 = new Web3(ethereum);
        // const registryAddress: string | null = web3.eth.ens.registryAddress

        // if (registryAddress) {
        //     const abidata = await axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85&apikey=7A35I2ZI7BI1PQ7EE83KBKK3YV44UT3IC3')
        //     const abi: AbiItem[] = JSON.parse(abidata.data.result)
        //     // const resolverContract = await web3.eth.ens.getResolver('dineshn.eth');
        //     const registryContract = new web3.eth.Contract(abi, registryAddress)
        //     const currentOwner = await registryContract.methods.owner(name).call();
        //     console.log("=====currentOwner====", currentOwner)
        //     if (currentOwner !== web3.eth.defaultAccount) {
        //         throw new Error(`The name ${name} is not owned by the account ${web3.eth.defaultAccount}`);
        //     }
        //     await registryContract.methods.setText(name, 'test', 'testing').send({
        //         from: web3.eth.defaultAccount,
        //     });
        // }

    }

    const getNftData = async (address: string) => {
        const nfts = await axios.get(`/getnfts/${address}`)
        const accountNfts = nfts?.data?.accountNfts?.ownedNfts
        setAccountNftMetadata(accountNfts)
    }

    useEffect(() => {
        getAllNfts(accountNftMetadata)
    }, [accountNftMetadata])

    const getAllNfts = async (accountNftMetadata: any) => {
        const allNftData: string[] = await Promise.all(accountNftMetadata?.filter((nft: any) => nft?.rawMetadata?.image || nft?.contract?.address === "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85").map(async (nft: any) => {
            const nftImageData = nft?.rawMetadata
            const getImage = async (nft: any): Promise<any> => {
                if (nftImageData?.image?.startsWith('ipfs://')) {
                    return {
                        url: nftImageData?.image?.replace("ipfs://", "https://ipfs.io/ipfs/"),
                        name: nftImageData.name
                    }
                } else if (nft?.contract?.address === "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85" && nft?.tokenUri?.raw) {
                    const ensMetadata = await axios.get(nft?.tokenUri?.raw)
                    const ensImage = ensMetadata?.data?.image_url
                    return {
                        url: ensImage || require('../assets/no-image.jpeg'),
                        name: 'ENS image'
                    }
                }
                return {
                    url: nftImageData?.image,
                    name: nftImageData.name
                }
            }
            const image = await getImage(nft)
            return image
        }))
        setAllNfts(allNftData)
    }

    return (
        <div className='ml-[20px]'>
            {/* <div>Your account address: {address}</div> */}
            {/* <div className='flex flex-row flex-wrap'>
                {
                    allNfts.map((nft: any, idx) => {

                        return (
                            <div key={idx} className='h-[300px] w-[300px] p-[20px]'>
                                <img alt={nft.name} src={nft.url} className='h-full w-full object-contain' />
                            </div>
                        )
                    })
                }
            </div> */}

            <div className='flex flex-wrap justify-center'>
                {
                    allCategories?.map((cat: any, idx: number) => {
                        return (
                            <div
                                key={idx}
                                className='h-[150px] w-[150px] m-[20px] mt-[40px] rounded-[10px] text-center cursor-pointer'
                                onClick={() => {
                                    navigate(`/category/${cat.slug}`)
                                }}
                            >
                                <img
                                    alt={cat.name}
                                    src={`https://raw.githubusercontent.com/Zimtente/ens-collections/main/logos/${cat.logo}`}
                                    className='h-full w-full object-contain rounded-[10px]'
                                    onError={(e: any) => {
                                        e.target.src = require("../assets/no-image.jpeg")
                                    }}
                                />
                                {cat.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}