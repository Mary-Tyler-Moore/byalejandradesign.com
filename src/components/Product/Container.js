// connects to cart redux state
import { withCart } from '../Cart';
// components to add cart to
import _ProductListDesktop from './ProductListDesktop';
import _ProductListMobile from './ProductListMobile';
import _SingleProductDesktop from './SingleProductDesktop';
import _SingleProductMobile from './SingleProductMobile';

export const ProductListMobile = withCart(_ProductListMobile);
export const ProductListDesktop = withCart(_ProductListDesktop);
export const SingleProductMobile = withCart(_SingleProductMobile);
export const SingleProductDesktop = withCart(_SingleProductDesktop);
