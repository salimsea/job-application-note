import React from "react";
import { Link } from "react-router-dom";

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
  }

  onToggleMenu = async () => {
    await this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
    const { toggleMenu } = this.state;
    if (!toggleMenu) {
      document.body.classList.remove("layout-fullwidth");
    } else {
      document.body.classList.add("layout-fullwidth");
    }
  };
  render() {
    const { HeaderText, Breadcrumb } = this.props;
    return (
      <div className="block-header">
        <div className="row">
          <div className="col-lg-10 col-md-8 col-sm-12">
            <h2>
              <a
                href="#!"
                className="btn btn-xs btn-link btn-toggle-fullwidth"
                onClick={(e) => {
                  e.preventDefault();
                  this.onToggleMenu();
                }}
              >
                <i
                  className={
                    !this.state.toggleMenu
                      ? `fa fa-arrow-left`
                      : "fa fa-arrow-right"
                  }
                ></i>
              </a>{" "}
              {HeaderText}
            </h2>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="dashboard">
                  <i className="icon-home"></i>
                </a>
              </li>
              {Breadcrumb.map((item, index) => {
                return (
                  <li
                    key={item.name + index}
                    className="breadcrumb-item active"
                  >
                    {item.navigate ? (
                      <Link to={item.navigate} disabled={true}>
                        {item.name}
                      </Link>
                    ) : (
                      <a href={null}>{item.name}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-12 text-right"></div>
        </div>
      </div>
    );
  }
}

export default PageHeader;
