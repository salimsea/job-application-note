import React from "react";
import { LayoutClient } from "src/components/molecules";

const Dashboard = () => {
  return (
    <LayoutClient
      page="Dashboard"
      breadcrumb={[{ name: "Home", navigate: "" }]}
    >
      <div className="alert alert-warning">
        <b>JAPNOT</b> <u>(mini project)</u>
        <br />
        <p>
          Job Application Note is an innovative platform that helps job seekers
          easily record, manage, and track their job applications. With an
          intuitive interface and rich features, users can save application
          details, add notes, set reminders, and monitor the status of each
          application. Streamline your job search process with Job Application
          Note, the all-in-one solution for organizing your future career.
        </p>
      </div>
    </LayoutClient>
  );
};

export default Dashboard;
