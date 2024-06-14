import React from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { IMGLogo } from "src/assets/images/dummy";

class NotFound extends React.Component {
  render() {
    return (
      <div className="theme-cyan">
        <div>
          <div className="vertical-align-wrap">
            <div className="vertical-align-middle auth-main">
              <div className="auth-box">
                <div className="card">
                  <div className="header">
                    <h3>
                      <span className="clearfix title">
                        <span className="number left">404</span>
                        <span className="text">
                          Oops! <br />
                          Halaman tidak ditemukan~
                        </span>
                      </span>
                    </h3>
                  </div>
                  <div className="body">
                    <p>
                      Halaman yang Anda cari tidak dapat ditemukan, silakan
                      hubungi kami untuk melaporkan masalah ini.
                    </p>
                    <div className="margin-top-30">
                      <button
                        className="btn btn-default"
                        onClick={() => {
                          this.props.history.push("/");
                        }}
                      >
                        <i className="fa fa-arrow-left"></i>&nbsp;
                        <span>Go Back</span>
                      </button>
                      &nbsp;
                      <a className="btn btn-primary" href="dashboard">
                        <i className="fa fa-home"></i>&nbsp;<span>Home</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {};

const mapStateToProps = ({ loginReducer }) => ({});

export default connect(mapStateToProps, {})(NotFound);
