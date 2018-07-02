// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '../Button';
import { BEM } from 'njmyers-component-library';
import { withCart } from '../Cart';
// styles
import './single-product.sass';
// string helpers
import { dollarString } from 'smalldash';
import title from './title.js';
import collectionFromProduct from './collection-from-product';
// types
import type { ProductNode } from './types';

type Props = {
  node: ProductNode,
  addOneToCart: () => null,
  sizes: {
    mobile: boolean,
  },
};

type State = {
  images: Array<{}>,
};

const CollectionLink = ({ node }) => (
  <Link
    element="button"
    to={`/shop/collection/${collectionFromProduct(node).slug}`}
  >
    <Button className="greyButton">Shop this Collection</Button>
  </Link>
);

/**
 * Displays single product
 * @param {ProductNode} node      graphql node of shop product
 * @param {function} addOneToCart  redux connect function to add to cart
 */
class SingleProduct extends React.Component<Props, State> {
  state = {
    active: 0,
  };

  componentDidMount() {
    this.startCarousel();
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  getFluid = (image) => image.localFile.childImageSharp.fluid;

  getACF = () => this.props.node.acf;

  getImages = () => {
    return [
      this.getFluid(this.getACF().main_image),
      ...this.getACF().additional_images.map(this.getFluid),
    ];
  };

  images = this.getImages();

  startCarousel = () => {
    this.setState({
      interval: setInterval(this.nextImage, 3000),
    });
  };

  stopCarousel = () => {
    clearInterval(this.state.interval);
  };

  nextImage = () => {
    console.log('thing');
    this.setState((state) => ({
      active: (state.active + 1) % this.images.length,
    }));
  };

  render() {
    return (
      <BEM block="singleProduct">
        <article>
          <aside element="imgContainer">
            {this.images.map((fluid, index) => (
              <div
                key={index}
                element="img"
                modifiers={index === this.state.active ? 'active' : ''}
              >
                <Img fluid={fluid} />
              </div>
            ))}
          </aside>
          <aside element="content">
            <h1 element="h1">{title(this.props.node)}</h1>
            <p element="description">{this.props.node.acf.description}</p>
            <p element="price">{dollarString(this.props.node.acf.price)}</p>
            <p element="quantity">
              Quantity Available: {this.props.node.acf.quantity}
            </p>
            <Button
              element="button"
              onClick={this.props.addOneToCart}
              name={this.props.node.id}
            >
              Add To Cart
            </Button>
            {this.props.node.collections ? (
              <CollectionLink node={this.props.node} />
            ) : null}
          </aside>
        </article>
      </BEM>
    );
  }
}
//
// const SingleProduct = ({ node, addOneToCart }: Props) => (
// );

export default withCart(SingleProduct);
