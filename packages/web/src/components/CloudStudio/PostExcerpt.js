import * as React from 'react';
import { graphql, Link } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
// style
import './post-excerpt.sass';

const PostExcerpt = ({ node }) => (
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
      {ReactHtmlParser(node.content)}
    </section>
  </article>
);

export const query = graphql`
  fragment PostExcerptFragment on wordpress__POST {
    id
    slug
    title
    date(formatString: "MM/DD/YYYY")
    content
  }
`;

export default PostExcerpt;
