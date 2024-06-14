import React from "react";

export const TextRadio = ({
  label,
  hook,
  isError,
  name,
  options = [],
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div>
        {options.map((item, index) => {
          return (
            <TextItemRadio
              key={index}
              name={name}
              label={item.label}
              value={item.value}
              hook={hook}
              checked={item.value == value}
              onChange={onChange}
              disabled={disabled}
            />
          );
        })}
      </div>
      {isError && (
        <ul className="parsley-errors-list filled" id="parsley-id-29">
          <li className="parsley-required">This value is required.</li>
        </ul>
      )}
    </div>
  );
};

export const TextItemRadio = ({
  name,
  value,
  label,
  hook,
  checked = false,
  onChange,
  disabled,
}) => {
  return (
    <label className="fancy-radio">
      <input
        id={value}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span>
        <i></i>
        {label}
      </span>
    </label>
  );
};
