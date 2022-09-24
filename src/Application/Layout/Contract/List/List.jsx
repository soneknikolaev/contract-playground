import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Collapse } from 'antd';
import { utils } from 'ethers';

import map from 'lodash/map';
import values from 'lodash/values';

import { ABI_TYPES_COLOR } from 'Constants';
import { getAbiType, getContract } from 'Helpers';
import { selectContractAddress } from 'Store/contract/selector';
import { selectEthereumAccount } from 'Store/ethereum/selector';

import { AbiItemProps } from '../ContractProps';

import Item from './Item';

const { Panel } = Collapse;

const List = memo(({ abi }) => {
    const [contract, setContract] = useState();
    const contractAddress = useSelector(selectContractAddress);
    const walletAddress = useSelector(selectEthereumAccount);

    const onCallContractMethod = useCallback(async (methodName, fieldsValues) => {
        if (!(contract && contract[methodName])) return;

        const { payableAmount, ...otherValues } = fieldsValues;
        const args = values(otherValues);

        if (payableAmount) {
            args.push({
                value: utils.parseEther(payableAmount)
            })
        }

        return contract[methodName](...args);
    }, [contract]);

    useEffect(() => {
        if (walletAddress) {
            const contract = getContract(contractAddress, walletAddress, abi);

            setContract(contract);
        }
    }, [contractAddress, walletAddress, abi]);

    if (!abi.length) {
        return null;
    }

    return (
        <Collapse>
            {
                map(abi, (abiItem) => {
                    const type = getAbiType(abiItem);
                    const backgroundColor = ABI_TYPES_COLOR[type];

                    return (
                        <Panel header={abiItem.name} key={abiItem.name} style={{ backgroundColor }}>
                            <Item abiItem={abiItem} onCall={onCallContractMethod} />
                        </Panel>
                    )
                })
            }
        </Collapse>
    )
});

List.propTypes = {
    abi: PropTypes.arrayOf(AbiItemProps).isRequired
};

export default List;