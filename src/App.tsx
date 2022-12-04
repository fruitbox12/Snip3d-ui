import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useCallback, useState } from "react";
import ConnectWalletBtn from "./components/ConnectWalletBtn";
import { CustomBrowserRouter } from "./Routes/CustomNavigation";
import RouterInit from "./Routes/Router";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import debounce from 'lodash/debounce';
import { ethers } from "ethers";
import API from "./Config/axiosInit";

type AppProps = any

export default function App({ Component, pageProps }: AppProps) {

  const [ensNameSearch, setEnsSearch] = useState('')
  const [ensSearchRecord, setEnsSearchRecord] = useState<any[]>([])
  const [isFetchingEns, setIsFetchingEns] = useState(false)

  const debounceFn = useCallback(debounce(async (val) => {
    const name = val.replace('.eth', '')
    const BigNumber = ethers.BigNumber
    const utils = ethers.utils
    const labelHash = utils.keccak256(utils.toUtf8Bytes(name))
    const tokenId = BigNumber.from(labelHash).toString()
    setIsFetchingEns(true)
    try {
      const data = await API.get(`https://metadata.ens.domains/mainnet/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85/${tokenId}`)
      const ensRecord: any = data.data
      data?.data && setEnsSearchRecord([ensRecord])
      setIsFetchingEns(false)
    } catch (err) {
      setIsFetchingEns(false)
      setEnsSearchRecord([])
    }
  }, 500), []);

  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mainnet}
    >
      <div className="display items-center">
        <div
          onClick={() => { window.location.href = '/' }}
          className='text-2xl font-semibold flex absolute top-[25px] left-[25px] z-10 cursor-pointer'
        >
          <img className="w-[30px] h-[35px] rounded-[6px] m-[5px] -mt-[2px]" alt={'logo'} src={require('./assets/logo.png')} />Snip3d
        </div>
        <ConnectWalletBtn {...pageProps} />
        <div className='w-full h-[70px] p-[10px] flex justify-center absolute top-[10px] left-[20px]'>
          <input
            className='w-[50%] h-full border-[1px] rounded-[6px] border-solid border-gray-300 outline-none p-[10px] -mt-[3px]'
            onChange={(t) => {
              setEnsSearch(t.target.value)
              debounceFn(t.target.value);
            }}
            value={ensNameSearch}
            placeholder={'Search any ENS domain...'}
          />
        </div>
      </div>

      <div className="mt-[100px]">
        <CustomBrowserRouter>
          <RouterInit />
        </CustomBrowserRouter>
      </div>

    </ThirdwebProvider>
  );
}