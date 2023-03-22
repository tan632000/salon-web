import { createReducer, createActions } from "reduxsauce";

const initialState = {
  isOpenSidebar: false,
  attendeeData: {},
};

export const { Types: ConfigTypes, Creators: ConfigActions } = createActions({
  setIsOpenSidebar: ["isOpenSidebar"],
  setAttendeeData: ["attendeeData"],
});

export const ConfigSelectors = {
  isOpenSidebar: (state) => state.config.isOpenSidebar,
  attendeeData: (state) => state.config.attendeeData,
};

const setIsOpenSidebar = (state = initialState, { isOpenSidebar }) => {
  return {
    ...state,
    isOpenSidebar,
  };
};

const setAttendeeData = (state = initialState, { attendeeData }) => {
  return {
    ...state,
    attendeeData,
  };
};

export const HANDLERS = {
  [ConfigTypes.SET_IS_OPEN_SIDEBAR]: setIsOpenSidebar,
  [ConfigTypes.SET_ATTENDEE_DATA]: setAttendeeData,
};

export default createReducer(initialState, HANDLERS);
