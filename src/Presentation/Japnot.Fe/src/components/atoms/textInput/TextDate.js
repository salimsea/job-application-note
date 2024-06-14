import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TextDate = ({
  label,
  hook,
  isError,
  endWithIcon = false,
  ...props
}) => {
  let placeholder = props?.placeholder ?? `Input ${label} (dd-MM-yyyy)...`;
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <ReactDatePicker
          className="form-control w-100"
          placeholderText={placeholder}
          dateFormat="dd-MM-yyyy"
          {...props}
        />
      </div>
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
    </div>
  );
};
