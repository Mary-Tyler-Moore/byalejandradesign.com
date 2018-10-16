import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'gatsby';
import { BEM } from '@njmyers/component-library';
// style
import './all-posts.sass';

class AllPostsDesktop extends React.Component {
  render() {
    return (
      <section className="allPosts">
        {this.props.edges.map(({ node }) => (
          <BEM key={node.id} block="singlePostList">
            <article key={node.id}>
              <Link element="postTitle" to={`/cloud-studio/${node.slug}`}>
                <h2 className="cloudStudio_postTitle">{node.title}</h2>
              </Link>
              <p element="postDate">{new Date(node.date).toLocaleString()}</p>
              <div element="postContent">{ReactHtmlParser(node.content)}</div>
            </article>
          </BEM>
        ))}
      </section>
    );
  }
}

export default AllPostsDesktop;
