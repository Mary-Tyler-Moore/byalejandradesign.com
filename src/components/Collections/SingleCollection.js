/** @flow */
import * as React from 'react';
import { withCart } from '../Cart';
// style
import './single-collection.sass';
// types
import type { CollectionNode } from 'data';

type Props = {
  node: CollectionNode,
};

class SingleCollection extends React.Component<Props> {
  render() {
    return (
      <section className="singleCollection">
        <article className="singleCollection_article" key={this.props.node.id}>
          <h2 className="singleCollection_h2">{this.props.node.name}</h2>
          <p className="singleCollection_description">
            <em>{this.props.node.description}</em>
          </p>
        </article>
      </section>
    );
  }
}

export default withCart(SingleCollection);
