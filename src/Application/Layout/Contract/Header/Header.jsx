import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types'
import map from 'lodash/map';
import values from 'lodash/values';
import filter from 'lodash/filter';
import { Select, Tag } from 'antd';

import { ABI_TYPES, ABI_TYPES_COLOR, LIST_OF_DEFAULT_ABI_TYPES } from 'Constants';

import styles from './Header.module.scss';


const Header = memo(({ types, onChange }) => {
    const options = useMemo(() => map(types, type => ({ value: type })), [types]);
    const defaultValue = useMemo(() => {
        return filter(types, type => LIST_OF_DEFAULT_ABI_TYPES.includes(type));
    }, [types]);

    const tagRender = useCallback(({ label, value, ...rest }) => (
        <Tag {...rest} color={ABI_TYPES_COLOR[value]} className={styles.tag}>{label}</Tag>
    ), []);

    return (
        <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            defaultValue={defaultValue}
            options={options}
            onChange={onChange}
            className={styles.container}
        />
    )
});

Header.propTypes = {
    onChange: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(
        PropTypes.oneOf(values(ABI_TYPES))
    ).isRequired
}

export default Header;
