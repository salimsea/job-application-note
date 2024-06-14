import { combineReducers } from "redux";
import loginReducer from "./library/loginReducer";
import navigationReducer from "./library/navigationReducer";
import analyticalReducer from "./library/analyticalReducer";
import demographicReducer from "./library/demographicReducer";
import ioTReducer from "./library/ioTReducer";
import mailInboxReducer from "./library/mailInboxReducer";
import UIElementsReducer from "./library/UIElementsReducer";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import companyReducer from "./companyReducer";
import refReducer from "./refReducer";

export default combineReducers({
  loginReducer,
  navigationReducer: navigationReducer,
  analyticalReducer: analyticalReducer,
  demographicReducer: demographicReducer,
  ioTReducer: ioTReducer,
  mailInboxReducer: mailInboxReducer,
  UIElementsReducer: UIElementsReducer,
  authReducer,
  userReducer,
  companyReducer,
  refReducer,
});
