import React from "react";
import { useState } from "react";
import Select from "react-dropdown-select";

export const Combobox = ({
  label,
  options = [],
  values = [],
  isError,
  hideLabel = false,
  ...props
}) => {
  const [isLoad, setIsLoad] = useState(true);
  let placeholder = props?.placeholder ?? `Select ${label}...`;

  options =
    options.length !== 0 ? options : [{ label: "Not Found", value: "" }];
  setTimeout(() => {
    setIsLoad(options?.length === 0);
  }, 1000);
  return (
    <div className="form-group">
      {!hideLabel && <label>{label}</label>}
      <Select
        className="js-states bg-white"
        placeholder={placeholder}
        options={options}
        values={values}
        searchable={true}
        create={props?.create ?? false}
        loading={isLoad}
        {...props}
      />
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
    </div>
  );
};

export const ComboboxRerender = ({
  label,
  options = [],
  values = [],
  isError,
  hideLabel = false,
  ...props
}) => {
  const [isLoad, setIsLoad] = useState(true);
  let placeholder = props?.placeholder ?? `Select ${label}...`;

  options =
    options.length !== 0 ? options : [{ label: "Not Found", value: "" }];
  setTimeout(() => {
    setIsLoad(options?.length === 0);
  }, 1000);

  const Render = () => {
    return (
      <Select
        className="js-states bg-white"
        placeholder={placeholder}
        options={options}
        values={values}
        searchable={true}
        create={props?.create ?? false}
        loading={isLoad}
        {...props}
      />
    );
  };
  return (
    <div className="form-group">
      {!hideLabel && <label>{label}</label>}
      <Render />
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
    </div>
  );
};
