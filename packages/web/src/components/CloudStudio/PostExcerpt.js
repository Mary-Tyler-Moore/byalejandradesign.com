import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Button from '../Button';
import Text from '../Modulizer/Text';
// style
import './post-excerpt.sass';

const PostExcerpt = ({ node }) => {
  const slide = node.acf.slides_post.find(
    (slide) => slide.__typename === 'WordPressAcf_text'
  );

  return (
    <article className="postExcerpt">
      <Link className="postExcerpt_titleLink" to={`/cloud-studio/${node.slug}`}>
        <h5 className="postExcerpt_title">{node.title}</h5>
      </Link>
      <p className="postExcerpt_date">
        <em>
          <time>{node.date}</time>
        </em>
      </p>
      <section className="postExcerpt_content">
        <Text slide={slide} excerpt />
      </section>
      <Link className="link-reset" to={`/cloud-studio/${node.slug}`}>
        <Button margin>Read More</Button>
      </Link>
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
    }
  }
`;

export default PostExcerpt;
