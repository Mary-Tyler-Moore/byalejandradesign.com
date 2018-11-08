import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Modulizer from '../Modulizer';
import Button from '../Button';
import './single-post.sass';

const SinglePost = ({ node }) => {
  return (
    <article className="singlePost">
      <h4 className="singlePost_title">{node.title}</h4>
      <p className="singlePost_date">
        <em>
          <time>{node.date}</time>
        </em>
      </p>
      <section className="singlePost_content">
        {node.acf.slides_post.map((slide) => (
          <Modulizer key={slide.id} slide={slide} />
        ))}
      </section>
      <section className="singlePost_buttons">
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
        # ... on WordPressAcf_heading {
        #   id
        #   heading
        # }
        # ... on WordPressAcf_youtube {
        #   id
        #   video_id
        # }
        # ... on WordPressAcf_image {
        #   id
        #   singleImage: images {
        #     ...FluidImageFragment
        #   }
        # }
      }
    }
  }
`;

export default SinglePost;
