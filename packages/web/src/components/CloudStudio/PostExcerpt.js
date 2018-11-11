import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Button from '../Button';
import Text from '../Modulizer/Text';
import FluidImage from '../FluidImage';
// style
import './post-excerpt.sass';

const PostExcerpt = ({ node }) => {
  const slide = node.acf.slides_post.find(
    (slide) => slide.__typename === 'WordPressAcf_text'
  );

  return (
    <article className="postExcerpt">
      <FluidImage
        localFile={node.acf.thumbnail.localFile}
        to={`/cloud-studio/${node.slug}`}
        className="postExcerpt_image"
      />
      <section className="postExcerpt_content">
        <Link
          className="postExcerpt_titleLink"
          to={`/cloud-studio/${node.slug}`}
        >
          <h5 className="postExcerpt_title">{node.title}</h5>
        </Link>
        <Text slide={slide} excerpt />
      </section>
    </article>
  );
};

export const query = graphql`
  fragment PostExcerptFragment on wordpress__POST {
    id
    slug
    title
    date(formatString: "MM/DD/YYYY")
    content
    acf {
      slides_post {
        __typename
        ... on WordPressAcf_text {
          id
          text
        }
      }
      thumbnail {
        ...FluidImageFragment
      }
    }
  }
`;

export default PostExcerpt;
