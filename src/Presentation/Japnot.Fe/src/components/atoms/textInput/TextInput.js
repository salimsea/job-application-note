import React from "react";

export const TextInput = ({
  label,
  hook,
  isError,
  endWithIcon = false,
  hideLabel = false,
  exampleinfo = null,
  ...props
}) => {
  let placeholder = props?.placeholder ?? `Input ${label}...`;
  return (
    <div className="form-group">
      {!hideLabel && <label>{label}</label>}
      <div className="input-group">
        <input
          className={`form-control ng-untouched ng-pristine ng-invalid`}
          placeholder={placeholder}
          {...hook}
          {...props}
        />
        {endWithIcon && (
          <div className="input-group-append">
            <span className="input-group-text">{endWithIcon}</span>
          </div>
        )}
      </div>
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
      {exampleinfo && <small>{exampleinfo}</small>}
    </div>
  );
};
