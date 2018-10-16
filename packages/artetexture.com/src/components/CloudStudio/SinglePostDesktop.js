import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

class SinglePostDesktop extends React.Component {
  render() {
    return (
      <article className="cloudStudio_post">
        <h4 className="cloudStudio_h4">{this.props.node.title}</h4>
        <p className="cloudStudio_postDate">
          <em>
            <time>{new Date(this.props.node.date).toLocaleString()}</time>
          </em>
        </p>
        <section className="cloudStudio_postContent">
          {ReactHtmlParser(this.props.node.content)}
        </section>
      </article>
    );
  }
}

export default SinglePostDesktop;
