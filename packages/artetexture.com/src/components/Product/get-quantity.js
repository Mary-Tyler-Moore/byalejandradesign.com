const getQuantity = (node, cartProducts) => {
  const found = cartProducts.find((product) => product.id === node.id);

  return found ? node.acf.quantity - found.quantity : node.acf.quantity;
};

export default getQuantity;
