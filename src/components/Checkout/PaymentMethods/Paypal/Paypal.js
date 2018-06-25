import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'smalldash';
// actions
import {
    createPaymentInstance,
    cancelCreatePaymentInstance,
    createPaymentInstanceError,
    savePaymentNonce,
} from '../payment-methods-actions';
// paypal checkout
import paypal from 'paypal-checkout';
// styles
import './paypal.sass';
// misc
import toOrderConfirmation from '../to-order-confirmation';

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

/**
 * Paypal button. Uses react driver and Braintree client
 * Documentation and helpful articles for Braintree/React integration
 * https://developers.braintreepayments.com/guides/paypal/overview/javascript/v3
 * https://github.com/paypal/paypal-checkout/blob/master/docs/frameworks.md
 */
class Paypal extends PureComponent {
    componentDidMount = () => this.props.paypalInstance();

    /**
     * Rename table of keys. Input the redux key and output the proper paypal key
     * @param {string} key object key to transform
     */
    renameKeyTable = (key) => {
        switch (key) {
            case 'fullName':
                return 'recipientName';
            case 'streetAddress1':
                return 'line1';
            case 'streetAddress2':
                return 'line2';
            case 'province':
                return 'state';
            default:
                return key;
        }
    };

    /**
     * Function to properly format the shipping address in paypal format
     * @param {object} address from redux we rename the property keys so paypal accepts it
     */
    formatPaypalAddress = (address = this.props.shippingAddress) => {
        const hash = {};

        Object.keys(address).forEach((key) => {
            // if (address[key])
            hash[this.renameKeyTable(key)] = address[key];
        });

        return hash;
    };

    /**
     * Paypal button function
     */
    payment = () =>
        this.props.payment.instance.createPayment({
            flow: 'checkout',
            currency: 'USD', // default to paying in USD for now
            amount: 10.0, // TODO: Make amount from redux cart.
            enableShippingAddress: true,
            shippingAddressEditable: false,
            shippingAddressOverride: this.formatPaypalAddress(),
        });

    onAuthorize = async (data) => {
        try {
            // tokenize
            const payload = await this.props.payment.instance.tokenizePayment(data);
            // save the nonce to redux state
            await this.props.paypalNonce(payload);
            // push to next step
            toOrderConfirmation(this.props);
        } catch (err) {
            this.props.paypalError({
                type: 'PAYPAL_TOKENIZATION_ERROR',
                message: 'Paypal error tokenizing',
            });
        }
    };

    onCancel = (data) => {
        this.props.paypalError({
            type: 'PAYPAL_CANCELLED',
            message: 'Paypal transaction was cancelled',
            err: data,
        });
    };

    onError = (err) => {
        this.props.paypalError({
            type: 'PAYPAL_CHECKOUT_JS_ERROR',
            message: 'Paypal checkout.js error',
            err,
        });
    };

    render() {
        return (
            <section className="paypal">
                {this.props.payment.method === 'paypal' ? (
                    <PayPalButton
                        env="sandbox"
                        commit={true}
                        payment={this.payment}
                        onAuthorize={this.onAuthorize}
                        onCancel={this.onCancel}
                        onError={this.onError}
                        style={{
                            color: 'blue',
                            size: 'responsive',
                            label: 'checkout',
                            tagline: false,
                            shape: 'rect',
                        }}
                    />
                ) : null}
                <button onClick={this.pushToNextStep}>Next</button>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    braintree: state.checkout.braintree,
    shippingAddress: state.checkout.shippingAddress,
    payment: state.checkout.payment,
});

const mapDispatchToProps = (dispatch) => ({
    paypalNonce: (payload) => dispatch(savePaymentNonce('paypal')(payload)),
    paypalError: (err) => dispatch(createPaymentInstanceError('paypal')(err)),
    paypalInstance: (options = {}) => dispatch(createPaymentInstance('paypal')(options)),
    cancelPaypalInstance: () => dispatch(cancelCreatePaymentInstance('paypal')()),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(Paypal);
