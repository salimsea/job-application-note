import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionForm from "./parts/SectionForm";

const EditProfile = () => {
  return (
    <LayoutClient
      page="Edit Profile"
      breadcrumb={[{ name: "Edit Profile", navigate: "" }]}
    >
      <SectionForm />
    </LayoutClient>
  );
};

export default EditProfile;
