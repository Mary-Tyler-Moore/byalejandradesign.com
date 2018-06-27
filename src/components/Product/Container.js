// connects to cart redux state
import { withCart } from '../Cart';
// components to add cart to
import _ProductList from './ProductList';
import _SingleProduct from './SingleProduct';

export const ProductList = withCart(_ProductList);
export const SingleProduct = withCart(_SingleProduct);
