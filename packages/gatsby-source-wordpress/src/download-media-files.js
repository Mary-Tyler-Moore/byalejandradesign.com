const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const Queue = require(`better-queue`)

const pipeAsync = (fn, ...fns) =>
  async function(...args) {
    return !fns.length
      ? await fn(...args)
      : pipeAsync(...fns)(await fn(...args))
  }

/**
 * creates a local promise rejection on the condition that
 * createRemoteFileNode returns null
 */
const rejectFromCreateRemoteNode = (...args) =>
  new Promise((res, rej) => {
    createRemoteFileNode(...args)
      .then(response => {
        if (response) {
          res(response)
        } else {
          rej()
        }
      })
      .catch(err => {
        rej(err)
      })
  })

/**
 * Checks to ensure a file node is not already created
 */
const reuseFileNode = ({ e, ...ctx }) =>
  new Promise((res, rej) => {
    // extract gatsby functions
    const { cache, touchNode, getNode } = ctx

    const mediaDataCacheKey = `wordpress-media-${e.wordpress_id}`

    cache.get(mediaDataCacheKey).then(cacheMediaData => {
      // If we have cached media data and it wasn't modified, reuse
      // previously created file node to not try to redownload
      if (cacheMediaData && e.modified === cacheMediaData.modified) {
        const fileNode = getNode(cacheMediaData.fileNodeID)

        if (fileNode) {
          const fileNodeID = cacheMediaData.fileNodeID
          touchNode({ nodeId: fileNodeID })
          // fileNodeID is our flag in order to download a file
          // add it to the ctx of the entity
          res({ e, fileNodeID, mediaDataCacheKey, ...ctx })
        }
      } else {
        res({ e, mediaDataCacheKey, ...ctx })
      }
    })
  })

/**
 * Requests a remote file node if fileNodeID is not present
 */
const downloadFile = ({ e, fileNodeID, mediaDataCacheKey, ...ctx }) =>
  new Promise((res, rej) => {
    // extract functions
    const { store, cache, createNode, createNodeId, _auth } = ctx

    // if we don't have cached data, download the file
    // use our download runner to throttle connections and
    // retry on failed download
    if (!fileNodeID) {
      rejectFromCreateRemoteNode({
        url: e.source_url,
        store,
        cache,
        createNode,
        createNodeId,
        auth: _auth,
      })
        .then(fileNode => {
          fileNodeID = fileNode.id

          cache
            .set(mediaDataCacheKey, {
              fileNodeID,
              modified: e.modified,
            })
            .then(() => {
              res({ e, fileNodeID, mediaDataCacheKey, ...ctx })
            })
        })
        .catch(error => rej(error))
    } else {
      // resolve here as this means we already have a cached file
      res({ e, fileNodeID, mediaDataCacheKey, ...ctx })
    }
  })

/**
 * Remove size information from the media node
 * It is useless in Gatsby context
 */
const removeSizes = ({ e, fileNodeID, ...ctx }) =>
  new Promise((res, rej) => {
    if (fileNodeID) {
      e.localFile___NODE = fileNodeID
      delete e.media_details.sizes
    }

    res(e)
  })

/**
 * Entry point
 * Resolve and download all files before continue
 */
const downloadMediaFiles = (ctx, options) =>
  new Promise((res, rej) => {
    const orderedList = ctx.entities.map(({ id }) => id)
    const results = new Map()

    const q = new Queue(
      (entity, cb) => {
        if (entity.__type === `wordpress__wp_media`) {
          pipeAsync(reuseFileNode, downloadFile, removeSizes)({
            e: entity,
            ...ctx,
          })
            .then(resolved => cb(null, resolved))
            .catch(error => cb(error))
        } else {
          cb(null, entity)
        }
      },
      {
        concurrent: options.concurrentRequests,
        maxRetries: options.maxRetries,
        retryDelay: options.retryDelay,
      }
    )

    q.on(`task_finish`, (id, entity) => {
      results.set(id, entity)
    })

    q.on(`drain`, () => {
      if (results.size === orderedList.length) {
        res(orderedList.map(id => results.get(id)))
      }
    })

    ctx.entities.forEach(entity => q.push(entity))
  })

module.exports = downloadMediaFiles
