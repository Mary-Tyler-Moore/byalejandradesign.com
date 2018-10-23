import * as React from 'react';
import { graphql } from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import './single-post.sass';

const SinglePost = ({ node }) => (
  <article className="singlePost">
    <h4 className="singlePost_title">{node.title}</h4>
    <p className="singlePost_date">
      <em>
        <time>{node.date}</time>
      </em>
    </p>
    <section className="singlePost_content">
      {ReactHtmlParser(node.content)}
    </section>
  </article>
);

export const query = graphql`
  fragment SinglePostFragment on wordpress__POST {
    id
    slug
    title
    date(formatString: "MM/DD/YYYY")
    content
  }
`;

export default SinglePost;
