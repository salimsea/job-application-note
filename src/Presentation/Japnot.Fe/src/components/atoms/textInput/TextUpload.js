import React from "react";

export const TextUpload = ({
  label,
  fileSelect,
  isError,
  onDel,
  fileOld,
  ...props
}) => {
  let placeholder = props?.placeholder ?? `Ketikkan ${label}...`;
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <div className="custom-file">
          <input
            className="custom-file-input cursor-pointer"
            type="file"
            placeholder={placeholder}
            {...props}
          />
          <label className="custom-file-label">
            {" "}
            {fileSelect ?? "Choose file"}
          </label>
        </div>
        {fileSelect ? (
          <div className="input-group-append">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={onDel}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ) : null}
      </div>
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
      {fileOld && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="text-primary">
            <a href={fileOld} target="_blank" rel="noreferrer">
              Preview File.
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};
