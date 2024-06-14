import React from "react";
import { OverlayTrigger, Tooltip as TTP } from "react-bootstrap";

export const Tooltip = ({ id, children, desc, position = "top" }) => {
  return (
    <OverlayTrigger placement={position} overlay={<TTP id={id}>{desc}</TTP>}>
      {children}
    </OverlayTrigger>
  );
};
