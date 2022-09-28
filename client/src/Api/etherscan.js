import axios from 'axios';

import { SERVER_URL } from 'Constants';

export const getAbi = async (network, address) => {
    return axios.get(`${SERVER_URL}/getContractAbi?address=${address}&network=${network}`);
};
