export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_WISHLIST":
      return {
        ...state,
        wishlist:[action.payload,...state.wishlist]
      }
    default:
      return state;
  }
}
