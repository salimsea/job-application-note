import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionForm from "./parts/SectionForm";

const CompanyEdit = () => {
  return (
    <LayoutClient
      page="Update Company"
      breadcrumb={[
        { name: "Data Companies", navigate: "/companies" },
        { name: "Page", navigate: "" },
      ]}
    >
      <SectionForm />
    </LayoutClient>
  );
};

export default CompanyEdit;
