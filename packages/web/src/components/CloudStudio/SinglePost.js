import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Modulizer from '../Modulizer';
import Button from '../Button';

import './single-post.sass';

const SinglePost = ({ node }) => {
  return (
    <article className="singlePost">
      <h4 className="headline" style={{ margin: 0 }}>
        {node.title}
      </h4>
      <p className="subtitle-headline" style={{ margin: 0 }}>
        <em>
          <time>{node.date}</time>
        </em>
      </p>
      <section>
        {node.acf.slides_post.map((slide) => (
          <Modulizer key={slide.id} slide={slide} />
        ))}
      </section>
      <section>
        <Link className="link-reset" to="/cloud-studio">
          <Button className="greyButton">{`Back to Cloud Studio`}</Button>
        </Link>
      </section>
    </article>
  );
};

export const query = graphql`
  fragment SinglePostFragment on wordpress__POST {
    id
    slug
    title
    date(formatString: "MM/DD/YYYY")
    acf {
      slides_post {
        __typename
        ... on WordPressAcf_text {
          id
          text
        }
        ... on WordPressAcf_gallery {
          id
          display
          images {
            ...FluidImageFragment
          }
        }
      }
    }
  }
`;

export default SinglePost;
