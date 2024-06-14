import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
  actUserInfo,
} from "../../../redux/actions";
import { IMGUserEmpty } from "src/assets/images/dummy";

class Navbar extends React.Component {
  state = {
    linkupdate: false,
  };
  componentDidMount() {
    this.props.actUserInfo();
    this.props.tostMessageLoad(true);
  }

  activeMenutabContainer(id) {
    var parents = document.getElementById("main-menu");
    var activeMenu = document.getElementById(id);

    for (let index = 0; index < parents.children.length; index++) {
      if (parents.children[index].id !== id) {
        parents.children[index].classList.remove("active");
        parents.children[index].children[1].classList.remove("in");
      }
    }
    setTimeout(() => {
      activeMenu.classList.toggle("active");
      activeMenu.children[1].classList.toggle("in");
    }, 10);
  }

  btnLogout() {
    localStorage.removeItem("TOKEN");
    window.location = "/";
  }
  render() {
    const { themeColor, sideMenuTab, activeKey, dataMenus, dataInfoUser } =
      this.props;
    var imgFile = dataInfoUser?.Files?.filter((x) => x.Type === 1)[0];
    document.body.classList.add(themeColor);
    return (
      <div>
        <nav
          className="navbar navbar-fixed-top bg-primary"
          style={{ marginTop: "-5px" }}
        >
          <div className="container-fluid">
            <div className="navbar-btn">
              <button
                className="btn-toggle-offcanvas"
                onClick={() => {
                  this.props.onPressSideMenuToggle();
                }}
              >
                <i className="lnr lnr-menu fa fa-bars"></i>
              </button>
            </div>

            <div className="navbar-brand">
              <a href="dashboard" className="d-flex align-items-center">
                <h4 className="ml-3 text-white mb-0">
                  <b>JAPNOT</b>
                </h4>
              </a>
            </div>

            <div className="navbar-right">
              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  <li>
                    <div
                      onClick={() => this.btnLogout()}
                      className="icon-menu text-white justify-content-center d-flex align-items-center"
                    >
                      <i className="icon-login text-white mr-2"></i> Logout
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
          <div className="sidebar-scroll">
            <div className="user-account">
              <img
                src={`${imgFile?.UrlPath}/${imgFile?.Name}`}
                className="rounded-circle user-photo"
                alt="User Profile"
                style={{ objectFit: "cover", width: 50, height: 50 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = IMGUserEmpty;
                }}
              />
              <Dropdown>
                <span>Welcome!</span>
                <div>
                  <strong>
                    Hi, {dataInfoUser?.FirstName?.toLowerCase() || "Loading"} 👋
                  </strong>
                </div>
              </Dropdown>

              <hr />
            </div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={sideMenuTab[0] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(0);
                  }}
                >
                  Menu
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={sideMenuTab[2] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(2);
                  }}
                >
                  <i className="icon-settings"></i>
                </a>
              </li>
            </ul>
            <div className="tab-content p-l-0 p-r-0">
              <div
                className={sideMenuTab[0] ? "tab-pane active show" : "tab-pane"}
                id="menu"
              >
                <Nav id="left-sidebar-nav" className="sidebar-nav">
                  <ul id="main-menu" className="metismenu">
                    <li id={`company`}>
                      <Link
                        to={"/dashboard"}
                        onClick={() => {
                          this.activeMenutabContainer(`company`);
                        }}
                      >
                        <i className={"icon-home"}></i>{" "}
                        <span>{`Dashboard`}</span>
                      </Link>
                      <ul className="collapse" />
                    </li>
                    <li id={`companies`}>
                      <Link
                        to={"/companies"}
                        onClick={() => {
                          this.activeMenutabContainer(`companies`);
                        }}
                      >
                        <i className={"icon-layers"}></i>{" "}
                        <span>{`Job Apply Note`}</span>
                      </Link>
                      <ul className="collapse" />
                    </li>
                    <li id={`user`}>
                      <Link
                        to={"/users"}
                        onClick={() => {
                          this.activeMenutabContainer(`user`);
                        }}
                      >
                        <i className={"icon-user"}></i>{" "}
                        <span>{`Manage Users`}</span>
                      </Link>
                      <ul className="collapse" />
                    </li>
                    <li id={`editprofile`}>
                      <Link
                        to={"/editprofile"}
                        onClick={() => {
                          this.activeMenutabContainer(`editprofile`);
                        }}
                      >
                        <i className={"icon-settings"}></i>{" "}
                        <span>{`Edit Profile`}</span>
                      </Link>
                      <ul className="collapse" />
                    </li>
                  </ul>
                </Nav>
              </div>

              <div
                className={
                  sideMenuTab[2]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="setting"
              >
                <h6>Choose Mode</h6>
                <ul className="choose-skin list-unstyled">
                  <li
                    data-theme="white"
                    className={
                      document.body.classList.contains("full-dark")
                        ? ""
                        : "active"
                    }
                    onClick={() => {
                      this.setState({ somethi: false });
                      document.body.classList.remove("full-dark");
                    }}
                  >
                    <div className="white"></div>
                    <span>Light</span>
                  </li>
                  <li
                    data-theme="black"
                    className={
                      document.body.classList.contains("full-dark")
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      this.setState({ somethi: true });
                      document.body.classList.add("full-dark");
                    }}
                  >
                    <div className="black"></div>
                    <span>Dark</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  addClassactive: PropTypes.array.isRequired,
  addClassactiveChild: PropTypes.array.isRequired,
  addClassactiveChildApp: PropTypes.array.isRequired,
  addClassactiveChildFM: PropTypes.array.isRequired,
  addClassactiveChildBlog: PropTypes.array.isRequired,
  addClassactiveChildUI: PropTypes.array.isRequired,
  addClassactiveChildWidgets: PropTypes.array.isRequired,
  addClassactiveChildAuth: PropTypes.array.isRequired,
  addClassactiveChildPages: PropTypes.array.isRequired,
  addClassactiveChildForms: PropTypes.array.isRequired,
  addClassactiveChildTables: PropTypes.array.isRequired,
  addClassactiveChildChart: PropTypes.array.isRequired,
  addClassactiveChildMaps: PropTypes.array.isRequired,
  themeColor: PropTypes.string.isRequired,
  generalSetting: PropTypes.array.isRequired,
  toggleNotification: PropTypes.bool.isRequired,
  toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer, userReducer }) => {
  const {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
  } = navigationReducer;
  const { dataInfoUser } = userReducer;
  return {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
    dataInfoUser,
  };
};

export default connect(mapStateToProps, {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
  actUserInfo,
})(Navbar);
