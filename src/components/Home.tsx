import { useAddress, useNetwork, useSDK } from '@thirdweb-dev/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload';

type Props = {}

export default function Home({ }: Props) {
    const address = useAddress()
    const network = useNetwork()
    const [accountNftMetadata, setAccountNftMetadata] = useState([])
    const [allNfts, setAllNfts] = useState<string[]>([])

    useEffect(() => {
        address && getNftData(address)
    }, [address])

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
        <div className='m-[20px]'>
            <h2 className='text-2xl font-semibold'>Hey there 👋</h2>
            <div>Your account address: {address}</div>
            <div className='flex flex-row flex-wrap'>
                {
                    allNfts.map((nft: any, idx) => {

                        return (
                            <div key={idx} className='h-[300px] w-[300px] p-[20px]'>
                                <img alt={nft.name} src={nft.url} className='h-full w-full object-contain' />
                            </div>
                        )
                    })
                }
            </div>
            <FileUpload />
        </div>
    )
}