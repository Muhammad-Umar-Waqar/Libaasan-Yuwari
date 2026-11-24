import { createSlice } from '@reduxjs/toolkit';

const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_FEE = 250;

const initialState = {
  items: [],
  discount: 0,
  code: '',
  codeMessage: '',
  isDrawerOpen: false,
};

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((x) => x.key === item.key);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      state.isDrawerOpen = true;
    },
    updateQty: (state, action) => {
      const { key, delta } = action.payload;
      const item = state.items.find((x) => x.key === key);
      if (item) {
        item.qty += delta;
        if (item.qty < 1) {
          state.items = state.items.filter((x) => x.key !== key);
        }
      }
    },
    removeItem: (state, action) => {
      const key = action.payload;
      state.items = state.items.filter((x) => x.key !== key);
    },
    clearBag: (state) => {
      state.items = [];
      state.discount = 0;
      state.code = '';
      state.codeMessage = '';
    },
    setBagDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    applyDiscountCode: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      state.code = code;
      if (code === 'SALAM10') {
        state.discount = 0.1;
        state.codeMessage = 'SALAM10 applied: 10% off your first order.';
      } else if (!code) {
        state.discount = 0;
        state.codeMessage = 'Type a discount code first.';
      } else {
        state.discount = 0;
        state.codeMessage = "That code isn't valid. Check the spelling and try again.";
      }
    },
  },
});

export const {
  addItem,
  updateQty,
  removeItem,
  clearBag,
  setBagDrawerOpen,
  applyDiscountCode,
} = bagSlice.actions;

// Selectors
export const selectBagItems = (state) => state.bag.items;
export const selectBagCount = (state) =>
  state.bag.items.reduce((total, item) => total + item.qty, 0);
export const selectBagSubtotal = (state) =>
  state.bag.items.reduce((total, item) => total + item.price * item.qty, 0);
export const selectBagDiscountAmount = (state) => {
  const subtotal = selectBagSubtotal(state);
  return Math.round(subtotal * state.bag.discount);
};
export const selectBagShipping = (state) => {
  const subtotal = selectBagSubtotal(state);
  const discount = selectBagDiscountAmount(state);
  if (!subtotal) return 0;
  return subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
};
export const selectBagTotal = (state) => {
  const subtotal = selectBagSubtotal(state);
  const discount = selectBagDiscountAmount(state);
  const shipping = selectBagShipping(state);
  return subtotal - discount + shipping;
};
export const selectFreeShippingRemaining = (state) => {
  const subtotal = selectBagSubtotal(state);
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
};
export const selectIsBagDrawerOpen = (state) => state.bag.isDrawerOpen;
export const selectBagDiscount = (state) => state.bag.discount;
export const selectBagCode = (state) => state.bag.code;
export const selectBagCodeMessage = (state) => state.bag.codeMessage;

export default bagSlice.reducer;
