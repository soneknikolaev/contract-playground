import React, { memo, useCallback, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Layout as LayoutBase, Button, PageHeader, message } from 'antd';

import { requestAccountStart } from 'Store/ethereum/action';
import { selectAbi } from 'Store/contract/selector';
import { selectEthereumError, selectEthereumAccount } from 'Store/ethereum/selector';
import { selectContractIsLoaded } from 'Store/contract/selector';

import Contract from './Contract';
import Form from './Form';

import styles from './Layout.module.scss';

const { Content } = LayoutBase;

const Layout = memo(() => {
    const dispatch = useDispatch();
    const abi = useSelector(selectAbi);
    const error = useSelector(selectEthereumError);
    const account = useSelector(selectEthereumAccount);
    const address = useSelector(selectContractIsLoaded);

    const connectToWeb3 = useCallback(() => {
        dispatch(requestAccountStart());
    }, [dispatch]);

    const extra = useMemo(() => {
        if (!address) {
            return null;
        }

        return (
            <Button
                onClick={connectToWeb3}
                disabled={account}
                className={cx(styles.button, {
                    [styles.connected]: account
                })}
            >{account ? 'Connected to Web3' : 'Connect to Web3'}</Button>
        )
    }, [connectToWeb3, account, address]);

    useEffect(() => {
        error && message.error(error);
    }, [error]);

    return (
        <LayoutBase className={styles.container}>
            <PageHeader
                title="Contract Playground"
                className={styles.header}
                extra={extra}
            />
            <Content className={styles.content}>
                {abi.length ? <Contract abi={abi} /> : <Form />}
            </Content>
        </LayoutBase>
    )
});

export default Layout;