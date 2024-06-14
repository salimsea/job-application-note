import {
  CompanyAdd,
  CompanyEdit,
  CompanyList,
  Dashboard,
  EditProfile,
  UserAdd,
  UserEdit,
  UserList,
} from "src/screens/client";

const routes_client = [
  {
    path: "dashboard",
    exact: true,
    Component: Dashboard,
  },
  {
    path: "editprofile",
    exact: true,
    Component: EditProfile,
  },
  {
    path: "users",
    exact: true,
    Component: UserList,
  },
  {
    path: "users/add",
    exact: true,
    Component: UserAdd,
  },
  {
    path: "users/edit/:id",
    exact: true,
    Component: UserEdit,
  },
  {
    path: "companies",
    exact: true,
    Component: CompanyList,
  },
  {
    path: "company/add",
    exact: true,
    Component: CompanyAdd,
  },
  {
    path: "company/edit/:id",
    exact: true,
    Component: CompanyEdit,
  },
];

export default routes_client;
