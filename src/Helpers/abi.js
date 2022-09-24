import get from 'lodash/get';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import filter from 'lodash/filter';
import some from 'lodash/some';
import findKey from 'lodash/findKey';
import flatten from 'lodash/flatten';
import values from 'lodash/values';

import { ABI_TYPES } from 'Constants';

export const ABI_TYPES_FILTERS = {
    [ABI_TYPES.EVENTS]: (abi) => abi.type === "event",
    [ABI_TYPES.PAYABLE]: (abi) => abi.stateMutability === "payable",
    [ABI_TYPES.READ]: (abi) => abi.stateMutability === "view" || abi.stateMutability === "pure",
    [ABI_TYPES.WRITE]: (abi) => abi.stateMutability === "nonpayable",
};

export const getOnlyAbiByTypes = (abi, types) => {
    const filters = map(types, (type) => ABI_TYPES_FILTERS[type]);

    return filter(abi, (abiItem) => some(filters, (typeCheck) => typeCheck(abiItem)));
}

export const getAbiType = (abiItem) => {
    return findKey(ABI_TYPES_FILTERS, (typeFilter) => typeFilter(abiItem));
}

export const sortAbiByType = (abi) => {
    const abiItemsByType = reduce(abi, (acc, abiItem) => {
        const type = getAbiType(abiItem);

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(abiItem);

        return acc;
    }, {});

    return flatten(values(abiItemsByType));
}

export const getNotVirtualAbi = (abi) => {
    return filter(abi, (abiItem) => {
        return get(abiItem, 'outputs', []).length || get(abiItem, 'inputs', []).length;
    });
}

export const isTuple = (abiItem) => abiItem.type === 'tuple';

export const getTypeDescription = (item) => {
    if (!isTuple(item)) {
        return item.type;
    }

    const tupleObject = reduce(item.components, (acc, component) => {
        acc[component.name] = isTuple(component) ? getTypeDescription(component) : component.type;

        return acc;
    }, {});

    return JSON.stringify(tupleObject);
}