import React from "react";
import "echarts-gl";
import { Dropdown } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";

const Dashbord = () => {
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="Blank Page"
            Breadcrumb={[
              { name: "Page", navigate: "" },
              { name: "Blank Page", navigate: "" },
            ]}
          />
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="card planned_task">
                <div className="header">
                  <h2>Stater Page</h2>
                  <Dropdown as="ul" className="header-dropdown">
                    <Dropdown.Toggle
                      variant="success"
                      as="li"
                      id="dropdown-basic"
                    >
                      <Dropdown.Menu
                        as="ul"
                        className="dropdown-menu dropdown-menu-right"
                      >
                        <li>
                          <a>Action</a>
                        </li>
                        <li>
                          <a>Another Action</a>
                        </li>
                        <li>
                          <a>Something else</a>
                        </li>
                      </Dropdown.Menu>
                    </Dropdown.Toggle>
                  </Dropdown>
                </div>
                <div className="body">
                  <h4>Stater Page</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
