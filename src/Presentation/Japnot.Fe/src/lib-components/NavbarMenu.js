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
} from "../redux/actions";
import { IMGLogo, IMGUserEmpty } from "src/assets/images/dummy";

class NavbarMenu extends React.Component {
  state = {
    linkupdate: false,
  };
  componentDidMount() {
    this.props.tostMessageLoad(true);
    const { activeKey } = this.props;
    this.activeMenutabwhenNavigate("/" + activeKey);
  }

  activeMenutabwhenNavigate(activeKey) {
    if (activeKey === "/dashboard") {
      this.activeMenutabContainer("dashboradContainer");
    } else if (activeKey === "/blank" || activeKey === "/change-password") {
      this.activeMenutabContainer("SettingsContainer");
    } else if (activeKey === "/map") {
      this.activeMenutabContainer("MapsContainer");
    } else if (activeKey === "/users") {
      this.activeMenutabContainer("UsersContainer");
    }
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
  }
  render() {
    const { themeColor, sideMenuTab, activeKey } = this.props;
    document.body.classList.add(themeColor);
    return (
      <div>
        <nav className="navbar navbar-fixed-top">
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
              <a href="dashboard">
                <img
                  src={IMGLogo}
                  alt="Lucid Logo"
                  className="img-responsive logo"
                />
              </a>
            </div>

            <div className="navbar-right">
              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="login" className="icon-menu">
                      <i className="icon-login"></i>
                    </a>
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
                src={IMGUserEmpty}
                className="rounded-circle user-photo"
                alt="User Profile Picture"
              />
              <Dropdown>
                <span>Selamat datang,</span>
                <Dropdown.Toggle
                  variant="none"
                  as="a"
                  id="dropdown-basic"
                  className="user-name"
                >
                  <strong>Administrator</strong>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-right account">
                  <Dropdown.Item>
                    {" "}
                    <i className="icon-settings"></i>Change Password
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item href="login" onClick={() => this.btnLogout()}>
                    {" "}
                    <i className="icon-power"></i>Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
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
                    <li className="" id="dashboradContainer">
                      <Link
                        to="/dashboard"
                        onClick={() => {
                          this.activeMenutabContainer("dashboradContainer");
                        }}
                      >
                        <i className="icon-home"></i> <span>Dashboard</span>
                      </Link>
                      <ul className="collapse" />
                    </li>

                    <li id="UsersContainer" className="">
                      <Link
                        to="/users"
                        onClick={() => {
                          this.activeMenutabContainer("UsersContainer");
                        }}
                      >
                        <i className="icon-user"></i>{" "}
                        <span>Manajemen Pengguna</span>
                      </Link>
                      <ul className="collapse" />
                    </li>
                    <li id="MapsContainer" className="">
                      <Link
                        to="/map"
                        onClick={() => {
                          this.activeMenutabContainer("MapsContainer");
                        }}
                      >
                        <i className="icon-map"></i> <span>Maps</span>
                      </Link>
                      <ul className="collapse" />
                    </li>

                    <li id="SettingsContainer" className="">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("SettingsContainer");
                        }}
                      >
                        <i className="icon-settings"></i> <span>Settings</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={
                            activeKey === "change-password" ? "active" : ""
                          }
                        >
                          <Link to="/settings/change-password">
                            Change Password
                          </Link>
                        </li>
                        <li className={activeKey === "logout" ? "active" : ""}>
                          <Link to="/">Logout</Link>
                        </li>
                      </ul>
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

NavbarMenu.propTypes = {
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

const mapStateToProps = ({ navigationReducer }) => {
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
})(NavbarMenu);
