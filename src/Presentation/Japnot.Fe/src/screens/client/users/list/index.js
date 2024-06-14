import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionTable from "./parts/SectionTable";
import { useHistory } from "react-router-dom";

const UserList = () => {
  const history = useHistory();
  return (
    <LayoutClient
      page="Data Users"
      breadcrumb={[{ name: "Data Users", navigate: "" }]}
    >
      <button
        onClick={() => history.push("/users/add")}
        className="btn btn-success mb-3"
      >
        <i className="fa fa-plus mr-1" /> Add User
      </button>
      <SectionTable />
    </LayoutClient>
  );
};

export default UserList;
