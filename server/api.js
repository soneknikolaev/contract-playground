const axios = require('axios');

const { API_KEY } = process.env;

const NETWORKS_API = {
    mainnet: "https://api.etherscan.io",
    goerli: "https://api-goerli.etherscan.io",
    kovan: "https://api-kovan.etherscan.io",
    rinkeby: "https://api-rinkeby.etherscan.io",
    ropsten: "https://api-ropsten.etherscan.io",
    sepolia: "https://api-sepolia.etherscan.io",
};

const getAbi = async (network, address) => {
    return axios.get(`${NETWORKS_API[network]}/api?module=contract&action=getabi&address=${address}&apikey=${API_KEY}`);
};

module.exports = {
    getAbi,
}