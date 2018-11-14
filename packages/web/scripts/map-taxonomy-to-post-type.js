/**
 * Global function for mapping taxonomy entities to postType
 * @param  {[type]} taxonomy [description]
 * @return {[type]}          [description]
 */
const mapTaxonomyToPostType = (taxonomy) => (postType) => (entities) => {
  const taxonomies = entities.filter(
    (e) => e.__type === `wordpress__wp_${taxonomy}`
  );

  return entities.map((e) => {
    if (e.__type === `wordpress__wp_${postType}`) {
      const hasTaxonomy =
        e[taxonomy] && Array.isArray(e[taxonomy]) && e[taxonomy].length;

      if (hasTaxonomy) {
        const key = `${taxonomy}___NODE`;
        e[key] = e[taxonomy].map(
          (tax) => taxonomies.find((gObj) => tax === gObj.wordpress_id).id
        );

        delete e[taxonomy];
      }
    }

    return e;
  });

  return entities;
};

module.exports = mapTaxonomyToPostType;
