import { createSlice } from "@reduxjs/toolkit";

const menuState = {
  subcategory: [],
  menu: [],
};

export const MenuSlice = createSlice({
  name: "menu",
  initialState: menuState,
  reducers: {
    setMenu: (state, action) => {
      state.menu = getSubCategory(state.subcategory, action.payload);
    },
    setSubCategory: (state, action) => {
      state.subcategory = [...action.payload];
    },
  },
});

const getSubCategory = (menu, itemToAdd) => {
  const newItem = menu.filter((item) => item.category_id === itemToAdd._id);
  const subcategory = newItem.map((item) =>
    item.category_id === itemToAdd._id ? { ...item } : item
  );
  return subcategory;
};

export const { setMenu, setSubCategory } = MenuSlice.actions;

export default MenuSlice.reducer;
