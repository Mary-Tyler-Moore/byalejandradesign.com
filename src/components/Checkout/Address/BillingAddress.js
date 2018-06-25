import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// actions
import { updateAddressField } from './address-actions';
// components
import createAddressForm from './create-address-form';
// styles
import './address.sass';

const BillingAddress = createAddressForm('billingAddress');

class Address extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            billingIsShipping: true,
        };
    }

    onCheckBilling = (event) => {
        this.props.updateAddressDirectly(event);
        this.setState((state) => ({ billingIsShipping: !state.billingIsShipping }));
    };

    validateForm = () => {
        console.log('validating');
    };

    render() {
        return (
            <React.Fragment>
                <p>Click Here if Billing Address is different then Shipping Address</p>
                <input type="checkbox" onChange={this.onCheckBilling} />
                {!this.state.billingIsShipping ? <BillingAddress /> : undefined}
            </React.Fragment>
        );
    }
}

/**
 * Instead of passing checkout object pass each key on checkout as an individual prop
 * @param {*} state redux state
 */
const mapStateToProps = (state) => {
    const keys = Object.keys(state.checkout);
    const props = {};
    keys.forEach((key) => (props[key] = state.checkout[key]));
    return props;
};

const mapDispatchToProps = (dispatch) => ({
    updateAddressField: (action) => dispatch(updateAddressField(action)),
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    /**
     * Copies Shipping Address values to Billing Address by accessing state
     * @param {object} event synthetic react event
     */
    updateAddressDirectly: (event) => {
        const { checked } = event.target;
        const keys = Object.keys(stateProps.shippingAddress);
        keys.forEach((key) => {
            dispatchProps.updateAddressField({
                slice: 'billingAddress',
                payload: checked ? stateProps.shippingAddress[key] : '',
                key,
            });
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(withRouter(Address));
