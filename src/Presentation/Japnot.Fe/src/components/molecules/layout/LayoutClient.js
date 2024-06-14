import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageHeader from "src/lib-components/PageHeader";
import { actUserSession } from "src/redux/actions";

export const LayoutClient = ({ children, breadcrumb, page }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actUserSession());
  }, [dispatch]);

  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader HeaderText={page} Breadcrumb={breadcrumb} />
          {children}
        </div>
      </div>
    </div>
  );
};
