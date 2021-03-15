import React, { useContext } from "react";
import { IdentityContext } from "../../identity-context";
import { Helmet } from "react-helmet";
import Layout from "../components/addOns/Layout";
import { AppLogedIn } from "../components/dashBoard/AppLogedIn";
import { AppLogedOut } from "../components/dashBoard/AppLogedOut";

export default function app() {
  const { user } = useContext(IdentityContext);
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>CURD | Dashboard</title>
        </Helmet>
        <Layout>
          <AppLogedOut />
        </Layout>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>CURD | Dashboard</title>
      </Helmet>
      <Layout>
        <AppLogedIn />
      </Layout>
    </div>
  );
}
