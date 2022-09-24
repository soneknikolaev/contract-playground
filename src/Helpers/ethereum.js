export const getEthereum = () => {
    const { ethereum } = window;
  
    if (typeof ethereum === 'undefined') {
      throw new Error('Metamask is not installed');
    }

    return ethereum;
};