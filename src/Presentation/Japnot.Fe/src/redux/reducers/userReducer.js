const initialState = {
  formUser: {
    id: "",
    username: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    roles: [],
  },
  dataUsers: [],
  dataRoles: [],
  dataUser: null,
  dataUserSession: null,
  dataInfoUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_USER":
      return {
        ...state,
        formUser: {
          ...state.formUser,
          [action.formType]: action.formValue,
        },
      };
    case "RESET_FORM_USER":
      return { ...state, formUser: initialState.formUser };
    case "DATA_USERS":
      return { ...state, dataUsers: action.payload };
    case "DATA_USER":
      return { ...state, dataUser: action.payload };
    case "DATA_ROLES":
      return { ...state, dataRoles: action.payload };
    case "DATA_USER_SESSION":
      return { ...state, dataUserSession: action.payload };
    case "DATA_INFO_USER":
      return { ...state, dataInfoUser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
