import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import API from '../Config/axiosInit';
import { getEnsMetadata } from '../store/ensStore';
import { getAllEnsMetadata } from '../store/queries';

type Props = {}

export default function Category({ }: Props) {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState()
  const [domains, setDomains] = useState([])
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDomains(slug)
  }, [])

  const getDomains = async (slug) => {
    const data = await API.get(`/categories/${slug}`)
    setDomains(data.data)
    const domain = data.data?.[0]
    setCategory(domain.category)
    const domainNameTokens = data.data?.map(d => `"${d.token}"`).join(",")
    await getAllEnsMetadata(domainNameTokens)

    const res = await getEnsMetadata(domainNameTokens.slice(0, 1))
    console.log("======res=====", res)
  }

  return (
    <div>
      <h2 className='text-center font-semibold text-[24px]'>{`${category || ''}`}</h2>
      <div className='flex flex-wrap justify-center'>
        {
          domains.map((d: any, idx: number) => {
            return (
              <div
                key={idx}
                className='h-[150px] w-[150px] m-[20px] mt-[40px] rounded-[10px] text-center cursor-pointer'
                onClick={() => {
                  navigate(`/domain/${d.token}?name=${d.name}`)
                }}
              >
                <img
                  alt={d.name}
                  src={`https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/${d.token}/image`}
                  className='h-full w-full object-contain rounded-[10px]'
                  onError={(e: any) => {
                    e.target.src = require("../assets/no-image.jpeg")
                  }}
                />
                {d.name}
              </div>
            )
          })
        }
      </div>

    </div>
  )
}