import React from "react";
import { LayoutClient } from "src/components/molecules";
import SectionForm from "./parts/SectionForm";

const CompanyAdd = () => {
  return (
    <LayoutClient
      page="Company Add"
      breadcrumb={[
        { name: "Data Companies", navigate: "/companies" },
        { name: "Company Add", navigate: "" },
      ]}
    >
      <SectionForm />
    </LayoutClient>
  );
};

export default CompanyAdd;
