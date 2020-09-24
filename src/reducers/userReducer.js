const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case "STORE_USER":
      return { ...action.payLoad };
    default:
      return state;
  }
};

export default UserReducer;
