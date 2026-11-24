import { createSlice } from '@reduxjs/toolkit';

const getInitialAge = () => {
  try {
    const saved = +localStorage.getItem('ly-age');
    if (saved >= 3 && saved <= 15) return saved;
  } catch (e) {
    // fallback
  }
  return 7;
};

const getInitialLang = () => {
  try {
    return localStorage.getItem('ly-sc-lang') || 'en';
  } catch (e) {
    return 'en';
  }
};

const getInitialSeen = () => {
  try {
    return !!sessionStorage.getItem('ly-opened');
  } catch (e) {
    return false;
  }
};

const initialState = {
  targetAge: getInitialAge(),
  chosenGarments: {
    k: 'k1',
    o: 'o2',
  },
  categoryFilter: 'all',
  sizeChartOpen: false,
  sizeChartLang: getInitialLang(),
  toastMessage: null,
  hasSeenOpening: getInitialSeen(),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTargetAge: (state, action) => {
      const age = Math.max(3, Math.min(15, Math.round(action.payload)));
      state.targetAge = age;
      try {
        localStorage.setItem('ly-age', age);
      } catch (e) {}
    },
    setChosenGarment: (state, action) => {
      const { line, id } = action.payload;
      state.chosenGarments[line] = id;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSizeChartOpen: (state, action) => {
      state.sizeChartOpen = action.payload;
    },
    setSizeChartLang: (state, action) => {
      const lang = action.payload;
      state.sizeChartLang = lang;
      try {
        localStorage.setItem('ly-sc-lang', lang);
      } catch (e) {}
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
    setSeenOpening: (state) => {
      state.hasSeenOpening = true;
      try {
        sessionStorage.setItem('ly-opened', '1');
      } catch (e) {}
    },
  },
});

export const {
  setTargetAge,
  setChosenGarment,
  setCategoryFilter,
  setSizeChartOpen,
  setSizeChartLang,
  showToast,
  hideToast,
  setSeenOpening,
} = appSlice.actions;

export const selectTargetAge = (state) => state.app.targetAge;
export const selectChosenGarments = (state) => state.app.chosenGarments;
export const selectCategoryFilter = (state) => state.app.categoryFilter;
export const selectSizeChartOpen = (state) => state.app.sizeChartOpen;
export const selectSizeChartLang = (state) => state.app.sizeChartLang;
export const selectToastMessage = (state) => state.app.toastMessage;
export const selectHasSeenOpening = (state) => state.app.hasSeenOpening;

export default appSlice.reducer;
