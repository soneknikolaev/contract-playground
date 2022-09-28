import { Contract, providers } from 'ethers';

import { NETWORKS_CHAIN_ID } from 'Constants';
import { getEthereum } from 'Helpers';

export const geChainId = (network) => {
    if (!NETWORKS_CHAIN_ID[network]) {
        throw new Error(`${network} is not exist.`)
    }

    return NETWORKS_CHAIN_ID[network];
}

export const getContract = (contractAddress, walletAddress, abi) => {
    try {
        const ethereum = getEthereum();
        const provider = new providers.Web3Provider(ethereum);
        const signer = provider.getSigner(walletAddress);
        const contract = new Contract(contractAddress, abi, signer);

        return contract;
    } catch(error) {
        console.error(error);

        return null;
    }
}