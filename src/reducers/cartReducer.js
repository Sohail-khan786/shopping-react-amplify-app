const cartReducer = (
  state = { productMap: {}, uniqueProductsInCart: [], cartValue: 0 },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (
        state.productMap[action.payLoad.id] == undefined ||
        state.productMap[action.payLoad.id] == 0
      ) {
        state.productMap[action.payLoad.id] = 1;
        action.payLoad.quantity = 1;
        state.uniqueProductsInCart.push(action.payLoad);
      } else {
        state.productMap[action.payLoad.id] =
          state.productMap[action.payLoad.id] + 1;

        state.uniqueProductsInCart.forEach((currentItem) => {
          if (currentItem.id == action.payLoad.id)
            currentItem.quantity = state.productMap[action.payLoad.id];
        });
      }

      state.cartValue = state.cartValue + parseInt(action.payLoad.price);

      return state;
    //   return [...state, action.payLoad];

    case "REMOVE_FROM_CART":
      state.cartValue = state.cartValue - action.payLoad.price;
      if (state.productMap[action.payLoad.id] > 1) {
        state.productMap[action.payLoad.id] =
          state.productMap[action.payLoad.id] - 1;

        state.uniqueProductsInCart.forEach((currentItem) => {
          if (currentItem.id == action.payLoad.id)
            currentItem.quantity = state.productMap[action.payLoad.id];
        });

        return state;
      }

      state.productMap[action.payLoad.id] = 0;
      state.uniqueProductsInCart = state.uniqueProductsInCart.filter(
        (p) => p.id != action.payLoad.id
      );

      return state;

    case "GET_CART_ITEMS":
      return state;

    default:
      return state;
  }
};

export default cartReducer;
