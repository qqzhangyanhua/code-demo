import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Login from "./Login";
const { Header, Content, Footer } = Layout;
const RequireAuth = () => {
  return (
    <Layout>
      <Header>
        <Login />
      </Header>
      <Content>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default RequireAuth;
