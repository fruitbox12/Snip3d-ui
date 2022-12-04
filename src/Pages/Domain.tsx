import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import API from '../Config/axiosInit';
import { getAllEnsMetadata } from '../store/queries';

type Props = {}

export default function Domain({ }: Props) {
    const { tokenId } = useParams();
    const [searchParams] = useSearchParams()
    const [domain, setDomain] = useState(null)

    useEffect(() => {
        getDomainDetails(tokenId)
    }, [])

    const getDomainDetails = async (tokenId) => {
        try {
            const resMeta = await API.get(`https://eth-mainnet.g.alchemy.com/v2/Sutir0tQfRQsB0GRQERYNKB383HrsQaX/getNFTMetadata?contractAddress=0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85&tokenId=${tokenId}&refreshCache=true`)
            setDomain(resMeta.data)
            console.log("=====resMeta.data====", resMeta.data)
        } catch (err) {
            console.log(err)
        }
    }

    const trim = (text) => {
        if (!text) {
            return ''
        }
        if (text < 10) {
            return text
        }
        return `${text.slice(0, 3)}...${text.slice(text.length - 3)}`
    }

    return (
        <div className='flex justify-center items-center'>
            {
                domain &&
                <div
                    className='h-[400px] w-[400px] m-[20px] mt-[40px] rounded-[10px] text-center ml-[40px] cursor-pointer'
                >
                    <img
                        alt={domain?.metadata?.name}
                        src={domain?.metadata?.image}
                        className='h-full w-full object-contain rounded-[10px]'
                        onError={(e: any) => {
                            e.target.src = require("../assets/no-image.jpeg")
                        }}
                    />
                    <b className='text-[24px]'>{domain?.metadata?.name}</b>
                </div>

            }
            <div>
                <div>
                    <span className='font-bold'>{`Description:`}</span>
                    <span className='text-lightgray pl-[10px]'>{domain?.description}</span>
                </div>
                <div>
                    <span className='font-bold'>{`Contract Address:`}</span>
                    <span className='text-lightgray pl-[10px]'>{trim(domain?.contract?.address)}</span>
                </div>
                <div>
                    <span className='font-bold'>{`Token ID:`}</span>
                    <span className='text-lightgray pl-[10px]'>{trim(domain?.id?.tokenId)}</span>
                </div>
                <div className='mt-[40px]'>
                    <button className='h-[50px] w-[150px] bg-slate-800 text-white rounded-[10px] mr-[10px]' onClick={() => window.open(`https://opensea.io/assets/ethereum/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/${domain?.id?.tokenId}`, '_blank')}>Buy</button>
                    <button className='h-[50px] w-[150px] bg-white text-black rounded-[10px] border-solid border-gray-500 border-[1px]' onClick={() => window.open(`https://opensea.io/assets/ethereum/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/${domain?.id?.tokenId}`, '_blank')}>Sell</button>
                </div>
            </div>
        </div>
    )
}