export const addToCart = (data = {}) => {
  return {
    type: "ADD_TO_CART",
    payLoad: data,
  };
};

export const removeFromCart = (data = {}) => {
  return {
    type: "REMOVE_FROM_CART",
    payLoad: data,
  };
};

export const getCartItems = () => {
  return {
    type: "GET_CART_ITEMS",
  };
};

export const storeUserInfo = (data = {}) => {
  return {
    type: "STORE_USER",
    payLoad: data,
  };
};
