import * as React from 'react';
import { Link } from 'react-router-dom';

import { LazyImage } from '@njmyers/component-library';
// styles
import './sidebar.sass';

const StoreSidebar = ({ collections }) => (
  <React.Fragment>
    <section className="storeSidebar">
      <h3>Collections</h3>
      {collections.map((collection) => (
        <article className="storeSidebarCollection" key={collection.id}>
          <Link to={`/store?collection=${collection.slug}`}>
            <LazyImage
              className="collectionPhoto"
              src={collection.acf.image.sizes.medium_large}
            />
          </Link>
          <h4>{collection.name}</h4>
        </article>
      ))}
    </section>
  </React.Fragment>
);

export default StoreSidebar;
