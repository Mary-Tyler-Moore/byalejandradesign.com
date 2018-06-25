const toOrderConfirmation = ({ history }) => {
    history.push('/checkout/order-confirmation');

    window.scroll({
        top: 0,
    });
};

export default toOrderConfirmation;
