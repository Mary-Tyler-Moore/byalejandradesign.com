import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

class AllPostsMobile extends React.Component {
  render() {
    return (
      <section className="cloudStudio">
        {this.props.edges.map(({ node }) => (
          <article key={node.id} className="cloudStudio_post">
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

export default AllPostsMobile;
