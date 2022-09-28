import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types'

import { ABI_TYPES } from 'Constants';
import { getAbiType } from 'Helpers';

import BaseItem from './BaseItem';
import EventItem from './EventItem';

import { AbiItemProps } from '../../ContractProps';

const Item = memo(({ abiItem, onCall }) => {
    const type = useMemo(() => getAbiType(abiItem), [abiItem]);

    if (type === ABI_TYPES.EVENTS) {
        return <EventItem abiItem={abiItem} />
    }

    return <BaseItem abiItem={abiItem} onCall={onCall} />

});

Item.propTypes = {
    abiItem: AbiItemProps.isRequired,
    onCall: PropTypes.func.isRequired,
};

export default Item;
