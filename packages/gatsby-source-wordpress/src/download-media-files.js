const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const { pipeAsync } = require('smalldash');

const reuseFileNode = ({ e, fileNodeID, ...ctx }) =>
  new Promise((res, rej) => {
    // extract functions
    const { cache, touchNode } = ctx;

    const mediaDataCacheKey = `wordpress-media-${e.wordpress_id}`;

    cache.get(mediaDataCacheKey).then((cacheMediaData) => {
      // If we have cached media data and it wasn't modified, reuse
      // previously created file node to not try to redownload
      if (cacheMediaData && e.modified === cacheMediaData.modified) {
        fileNodeID = cacheMediaData.fileNodeID;
        touchNode({ nodeId: cacheMediaData.fileNodeID });
      }
      res({ e, fileNodeID, mediaDataCacheKey, ...ctx });
    });
  });

const throttle = 10;

const downloadFile = ({ e, fileNodeID, mediaDataCacheKey, ...ctx }) =>
  new Promise((res, rej) => {
    // extract functions
    const { store, cache, createNode, createNodeId, _auth } = ctx;

    // If we don't have cached data, download the file
    if (!fileNodeID) {
      createRemoteFileNode({
        url: e.source_url,
        store,
        cache,
        createNode,
        createNodeId,
        auth: _auth,
      }).then((fileNode) => {
        if (fileNode) {
          fileNodeID = fileNode.id;

          cache
            .set(mediaDataCacheKey, {
              fileNodeID,
              modified: e.modified,
            })
            .then(() => {
              res({ e, fileNodeID, mediaDataCacheKey, ...ctx });
            });
        } else {
          res(downloadFile({ e, fileNodeID, mediaDataCacheKey, ...ctx }));
        }
      });
    } else {
      res({ e, fileNodeID, mediaDataCacheKey, ...ctx });
    }
  });

const removeSizes = ({ e, fileNodeID, ...ctx }) =>
  new Promise((res, rej) => {
    if (fileNodeID) {
      e.localFile___NODE = fileNodeID;
      delete e.media_details.sizes;
    }

    res(e);
  });

// Downloads media files and removes "sizes" data as useless in Gatsby context.
const downloadMediaFiles = (ctx) =>
  Promise.all(
    ctx.entities.map(
      (e) =>
        new Promise((res, rej) => {
          if (e.__type === `wordpress__wp_media`) {
            return pipeAsync(reuseFileNode, downloadFile, removeSizes)({
              e,
              ...ctx,
            }).then((e) => res(e));
          } else {
            res(e);
          }
        })
    )
  );

module.exports = downloadMediaFiles;
