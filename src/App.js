import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon, Button } from "antd";
import NavHasLogined from "./components/User/NavHasLogined";
import LoginPanel from "./components/User/LoginPanel";
import storage from "./model/storage";
import router from "./model/router";
import "antd/dist/antd.css";
import "./assets/css/index.css";

const { Header, Footer, Content } = Layout;

class App extends Component {
  state = {
    loginInfo: {
      isLogin: false,
      firstName: "",
      lastName: "",
      email: "kk@mail.com",
      isInvester: true,
      isIssuer: false
    },
    showLoginPanel: false
  };

  componentDidMount = () => {
    const tempLoginInfo = storage.get("loginInfo");
    if (tempLoginInfo != null) {
      this.setState({ loginInfo: tempLoginInfo });
    }
  };

  toLoginIn = () => {
    this.setState({ showLoginPanel: true });
  };

  closeLogin = () => {
    this.setState({ showLoginPanel: false });
  };

  setLoginInfo = loginInfo => {
    //TODO 什么情况下可以这样子省略 同名？？
    //this.setState({loginInfo: loginInfo});
    this.setState({ loginInfo });
  };

  render() {
    const { loginInfo, showLoginPanel } = this.state;
    const { isLogin } = loginInfo;

    return (
      <Router>
        <Layout>
          <Header className="nav">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["0"]}
              style={{ lineHeight: "64px" }}
            >
              {
                router.map((value, key) => {
                  if (value.inMenu&&value.exact) {
                    return (
                      <Menu.Item key={value.title}>
                        <Link exact="true" to={value.path}>
                          <Icon
                            type="deployment-unit"
                            theme="outlined"
                            spin="true"
                          />
                          {value.title}
                        </Link>
                      </Menu.Item>
                    );
                  } else if (value.inMenu) {
                    return (
                      <Menu.Item key={value.title}>
                        <Link to={value.path}>
                          {value.title}
                        </Link>
                      </Menu.Item>
                  );
                  } else {
                  return null;
                  }
              })
            }
            </Menu>
            {
              isLogin
                ? (
                  <NavHasLogined
                    setLoginInfo={this.setLoginInfo}
                    loginInfo={this.state.loginInfo}
                  />
                ) 
                : (
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={this.toLoginIn}
                  >
                  SIGN UP!
                  </Button>
                )
            }
          </Header>
          <Content className="content">
            {
              router.map((value, key) => {
                if (value.exact) {
                  return (
                    <Route
                      key={key}
                      exact
                      path={value.path}
                      render={props => (
                        <value.component {...props} routes={value.routes} />
                      )}
                    />
                  );
                } else {
                  return (
                    <Route
                      key={key}
                      path={value.path}
                      render={props => (
                        <value.component
                          {...props}
                          setLoginInfo={this.setLoginInfo}
                          loginInfo={this.state.loginInfo}
                          routes={value.routes}
                        />
                      )}
                    />
                  );
                }
              })
            }
            {
              showLoginPanel && (
                <LoginPanel
                  setLoginInfo={this.setLoginInfo}
                  loginInfo={this.state.loginInfo}
                  closeLogin={this.closeLogin}
                />
              )
            }
          </Content>
          <Footer
            style={{
              textAlign: "center",
              background: "#001529",
              color: "#fff",
              fontSize: "16px",
              lineHeight: "32px"
            }}
          >
            --Investus Presents--
          </Footer>
        </Layout>
      </Router>
    );
  }
}

export default App;
