import { Login } from "src/screens/guest";

const guest = [
  {
    path: "/",
    exact: true,
    component: Login,
  },
  {
    path: "login",
    exact: true,
    component: Login,
  },
];

export default guest;
