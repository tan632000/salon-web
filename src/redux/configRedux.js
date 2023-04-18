import { createReducer, createActions } from "reduxsauce";

const initialState = {
  isOpenSidebar: false,
  stylistData: [],
  salonId: "",
  updateDateMode: false,
  listServices: []
};

export const { Types: ConfigTypes, Creators: ConfigActions } = createActions({
  setIsOpenSidebar: ["isOpenSidebar"],
  setStylistData: ["stylistData"],
  setSalonId: ["salonId"],
  setUpdateDataMode: ["updateDateMode"],
  setListServices: ["listServices"]
});

export const ConfigSelectors = {
  isOpenSidebar: (state) => state.config.isOpenSidebar,
  stylistData: (state) => state.config.stylistData,
  salonId: (state) => state.config.salonId,
  updateDateMode: (state) => state.config.updateDateMode,
  listServices: (state) => state.config.listServices
};

const setIsOpenSidebar = (state = initialState, { isOpenSidebar }) => {
  return {
    ...state,
    isOpenSidebar,
  };
};

const setStylistData = (state = initialState, { stylistData }) => {
  return {
    ...state,
    stylistData,
  };
};

const setSalonId = (state = initialState, { salonId }) => {
  return {
    ...state,
    salonId
  }
};

const setUpdateDataMode = (state = initialState, {updateDateMode}) => {
  return {
    ...state,
    updateDateMode
  }
}

const setListServices = (state = initialState, {listServices}) => {
  return {
    ...state,
    listServices
  }
}

export const HANDLERS = {
  [ConfigTypes.SET_IS_OPEN_SIDEBAR]: setIsOpenSidebar,
  [ConfigTypes.SET_STYLIST_DATA]: setStylistData,
  [ConfigTypes.SET_SALON_ID]: setSalonId,
  [ConfigTypes.SET_UPDATE_DATA_MODE]: setUpdateDataMode,
  [ConfigTypes.SET_LIST_SERVICES]: setListServices,
};

export default createReducer(initialState, HANDLERS);
