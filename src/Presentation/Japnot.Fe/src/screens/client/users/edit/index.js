import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionForm from "./parts/SectionForm";

const UserEdit = () => {
  return (
    <LayoutClient
      page="Updated User"
      breadcrumb={[
        { name: "Data Users", navigate: "/users" },
        { name: "Page", navigate: "" },
      ]}
    >
      <SectionForm />
    </LayoutClient>
  );
};

export default UserEdit;
