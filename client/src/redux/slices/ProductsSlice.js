import { createSlice } from "@reduxjs/toolkit";

const productState = {
  product: [],
  cart: [],
  errors: [],
  cartTotal: "",
  category: [],
  orderId: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    setProducts: (state, action) => {
      state.product = [...action.payload];
    },
    setFilterProduct: (state, action) => {
      state.product = getProduct(state.product,action.payload);
    },
    setCategory: (state, action) => {
      state.category = [...action.payload];
    },
    setCartProduct: (state, action) => {
      state.cart = addItemToCart(state.cart, action.payload);
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    setRemoveCartItem: (state, action) => {
      state.cart = RemoveCart(state.cart, action.payload);
    },
    setDecreaseCountCart: (state, action) => {
      state.cart = RemoveExistingItemFromCart(state.cart, action.payload);
    },
    setOrderID: (state, action) => {
      state.orderId = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setResetCart: (state) => {
      state.cart = state = [];
    },
  },
});

// const AddExistingItemToCart = ((cartItems, itemToAdd) => {
//     return cartItems.map(item =>
//         item.id === itemToAdd.id ? { ...item, count: item.count + 1 } : item
//     )
// });

const addItemToCart = (cart, itemToAdd) => {
  const existingItem = cart.find((item) => item._id === itemToAdd._id);
  if (existingItem) {
    return cart.map((item) =>
      item._id === itemToAdd._id ? { ...item, count: item.count + 1 } : item
    );
  } else {
    return [...cart, { ...itemToAdd, count: 1 }];
  }
};

const RemoveCart = (cart, itemToRemove) => {
  const existingItem = cart.find((item) => item._id === itemToRemove._id);
  let newItem = [];
  newItem = cart.filter((item) => item._id !== existingItem._id);
  return newItem;
};

const RemoveExistingItemFromCart = (cart, itemDecr) => {
  const existingItem = cart.find((item) => item._id === itemDecr._id);
  if (existingItem) {
    return cart.map((item) =>
      item._id === itemDecr._id ? { ...item, count: item.count - 1 } : item
    );
  } else {
    return [...cart, { ...itemDecr, count: 1 }];
  }
};
const getProduct = (product, itemToAdd) => {
  const newItem = product.filter(
    (item) => item.subcategory_id === itemToAdd._id
  );
  if (newItem) {
    return newItem.map((item) =>
      item.subcategory_id === itemToAdd._id ? { ...item } : item
    );
  } else {
    return [...product, { ...product }];
  }
};
export const {
  setProducts,
  setErrors,
  setRemoveCartItem,
  setDecreaseCountCart,
  setCartProduct,
  setResetCart,
  setCartTotal,
  setCategory,
  setOrderID,
  setFilterProduct,
} = productSlice.actions;

export default productSlice.reducer;
