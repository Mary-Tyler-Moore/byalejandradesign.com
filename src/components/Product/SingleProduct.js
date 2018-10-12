import * as React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Button from '../Button';
import { withCart } from '../Cart';
// string helpers
import { dollarString } from 'smalldash';
import title from './title.js';
import collectionFromProduct from './collection-from-product';
// types
import type { ProductNode, ImageNode } from './types';
// styles
import './single-product.sass';
// utils
import getQuantity from './get-quantity';

type Props = {
  node: ProductNode,
  addOneToCart: () => null,
  sizes: {
    mobile: boolean,
  },
};

type State = {
  active: number,
  interval: IntervalID | null,
};

const CollectionLink = ({ node }) => (
  <Link
    className="singleProduct_buttonLink"
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
class SingleProduct extends React.PureComponent<Props, State> {
  state = {
    active: 0,
    interval: null,
  };

  componentDidMount() {
    if (this.images.length > 1) this.startCarousel();
  }

  componentWillUnmount() {
    this.stopCarousel();
  }

  fluid = (image: ImageNode) => image.localFile.childImageSharp.fluid;

  /**
   * Safely gather all images into an array
   * @return {array} [description]
   */
  getImages = (): Array<ImageNode> => {
    return Array.isArray(this.props.node.acf.additional_images)
      ? [
          this.props.node.acf.main_image,
          ...this.props.node.acf.additional_images,
        ]
      : [this.props.node.acf.main_image];
  };

  images = this.getImages().map(this.fluid);

  startCarousel = () => {
    this.setState({
      interval: setInterval(this.nextImage, 3000),
    });
  };

  stopCarousel = () => {
    if (this.state.interval) clearInterval(this.state.interval);
  };

  nextImage = () => {
    this.setState((state) => ({
      active: (state.active + 1) % this.images.length,
    }));
  };

  quantity = () => {
    return getQuantity(this.props.node, this.props.cart.products);
  };

  render() {
    return (
      <article className="singleProduct">
        <section className="singleProduct_imgContainer">
          {this.images.map((fluid, index) => (
            <figure
              key={index}
              className={`singleProduct_img ${
                index === this.state.active ? `singleProduct_img-active` : ``
              }${
                index === this.state.active - 1 ? `singleProduct_img-last` : ``
              }${
                index === this.state.active + 1 ? `singleProduct_img-next` : ``
              }`}
            >
              <Img fluid={fluid} />
            </figure>
          ))}
        </section>
        <section className="singleProduct_content">
          <h4 className="singleProduct_h4">{title(this.props.node)}</h4>
          <p className="singleProduct_description">
            {this.props.node.acf.description}
          </p>
          <aside className="singleProduct_bottomSection">
            <p className="singleProduct_monetary">
              <span>
                <strong>Price: </strong>
                <span
                  className={this.quantity() < 1 ? 'singleProduct-strike' : ''}
                >
                  {dollarString(this.props.node.acf.price)}
                </span>
                {this.quantity() < 1 && <span> Sold Out</span>}
              </span>
              <span className="singleProduct_quantity">
                Quantity Available: {this.quantity()}
              </span>
            </p>
            <Button
              className="singleProduct_button defaultButton"
              onClick={this.quantity() > 0 ? this.props.addOneToCart : null}
              name={this.props.node.id}
            >
              Add To Cart
            </Button>
            {this.props.node.collections ? (
              <CollectionLink node={this.props.node} />
            ) : null}
          </aside>
        </section>
      </article>
    );
  }
}

export default withCart(SingleProduct);
