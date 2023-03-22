import { createReducer, createActions } from "reduxsauce";

const initialState = {
  forceLogout: false,
  verifiedAccount: false,
  messageLogout: "",
  deviceType: "",
  projectName: "",
};

export const { Types: AuthTypes, Creators: AuthActions } = createActions({
  setForceLogout: ["forceLogout", "messageLogout"],
  setVerifiedAccount: ["verifiedAccount"],
  setDeviceType: ["deviceType"],
  setProjectName: ["projectName"],
});
export const AuthSelectors = {
  forceLogout: (state) => state.auth.forceLogout,
  verifiedAccount: (state) => state.auth.verifiedAccount,
  messageLogout: (state) => state.auth.messageLogout,
  deviceType: (state) => state.auth.deviceType,
  projectName: (state) => state.auth.projectName,
};

const setForceLogout = (
  state = initialState,
  { forceLogout, messageLogout }
) => {
  return {
    ...state,
    forceLogout: forceLogout,
    messageLogout: messageLogout ? messageLogout : "",
  };
};

const setVerifiedAccount = (state = initialState, { verifiedAccount }) => {
  return {
    ...state,
    verifiedAccount: verifiedAccount,
  };
};

const setDeviceType = (state = initialState, { deviceType }) => {
  return {
    ...state,
    deviceType: deviceType,
  };
};
const setProjectName = (state = initialState, { projectName }) => {
  return {
    ...state,
    projectName: projectName,
  };
};

export const HANDLERS = {
  [AuthTypes.SET_FORCE_LOGOUT]: setForceLogout,
  [AuthTypes.SET_VERIFIED_ACCOUNT]: setVerifiedAccount,
  [AuthTypes.SET_DEVICE_TYPE]: setDeviceType,
  [AuthTypes.SET_PROJECT_NAME]: setProjectName,
};

export default createReducer(initialState, HANDLERS);
