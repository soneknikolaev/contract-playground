import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';
import { Form, Button, Alert } from 'antd';

import { ABI_TYPES, ABI_TYPES_COLOR, ETHERSCAN_URLS } from 'Constants';
import { ABI_TYPES_FILTERS, getAbiType } from 'Helpers';

import { selectEthereumAccount } from 'Store/ethereum/selector';
import { selectContractNetwork } from 'Store/contract/selector';

import Outputs from '../Outputs';

import { AbiItemProps } from '../../../ContractProps';

import Inputs from './Inputs';

import styles from './BaseItem.module.scss';

const { Item } = Form;

const BaseItem = memo(({ abiItem, onCall }) => {
    const [form] = Form.useForm();
    const walletAddress = useSelector(selectEthereumAccount);
    const network = useSelector(selectContractNetwork);
    const [result, setResult] = useState('');
    const [hash, setHash] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const isRead = useMemo(() => ABI_TYPES_FILTERS[ABI_TYPES.READ](abiItem), [abiItem]);

    const buttonStyles = useMemo(() => {
        const color = ABI_TYPES_COLOR[getAbiType(abiItem)];

        return {
            background: color,
            borderColor: color,
        }
    }, [abiItem]);

    const onFinish = useCallback(async (values) => {
        try {
            setLoading(true);
            const result = await onCall(abiItem.name, values);

            isRead ? setResult(result.toString()) : setHash(result.hash);
        } catch ({ message }) {
            setError(message);
            isRead ? setResult('') : setHash('');
        } finally {
            setLoading(false);
        }
    }, [abiItem, onCall, isRead]);

    const onViewTransaction = useCallback(() => {
        window.open(`${ETHERSCAN_URLS[network]}/tx/${hash}`, '_blank');
    }, [hash, network]);

    return (
        <>
            <Form
                form={form}
                className={styles.container}
                name={abiItem.name}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Inputs abiItem={abiItem} />
                <Item labelAlign="center" className={styles.buttons}>
                    <Button 
                        htmlType="submit"
                        type="primary"
                        style={buttonStyles}
                        className={styles.button}
                        disabled={!walletAddress || isLoading}
                    >
                        {isRead ? 'Query' : 'Write'}
                    </Button>

                    {hash && (
                        <Button
                            onClick={onViewTransaction}
                            style={buttonStyles}
                            className={styles.button}
                        >
                            View your transaction
                        </Button>
                    )}
                </Item>
            </Form>
            {result && <Alert message={result} type="info" className={styles.response} />}
            {error && <Alert message={error} type="error" />}
            <Outputs outputs={abiItem.outputs} />
        </>
    )
});

BaseItem.propTypes = {
    abiItem: AbiItemProps.isRequired,
    onCall: PropTypes.func.isRequired,
}

export default BaseItem;