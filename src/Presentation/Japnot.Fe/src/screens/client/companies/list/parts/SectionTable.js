import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "src/components/molecules";
import {
  actCompanyDelete,
  actCompanyGetAll,
  actCompanyGetById,
} from "src/redux/actions";
import { useHistory } from "react-router-dom";

const SectionTable = () => {
  const history = useHistory();
  const dataCompanies = useSelector(
    (state) => state.companyReducer.dataCompanies
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actCompanyGetAll());
  }, [dispatch]);

  const btnEdit = (id) => dispatch(actCompanyGetById(id, history));
  const btnDel = (id) => dispatch(actCompanyDelete(id));

  const jsonColumn = [
    {
      name: "Id",
      header: "#",
      selector: (row) => (
        <>
          <button
            onClick={() => btnEdit(row.getValue())}
            className="btn btn-sm btn-info mr-1"
          >
            <i className="fa fa-pencil mr-1" /> Update
          </button>
          <button
            onClick={() => btnDel(row.getValue())}
            className="btn btn-sm btn-danger mr-1"
          >
            <i className="fa fa-trash mr-1" />
            Delete
          </button>
        </>
      ),
    },
    {
      name: "Name",
      header: "Name",
    },
    {
      name: "Email",
      header: "Email",
    },
    {
      name: "Position",
      header: "Position",
    },
    {
      name: "TypeWorkDay",
      header: "Work Day",
      selector: ({ row }) => {
        return <span>{row.original.TypeWorkDay.Name}</span>;
      },
    },
    {
      name: "TypeWorkPlace",
      header: "Work Place",
      selector: ({ row }) => {
        return <span>{row.original.TypeWorkPlace.Name}</span>;
      },
    },
    {
      name: "TypeUserCompany",
      header: "User Company",
      selector: ({ row }) => {
        return <span>{row.original.TypeUserCompany.Name}</span>;
      },
    },
    {
      name: "Status",
      header: "Status",
      selector: ({ row }) => {
        return <span>{row.original.Status.Name}</span>;
      },
    },
    {
      name: "Placement",
      header: "Placement",
    },
    {
      name: "AppliedAt",
      header: "AppliedAt",
    },
    {
      name: "SourceJob",
      header: "SourceJob",
    },
  ];

  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12">
        <div className="card planned_task">
          <div className="header">
            <h2>Tabel Data</h2>
          </div>
          <div className="body">
            <DataTable data={dataCompanies} column={jsonColumn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTable;
