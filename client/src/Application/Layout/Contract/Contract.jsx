import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import values from 'lodash/values';

import { ABI_TYPES, LIST_OF_DEFAULT_ABI_TYPES } from 'Constants';
import { getOnlyAbiByTypes } from 'Helpers';

import Header from './Header';
import List from './List';

import { AbiItemProps } from './ContractProps';

import styles from './Contract.module.scss';

const TYPES = values(ABI_TYPES);

const Contract = memo(({ abi }) => {
    const [selectedTypes, selectTypes] = useState(LIST_OF_DEFAULT_ABI_TYPES);
    const [activeAbiItems, setActiveAbiItems] = useState(
        getOnlyAbiByTypes(abi, selectedTypes)
    );

    const onChange = useCallback((types) => selectTypes(types), []);

    useEffect(() => {
        setActiveAbiItems(getOnlyAbiByTypes(abi, selectedTypes));
    }, [abi, selectedTypes]);

    return (
        <Row className={styles.container} gutter={[24, 12]}>
            <Col className={styles.header} span={24}>
                <Header types={TYPES} onChange={onChange} />
            </Col>
            <Col className={styles.content} span={24}>
                <List abi={activeAbiItems} />
            </Col>
        </Row>
    )
});

Contract.propTypes = {
    abi: PropTypes.arrayOf(AbiItemProps).isRequired,
};

export default Contract;