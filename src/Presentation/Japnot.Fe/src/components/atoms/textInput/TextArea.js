import React from "react";

export const TextArea = ({ label, hook, isError, ...props }) => {
  let placeholder = props?.placeholder ?? `Ketikkan ${label}...`;
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        className="form-control textarea-custom"
        placeholder={placeholder}
        {...hook}
        {...props}
      ></textarea>
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
    </div>
  );
};
