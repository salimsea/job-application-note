import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "src/components/molecules";
import {
  actUserDelete,
  actUserGetAll,
  actUserGetById,
} from "src/redux/actions";
import { useHistory } from "react-router-dom";
import { FUNCSetFullName } from "src/utils";

const SectionTable = () => {
  const history = useHistory();
  const dataUsers = useSelector((state) => state.userReducer.dataUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actUserGetAll());
  }, [dispatch]);

  const btnEdit = (id) => dispatch(actUserGetById(id, history));
  const btnDel = (id) => dispatch(actUserDelete(id));

  const jsonColumn = [
    {
      name: "Id",
      header: "Aksi",
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
      name: "Username",
      header: "Username",
    },
    {
      name: "FirstName",
      header: "Full Name",
      selector: ({ row }) =>
        FUNCSetFullName(
          row.original.FirstName,
          row.original.MiddleName,
          row.original.LastName
        ),
    },
    {
      name: "Email",
      header: "Email",
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
            <DataTable data={dataUsers} column={jsonColumn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTable;
