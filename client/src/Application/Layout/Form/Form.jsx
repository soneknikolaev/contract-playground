import React, { memo, useMemo, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Input, Select, Form as FormBase, Button, message } from 'antd';
import every from 'lodash/every';
import map from 'lodash/map';

import { NETWORKS } from 'Constants';
import { fetchAbiStart } from 'Store/contract/action';
import { selectContractIsLoading, selectContractError } from 'Store/contract/selector';

import { RULES } from './rules';

import styles from './Form.module.scss';

const { Item } = FormBase;
const { Option } = Select;

const Form = memo(() => {
    const [isValid, setValid] = useState(false);

    const dispatch = useDispatch();
    const [form] = FormBase.useForm();

    const isLoading = useSelector(selectContractIsLoading);
    const error = useSelector(selectContractError);

    const list = useMemo(() => {
        return map(NETWORKS, (network) => (
            <Option value={network} key={network}>{network}</Option>
        ));
    }, []);

    useEffect(() => {
        error && message.error(error);
    }, [error]);

    const onFieldsChange = useCallback(async () => {
        const isValid = every(form.getFieldsError(), ({ errors }) => !errors.length);

        setValid(isValid);
    }, [form]);

    const onFinish = useCallback(async ({ address, network }) => {
        dispatch(fetchAbiStart(address, network))
    }, [dispatch]);

    return (
        <FormBase
            form={form}
            className={styles.container}
            name="basic"
            onFieldsChange={onFieldsChange}
            initialValues={{ remember: true, network: NETWORKS.MAINNET }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Item name="address" rules={RULES}>
                <Input placeholder="address" />
            </Item>
            <Item name="network">
                <Select>
                    {list}
                </Select>  
            </Item>
            <Item labelAlign="center" >
                <Button type="primary" htmlType="submit" className={styles.button} disabled={!isValid || isLoading}>
                    Get Interface
                </Button>
            </Item>
        </FormBase>
    )

});

export default Form;