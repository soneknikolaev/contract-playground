export const ABI_TYPES = {
    EVENTS: 'events',
    READ: 'read',
    PAYABLE: 'payable',
    WRITE: 'write'
};

export const ABI_TYPES_COLOR = {
    [ABI_TYPES.EVENTS]: "#007aa6",
    [ABI_TYPES.READ]: "#355f7d",
    [ABI_TYPES.PAYABLE]: "#b84040",
    [ABI_TYPES.WRITE]: "#c97539"
};

export const LIST_OF_DEFAULT_ABI_TYPES = [ABI_TYPES.READ, ABI_TYPES.PAYABLE, ABI_TYPES.WRITE];