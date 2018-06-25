import AsyncLoader from './AsyncLoader';
/*
	Use AsyncLoader for sweet page based code splitting
*/

import Headings from '../Scratch/Headings';

const NotFound = AsyncLoader(() => import('../NotFound'));
const Contact = AsyncLoader(() => import('../Contact'));
const Checkout = AsyncLoader(() => import('../Checkout'));
const Store = AsyncLoader(() => import('../Store'));
const Cart = AsyncLoader(() => import('../Cart'));

const PageIndex = [
  {
    slug: 'cloud-studio',
    component: Headings,
    label: 'Cloud Studio',
  },
  {
    slug: 'store',
    component: Store,
    label: 'Store',
  },
  {
    slug: 'checkout',
    component: Checkout,
    label: 'Checkout',
  },
  {
    slug: 'contact',
    component: Contact,
    label: 'Contact',
  },
  {
    slug: 'cart',
    component: Cart,
  },
  {
    slug: 'privacy-policy',
    component: Headings,
  },
  {
    slug: 'return-policy',
    component: Headings,
  },
  {
    slug: '*',
    component: NotFound,
  },
];

export default PageIndex;
