export const NETWORKS = {
    MAINNET: 'mainnet',
    GOERLI: 'goerli',
    KOVAN: 'kovan',
    RINKEBY: 'rinkeby',
    ROPSTEN: 'ropsten',
    SEPOLIA: 'sepolia'
};

export const NETWORKS_API = {
    [NETWORKS.MAINNET]: "https://api.etherscan.io",
    [NETWORKS.GOERLI]: "https://api-goerli.etherscan.io",
    [NETWORKS.KOVAN]: "https://api-kovan.etherscan.io",
    [NETWORKS.RINKEBY]: "https://api-rinkeby.etherscan.io",
    [NETWORKS.ROPSTEN]: "https://api-ropsten.etherscan.io",
    [NETWORKS.SEPOLIA]: "https://api-sepolia.etherscan.io",
};

export const NETWORKS_CHAIN_ID = {
    [NETWORKS.MAINNET]: "1",
    [NETWORKS.GOERLI]: "420",
    [NETWORKS.KOVAN]: "42",
    [NETWORKS.RINKEBY]: "4",
    [NETWORKS.ROPSTEN]: "3",
    [NETWORKS.SEPOLIA]: "11155111",
};