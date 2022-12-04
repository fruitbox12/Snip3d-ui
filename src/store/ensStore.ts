import { request } from 'graphql-request'
import { getQueryENSForETHAddress, getAllEnsMetadata } from './queries'

export const HTTP_GRAPHQL_ENDPOINT =
    'https://gateway.thegraph.com/api/b98715e7748cbaf4753dc56b630dc120/subgraphs/id/EjtE3sBkYYAwr45BASiFp8cSZEvd1VHTzzYFvJwQUuJx'

/*
 * @param ensAddress - the ENS address. Example: vitalik.eth
 * @return the Ethereum address or 0 string if invalid
 */
export async function queryENSForETHAddress(ensAddress: string): Promise<string> {
    if (!ensAddress || !ensAddress.toLowerCase().includes('.eth')) {
        return '0'
    }
    const result = await request(HTTP_GRAPHQL_ENDPOINT, getQueryENSForETHAddress(ensAddress))
    return result.domains && result.domains.length > 0
        ? result.domains[0].owner.id
        : '0'
}

export async function getEnsMetadata(domainNameTokens: string): Promise<string> {

    const result = await request(HTTP_GRAPHQL_ENDPOINT, getAllEnsMetadata(domainNameTokens))
    return result.domains
}