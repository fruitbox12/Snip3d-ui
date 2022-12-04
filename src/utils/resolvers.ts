import { setupENS, getProvider } from '@ensdomains/ui'
import { ethers } from "ethers";
import { ExternalProvider } from '../components/Home';

export const setup = async ({
    reloadOnAccountsChange,
    enforceReadOnly,
    enforceReload,
    customProvider,
    ensAddress
}: {
    reloadOnAccountsChange?: Boolean,
    enforceReadOnly: Boolean,
    enforceReload: Boolean,
    customProvider: String,
    ensAddress?: String
}) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider, "any");
    const pro = await getProvider()
    let option = {
        reloadOnAccountsChange: false,
        enforceReadOnly,
        enforceReload,
        customProvider: provider,
        ensAddress: "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85"
    }
    console.log("=====option====", option)
    console.log("=====pro====", pro)
    const {
        ens: ensInstance,
        providerObject,
        network
    } = await setupENS(option)
    let ens = ensInstance
    console.log('======network====', network)
    return { ens, providerObject }
}

export const ensInit = async (provider: any) => {
    const rpcUrl = 'https://web3.ens.domains/v1/mainnet'
    // let provider
    console.log("=====window.ethereum====", window.ethereum)
    const { providerObject, ens } = await setup({
        customProvider: window.ethereum || provider,
        reloadOnAccountsChange: false,
        enforceReadOnly: true,
        enforceReload: false
    })
    provider = providerObject
    console.log("=====provider====", provider)
    return { ens }
}

export const getENS = async (provider: any) => {
    const { ens } = await ensInit(provider)
    return ens
}

// export const addTransaction = async ({ txHash, txState }: { txHash: string, txState: any }) => {
//     const newTransaction = {
//         txHash,
//         txState,
//         createdAt: new Date().getTime(),
//         updatedAt: new Date().getTime(),
//         __typename: 'Transaction'
//     }

//     const previous = transactionHistoryReactive()
//     const index = previous.transactionHistory.findIndex(
//         trx => trx.txHash === txHash
//     )
//     const newTransactionHistory = [...previous.transactionHistory]
//     if (index >= 0) {
//         newTransactionHistory[index] = {
//             ...newTransactionHistory[index],
//             txState,
//             updatedAt: newTransaction.updatedAt
//         }
//     } else {
//         newTransactionHistory.push(newTransaction)
//     }

//     const data = {
//         transactionHistory: newTransactionHistory
//     }
//     transactionHistoryReactive(data)
//     return data
// }

export const sendHelper = async (txObj: any) => {
    return new Promise(async resolve => {
        resolve(txObj.hash)
        let txState = 'Pending'
        console.log("=====txObj=====", txObj)
        // addTransaction({ txHash: txObj.hash, txState })

        // const receipt = await txObj.wait()
        // const txHash = receipt.transactionHash
        // txState = 'Confirmed'
        // addTransaction({ txHash, txState })
    })
}


