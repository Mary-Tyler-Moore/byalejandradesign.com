import React from 'react';

const SelfHostedVideo = ({ slide }) => {
  const files = slide.sources.map((type) => {
    const file = slide[type];
    return <source key={file.id} src={file.url} type={file.mime_type} />;
  });

  return (
    <article className="video__container">
      <video className="video" controls preload="auto" width="100%">
        {files}
      </video>
    </article>
  );
};

export default SelfHostedVideo;
