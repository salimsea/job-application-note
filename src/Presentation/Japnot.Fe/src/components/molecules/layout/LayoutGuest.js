import React, { useEffect, useState } from "react";
import { Loader } from "src/components/atoms";

export const LayoutGuest = ({ children }) => {
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(!isLoad);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="theme-blue">
        <Loader loading={isLoad} />
        <div className="hide-border">
          <div className="vertical-align-wrap">
            <div className="vertical-align-middle auth-main">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
