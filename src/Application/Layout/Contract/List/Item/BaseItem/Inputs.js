import React, { memo } from 'react';
import { Input, Form } from 'antd';
import map from 'lodash/map';

import { ABI_TYPES } from 'Constants';
import { ABI_TYPES_FILTERS } from 'Helpers';

import { AbiItemProps } from '../../../ContractProps';

const { Item } = Form;

const Inputs = memo(({ abiItem }) => {
    const isPayable = ABI_TYPES_FILTERS[ABI_TYPES.PAYABLE](abiItem);

    return (
        <>
            {
                isPayable && (
                    <Item name='payableAmount' label={abiItem.name}>
                        <Input placeholder='payableAmount (ether)' />
                    </Item>
                )
            }
            {
                map(abiItem.inputs, (inputData) => {
                    const label = `${inputData.name} (${inputData.type})`;
        
                    return (
                        <Item name={inputData.name} key={inputData.name} label={label}>
                            <Input placeholder={label} />
                        </Item>
                    )
                })
            }
        </>
    )
});

Inputs.propTypes = {
    abiItem: AbiItemProps.isRequired,
}

export default Inputs;