import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionForm from "./parts/SectionForm";

const UserAdd = () => {
  return (
    <LayoutClient
      page="Add User"
      breadcrumb={[
        { name: "Data Users", navigate: "/users" },
        { name: "Add User", navigate: "" },
      ]}
    >
      <SectionForm />
    </LayoutClient>
  );
};

export default UserAdd;
