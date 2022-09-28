import PropTypes from 'prop-types'

export const InOutPropProps = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    internalType: PropTypes.string.isRequired,
});

export const AbiItemProps = PropTypes.shape({
    anonymous: PropTypes.bool,
    stateMutability: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    outputs: PropTypes.arrayOf(InOutPropProps),
    inputs: PropTypes.arrayOf(InOutPropProps).isRequired,
});
