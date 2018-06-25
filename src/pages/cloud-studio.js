import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

class CloudStudio extends React.Component {
  render() {
    console.log(this.props.data.allWordpressPost);
    return (
      <section className="cloudStudio">
        {this.props.data.allWordpressPost.edges.map(({ node }) => (
          <article className="cloudStudio_post">
            <h3 className="cloudStudio_postTitle">{node.title}</h3>
            <p className="cloudStudio_postDate">{node.date}</p>
            <div className="cloudStudio_postContent">
              {ReactHtmlParser(node.content)}
            </div>
          </article>
        ))}
      </section>
    );
  }
}

export default CloudStudio;

export const query = graphql`
  query AllBlogPosts {
    allWordpressPost {
      edges {
        node {
          id
          slug
          date
          title
          content
        }
      }
    }
  }
`;
