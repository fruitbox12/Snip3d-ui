import { gql } from 'graphql-request'

export const getQueryENSForETHAddress = (ensAddress: string) => {
  return gql`
    {
      domains(first: 1, where: { name: "${ensAddress.toLowerCase()}" }) {
        name
        labelName
        owner {
          id
          domains {
            id
          }
        }
      }
    }`
}


export const getAllEnsMetadata = (domainNameTokens: string) => {
  return gql`
    {
      domains( where: { id_in: [${domainNameTokens}] }) {
        id
        name
        labelName
        labelhash
        ttl
      }
    }`
}