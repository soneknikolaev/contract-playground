import { ethers } from 'ethers';

export const RULES = [
    { required: true, message: 'Please enter an contract adderss' },
    {
        message: 'The contract address is not valid.',
        validator: (_, value) => {
          if (ethers.utils.isAddress(value) || value === '') {
            return Promise.resolve();
          } else {
            return Promise.reject('Address is invalid');
          }
         }
       }
];