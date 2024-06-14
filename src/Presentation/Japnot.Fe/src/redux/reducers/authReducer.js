const initialState = {
  formLogin: {
    usernameOrEmail: "admin",
    password: "admin",
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_LOGIN":
      return {
        ...state,
        formLogin: {
          ...state.formLogin,
          [action.formType]: action.formValue,
        },
      };
    case "RESET_FORM_LOGIN":
      return { ...state, formLogin: initialState.formLogin };
    default:
      return state;
  }
};

export default authReducer;
