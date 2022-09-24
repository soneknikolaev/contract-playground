import axios from 'axios';

import { NETWORKS_API, API_KEY } from 'Constants';

export const getAbi = async (network, address) => {
    return axios.get(`${NETWORKS_API[network]}/api?module=contract&action=getabi&address=${address}&apikey=${API_KEY}`);
};
