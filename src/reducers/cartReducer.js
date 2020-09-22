const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payLoad];

    case "REMOVE_FROM_CART":
      return state.filter((p) => p.id != action.payLoad.id);

    case "GET_CART_ITEMS":
      return state;

    default:
      return state;
  }
};

export default cartReducer;
