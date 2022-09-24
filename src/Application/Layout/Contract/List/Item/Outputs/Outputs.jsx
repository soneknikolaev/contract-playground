import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import map from 'lodash/map';

import { getTypeDescription } from 'Helpers';

import { InOutPropProps } from '../../../ContractProps';

import styles from './Outputs.module.scss';

const { Title, Text } = Typography;

const Outputs = memo(({ outputs }) => {
    if (outputs.length === 0) {
        return null
    }

    return (
        <>
            <Title level={5} className={styles.title}>Returns the type of message.</Title>
            <Row>
                {
                    map(outputs, (output, i) => {
                        const name = output.name || i;

                        return (
                            <Col key={name} className={styles.col}>
                                <Text strong className={styles.name}>{name}:</Text>
                                <Text type="warning"> {getTypeDescription(output)}</Text>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    );

});

Outputs.propTypes = {
    outputs: PropTypes.arrayOf(InOutPropProps).isRequired,
}


export default Outputs;
