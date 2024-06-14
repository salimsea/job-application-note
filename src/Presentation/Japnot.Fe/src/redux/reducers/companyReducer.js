const initialState = {
  formCompany: {},
  dataCompanies: [],
  dataCompany: null,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_COMPANY":
      return {
        ...state,
        formCompany: {
          ...state.formCompany,
          [action.formType]: action.formValue,
        },
      };
    case "RESET_FORM_COMPANY":
      return { ...state, formCompany: initialState.formCompany };
    case "DATA_COMPANIES":
      return { ...state, dataCompanies: action.payload };
    case "DATA_COMPANY":
      return { ...state, dataCompany: action.payload };
    default:
      return state;
  }
};

export default companyReducer;
