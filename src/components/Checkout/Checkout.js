import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AsyncLoader from '../Root/AsyncLoader';

import './checkout.sass';

const Cart = AsyncLoader(() => import('../Cart'));
const Address = AsyncLoader(() => import('./Address'));
const PaymentMethod = AsyncLoader(() => import('./PaymentMethods'));
const Confirmation = AsyncLoader(() => import('./Confirmation'));

const checkoutRoutes = [
  {
    path: '/',
    exact: true,
    component: Cart,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/shipping-address',
    component: Address,
  },
  {
    path: '/payment-method',
    component: PaymentMethod,
  },
  {
    path: '/order-confirmation',
    component: Confirmation,
  },
];

const Checkout = ({ match }) => {
  return (
    <section className="checkout">
      <aside className="checkout_portal">
        <Switch>
          {checkoutRoutes.map(({ component, path, status, exact }) => (
            <Route
              key={path}
              path={`${match.path}${path}`}
              exact={exact ? true : false}
              component={component}
              status={status ? status : 200}
            />
          ))}
        </Switch>
      </aside>
    </section>
  );
};

export default Checkout;
