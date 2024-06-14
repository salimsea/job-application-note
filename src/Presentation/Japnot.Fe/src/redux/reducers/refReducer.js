const initialState = {
  dataRefRoles: [],
  dataRefTypeWorkDays: [],
  dataRefTypeWorkPlaces: [],
  dataRefTypeUserCompanies: [],
  dataRefStatusCompanies: [],
};

const refReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_REF_ROLES":
      return { ...state, dataRefRoles: action.payload };
    case "DATA_REF_TYPE_WORK_DAYS":
      return { ...state, dataRefTypeWorkDays: action.payload };
    case "DATA_REF_TYPE_WORK_PLACES":
      return { ...state, dataRefTypeWorkPlaces: action.payload };
    case "DATA_REF_TYPE_USER_COMPANIES":
      return { ...state, dataRefTypeUserCompanies: action.payload };
    case "DATA_REF_STATUS_COMPANIES":
      return { ...state, dataRefStatusCompanies: action.payload };
    default:
      return state;
  }
};

export default refReducer;
