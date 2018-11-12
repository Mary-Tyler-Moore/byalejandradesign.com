const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

/** Utils */

/**
 * Make sure to use async as function and not arrow function to prevent babel/rollup issues
 * https://github.com/rollup/rollup/issues/1518
 */
const pipeAsync = (fn, ...fns) =>
  async function(...args) {
    return !fns.length
      ? await fn(...args)
      : pipeAsync(...fns)(await fn(...args));
  };

/**
 * Ensures a promise resolution from the passed in function
 * Retries after a timeout
 */
const downloadRunner = (fn) => (ctx, tries = 0) => {
  const throttle = 2000;
  const maxRetries = 10;

  return new Promise((res, rej) => {
    fn(ctx)
      .then((ctx) => res(ctx))
      .catch(() => {
        if (tries < maxRetries) {
          // if server timeout or the node doesn't resolve
          // set a throttle and try again
          setTimeout(() => res(downloadRunner(fn)(ctx, tries + 1)), throttle);
        } else {
          rej();
        }
      });
  });
};

/** Original downloadMediaFiles logic broken into parts */

/**
 * Checks to ensure a file node is not already created
 */
const reuseFileNode = ({ e, ...ctx }) =>
  new Promise((res, rej) => {
    // extract gatsby functions
    const { cache, touchNode } = ctx;

    const mediaDataCacheKey = `wordpress-media-${e.wordpress_id}`;

    cache.get(mediaDataCacheKey).then((cacheMediaData) => {
      // If we have cached media data and it wasn't modified, reuse
      // previously created file node to not try to redownload
      if (cacheMediaData && e.modified === cacheMediaData.modified) {
        const fileNodeID = cacheMediaData.fileNodeID;
        touchNode({ nodeId: cacheMediaData.fileNodeID });
        // fileNodeID is our flag in order to download a file
        // add it to the ctx of the entity
        res({ e, fileNodeID, mediaDataCacheKey, ...ctx });
      } else {
        res({ e, mediaDataCacheKey, ...ctx });
      }
    });
  });

/**
 * Requests a remote file node if fileNodeID is not present
 */
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
          // reject the promise here as the download has failed
          rej();
        }
      });
    } else {
      // resolve here as this means we already have a cached file
      res({ e, fileNodeID, mediaDataCacheKey, ...ctx });
    }
  });

/**
 * Remove size information from the media node
 * It is useless in Gatsby context
 */
const removeSizes = ({ e, fileNodeID, ...ctx }) =>
  new Promise((res, rej) => {
    if (fileNodeID) {
      e.localFile___NODE = fileNodeID;
      delete e.media_details.sizes;
    }

    res(e);
  });

/**
 * Entry point
 * Resolve and download all files before continue
 */
const downloadMediaFiles = (ctx) =>
  Promise.all(
    ctx.entities.map(
      (e) =>
        new Promise((res, rej) => {
          if (e.__type === `wordpress__wp_media`) {
            return pipeAsync(
              reuseFileNode,
              downloadRunner(downloadFile),
              removeSizes
            )({
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
