import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import routes_client from "./routes/routes_client";
import routes_guest from "./routes/routes_guest";
import { NotFound } from "./screens/guest";
import { FUNCGetPath } from "./utils";
import { Navbar } from "./components/molecules";

window.__DEV__ = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: true,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("TOKEN")) {
      const activeKey1 = FUNCGetPath();
      if (activeKey1 === "/") this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div id="wrapper">
        <Switch>
          {routes_guest.map(({ path, component, exact }, key) => {
            return (
              <Route
                key={key}
                exact={exact}
                path={`${process.env.PUBLIC_URL}/${path}`}
                component={component}
              />
            );
          })}
          {localStorage.getItem("TOKEN") && (
            <>
              <Navbar history={this.props.history} activeKey={FUNCGetPath()} />
              <div id="main-content">
                <Switch>
                  {routes_client.map(({ path, Component, exact }, key) => {
                    return (
                      <Route
                        key={key}
                        exact={exact}
                        path={`${process.env.PUBLIC_URL}/${path}`}
                        render={(item) => <Component {...item} />}
                      />
                    );
                  })}
                </Switch>
              </div>
            </>
          )}
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({
  isLoggedin: loginReducer.isLoggedin,
});

export default withRouter(connect(mapStateToProps, {})(App));
