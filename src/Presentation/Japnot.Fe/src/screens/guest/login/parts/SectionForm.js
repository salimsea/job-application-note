import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actLogin, actFormLogin } from "src/redux/actions";

const SectionForm = () => {
  const formLogin = useSelector((state) => state.authReducer.formLogin);
  const dispatch = useDispatch();

  return (
    <div className="auth-box">
      <div className="card">
        <div className="header">
          <h3 className="text-center font-bold">JAPNOT</h3>
          <p className="lead text-center">Job Application Note</p>
        </div>
        <div className="body">
          <div className="form-auth-small">
            <div className="form-group">
              <label className="control-label sr-only">Email</label>
              <input
                className="form-control"
                id="signin-email"
                placeholder="Email / Username"
                type="email"
                value={formLogin?.usernameOrEmail}
                onChange={(val) => {
                  dispatch(actFormLogin("usernameOrEmail", val.target.value));
                }}
              />
            </div>
            <div className="form-group">
              <label className="control-label sr-only">Password</label>
              <input
                className="form-control"
                id="signin-password"
                placeholder="Password"
                type="password"
                value={formLogin?.password}
                onChange={(val) => {
                  dispatch(actFormLogin("password", val.target.value));
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={() => dispatch(actLogin(formLogin))}
            >
              Login
            </button>
            <div className="bottom"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionForm;
