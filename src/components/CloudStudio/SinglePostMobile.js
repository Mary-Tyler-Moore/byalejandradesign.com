import * as React from 'react';
import ReactHtmlParser from 'react-html-parser';

class SinglePostMobile extends React.Component {
  render() {
    return (
      <article className="cloudStudio_post">
        <h3 className="cloudStudio_postTitle">{this.props.node.title}</h3>
        <p className="cloudStudio_postDate">{this.props.node.date}</p>
        <div className="cloudStudio_postContent">
          {ReactHtmlParser(this.props.node.content)}
        </div>
      </article>
    );
  }
}

export default SinglePostMobile;
