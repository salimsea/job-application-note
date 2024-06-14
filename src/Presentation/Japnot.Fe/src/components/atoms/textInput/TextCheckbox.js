import React from "react";

export const TextCheckbox = ({ name, onChange, label, checked, value }) => {
  return (
    <div className="fancy-checkbox">
      <label>
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          defaultChecked={checked}
          value={value}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