export const resolvers = {
    Mutation: {
        //   registerTestdomain: async (_, { label }) => {
        //     const registrar = getRegistrar()
        //     const tx = await registrar.registerTestdomain(label)
        //     return sendHelper(tx)
        //   },
        //   setName: async (_, { name }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.claimAndSetReverseRecordName(name)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   setOwner: async (_, { name, address }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.setOwner(name, address)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   setSubnodeOwner: async (_, { name, address }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.setSubnodeOwner(name, address)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   setResolver: async (_, { name, address }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.setResolver(name, address)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   setAddress: async (_, { name, recordValue }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.setAddress(name, recordValue)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   setAddr: async (_, { name, key, recordValue }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.setAddr(name, key, recordValue)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        // setContent: async (name: string, recordValue: string) => {
        //     try {
        //         const ens = await getENS()
        //         const tx = await ens.setContent(name, recordValue)
        //         return sendHelper(tx)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        // setContenthash: async (name: string, recordValue: string) => {
        //     try {
        //         const ens = await getENS()
        //         const tx = await ens.setContenthash(name, recordValue)
        //         return sendHelper(tx)
        //     } catch (e) {
        //         console.log(e)
        //     }
        // },
        setText: async (provider: any, name: string, key: string, recordValue: string) => {
            try {
                const ens = await getENS(provider)
                const tx = await ens.setText(name, key, recordValue)
                console.log(tx.hash)
                // 0x123456...
                const receipt = await tx.wait()
                return sendHelper(tx)
            } catch (e) {
                console.error(e)
            }
        },
        //   addMultiRecords: async (_, { name, records }) => {
        //     const ens = getENS()

        //     const provider = await getProvider()
        //     const resolver = await ens.getResolver(name)
        //     const resolverInstanceWithoutSigner = await getResolverContract({
        //       address: resolver,
        //       provider
        //     })
        //     const signer = await getSigner()
        //     const resolverInstance = resolverInstanceWithoutSigner.connect(signer)

        //     if (records.length === 1) {
        //       return await handleSingleTransaction(name, records[0], resolverInstance)
        //     }
        //     return await handleMultipleTransactions(name, records, resolverInstance)
        //   },
        //   migrateResolver: async (_, { name }) => {
        //     const ens = getENS()
        //     const provider = await getProvider()

        //     function setupTransactions({ name, records, resolverInstance }) {
        //       try {
        //         const resolver = resolverInstance.interface
        //         const namehash = getNamehash(name)
        //         const transactionArray = records.map((record, i) => {
        //           switch (i) {
        //             case 0:
        //               if (parseInt(record, 16) === 0) return undefined
        //               return resolver.encodeFunctionData('setAddr(bytes32,address)', [
        //                 namehash,
        //                 record
        //               ])
        //             case 1:
        //               if (!record || parseInt(record, 16) === 0) return undefined
        //               return resolver.encodeFunctionData('setContenthash', [
        //                 namehash,
        //                 record
        //               ])
        //             case 2:
        //               return record.map(textRecord => {
        //                 if (textRecord.value.length === 0) return undefined
        //                 return resolver.encodeFunctionData('setText', [
        //                   namehash,
        //                   textRecord.key,
        //                   textRecord.value
        //                 ])
        //               })
        //             case 3:
        //               return record.map(coinRecord => {
        //                 if (parseInt(coinRecord.value, 16) === 0) return undefined
        //                 const { decoder, coinType } = formatsByName[coinRecord.key]
        //                 let addressAsBytes
        //                 if (!coinRecord.value || coinRecord.value === '') {
        //                   addressAsBytes = Buffer.from('')
        //                 } else {
        //                   addressAsBytes = decoder(coinRecord.value)
        //                 }
        //                 return resolver.encodeFunctionData(
        //                   'setAddr(bytes32,uint256,bytes)',
        //                   [namehash, coinType, addressAsBytes]
        //                 )
        //               })
        //             default:
        //               throw Error('More records than expected')
        //           }
        //         })

        //         // flatten textrecords and addresses and remove undefined
        //         return transactionArray.flat().filter(bytes => bytes)
        //       } catch (e) {
        //         console.log('error creating transaction array', e)
        //       }
        //     }

        //     function calculateIsOldContentResolver(resolver) {
        //       const oldContentResolvers = [
        //         '0x5ffc014343cd971b7eb70732021e26c35b744cc4',
        //         '0x6dbc5978711cb22d7ba611bc18cec308ea12ea95',
        //         '0xbf80bc10d6ebfee11bea9a157d762110a0b73d95'
        //       ]
        //       const localResolvers = process.env.REACT_APP_OLD_CONTENT_RESOLVERS
        //         ? process.env.REACT_APP_OLD_CONTENT_RESOLVERS.split(',')
        //         : []

        //       const oldResolvers = [...oldContentResolvers, ...localResolvers].map(
        //         a => {
        //           return a.toLowerCase()
        //         }
        //       )

        //       return oldResolvers.includes(resolver.toLowerCase())
        //     }

        //     function buildKeyValueObjects(keys, values) {
        //       return values.map((record, i) => ({
        //         key: keys[i],
        //         value: record
        //       }))
        //     }

        //     async function getAllTextRecords(name) {
        //       const promises = TEXT_RECORD_KEYS.map(key => ens.getText(name, key))
        //       const records = await Promise.all(promises)
        //       return buildKeyValueObjects(TEXT_RECORD_KEYS, records)
        //     }

        //     async function getAllTextRecordsWithResolver(name, resolver) {
        //       const promises = TEXT_RECORD_KEYS.map(key =>
        //         ens.getTextWithResolver(name, key, resolver)
        //       )
        //       const records = await Promise.all(promises)
        //       return buildKeyValueObjects(TEXT_RECORD_KEYS, records)
        //     }

        //     async function getAllAddresses(name) {
        //       const promises = COIN_LIST_KEYS.map(key => ens.getAddr(name, key))
        //       const records = await Promise.all(promises)
        //       return buildKeyValueObjects(COIN_LIST_KEYS, records)
        //     }

        //     async function getAllAddressesWithResolver(name, resolver) {
        //       const promises = COIN_LIST_KEYS.map(key =>
        //         ens.getAddrWithResolver(name, key, resolver)
        //       )
        //       const records = await Promise.all(promises)
        //       return buildKeyValueObjects(COIN_LIST_KEYS, records)
        //     }

        //     async function getOldContent(name) {
        //       const resolver = await ens.getResolver(name)
        //       const namehash = getNamehash(name)
        //       const resolverInstanceWithoutSigner = await getOldResolverContract({
        //         address: resolver,
        //         provider
        //       })
        //       const content = await resolverInstanceWithoutSigner.content(namehash)
        //       const { encoded } = encodeContenthash('bzz://' + content)
        //       return encoded
        //     }

        //     async function getContenthash(name) {
        //       const resolver = await ens.getResolver(name)
        //       return getContenthashWithResolver(name, resolver)
        //     }

        //     async function getContenthashWithResolver(name, resolver) {
        //       const namehash = getNamehash(name)
        //       const resolverInstanceWithoutSigner = await getResolverContract({
        //         address: resolver,
        //         provider
        //       })
        //       return await resolverInstanceWithoutSigner.contenthash(namehash)
        //     }

        //     async function getAllRecords(name, isOldContentResolver) {
        //       const promises = [
        //         ens.getAddress(name),
        //         isOldContentResolver ? getOldContent(name) : getContenthash(name),
        //         getAllTextRecords(name),
        //         getAllAddresses(name)
        //       ]
        //       return Promise.all(promises)
        //     }

        //     async function getAllRecordsNew(name, publicResolver) {
        //       const promises = [
        //         ens.getAddrWithResolver(name, publicResolver),
        //         getContenthashWithResolver(name, publicResolver),
        //         getAllTextRecordsWithResolver(name, publicResolver),
        //         getAllAddressesWithResolver(name, publicResolver)
        //       ]
        //       return Promise.all(promises)
        //     }

        //     function areRecordsEqual(oldRecords, newRecords) {
        //       return isEqual(oldRecords, newRecords)
        //     }

        //     // get public resolver
        //     try {
        //       const publicResolver = await ens.getAddress('resolver.eth')
        //       const resolver = await ens.getResolver(name)
        //       const isOldContentResolver = calculateIsOldContentResolver(resolver)

        //       // get old and new records in parallel
        //       const [records, newResolverRecords] = await Promise.all([
        //         getAllRecords(name, isOldContentResolver),
        //         getAllRecordsNew(name, publicResolver)
        //       ])

        //       // compare new and old records
        //       if (!areRecordsEqual(records, newResolverRecords)) {
        //         //get the transaction by using contract.method.encode from ethers
        //         const resolverInstanceWithoutSigner = await getResolverContract({
        //           address: publicResolver,
        //           provider
        //         })
        //         const signer = await getSigner()
        //         const resolverInstance = resolverInstanceWithoutSigner.connect(signer)
        //         const transactionArray = setupTransactions({
        //           name,
        //           records,
        //           resolverInstance
        //         })
        //         //add them all together into one transaction
        //         const tx1 = await resolverInstance.multicall(transactionArray)
        //         //once the record has been migrated, migrate the resolver using setResolver to the new public resolver
        //         const tx2 = await ens.setResolver(name, publicResolver)
        //         //await migrate records into new resolver
        //         return sendHelperArray([tx1, tx2])
        //       } else {
        //         const tx = await ens.setResolver(name, publicResolver)
        //         const value = await sendHelper(tx)
        //         return [value]
        //       }
        //     } catch (e) {
        //       console.log('Error migrating resolver', e)
        //       throw e
        //     }
        //   },
        //   migrateRegistry: async (_, { name, address }) => {
        //     try {
        //       const ens = getENS()
        //       const resolver = await ens.getResolver(name)
        //       const tx = await ens.setSubnodeRecord(name, address, resolver)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   createSubdomain: async (_, { name }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.createSubdomain(name)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   },
        //   deleteSubdomain: async (_, { name }) => {
        //     try {
        //       const ens = getENS()
        //       const tx = await ens.deleteSubdomain(name)
        //       return sendHelper(tx)
        //     } catch (e) {
        //       console.log(e)
        //     }
        //   }
    }
}

export default resolvers