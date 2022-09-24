import React, { memo } from 'react';

import { AbiItemProps } from '../../../ContractProps';

import Outputs from '../Outputs';

const EventItem = memo(({ abiItem }) => {
    return (
        <Outputs outputs={abiItem.inputs} />
    )
});

EventItem.propTypes = {
    abiItem: AbiItemProps.isRequired,
}

export default EventItem;
