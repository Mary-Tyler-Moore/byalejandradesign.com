import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

class SinglePostDesktop extends React.Component {
  render() {
    return (
      <article className="cloudStudio_post">
        <h1 className="cloudStudio_postTitle">{this.props.node.title}</h1>
        <p className="cloudStudio_postDate">
          {new Date(this.props.node.date).toLocaleString()}
        </p>
        <div className="cloudStudio_postContent">
          {ReactHtmlParser(this.props.node.content)}
        </div>
      </article>
    );
  }
}

export default SinglePostDesktop;
