import React, { Fragment, Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import GlobalStyle from "./global.styles";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Spinner from "./components/spinner/Spinner";
import HomePage from "./pages/home";
import AdminPage from "./pages/admin";
import FourOFourPage from "./pages/404";
import {
  AdminLoginPage,
  ConsumerRegistrationPage,
  GuestLoginPage,
  LoginPage,
  OwnerRegistrationPage,
  SelectionPage,
} from "./pages/auth";
import MarketsPage from "./pages/markets";

const App = () => {
  const excludedPaths = ["/admin", "/admin-login"];
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <Fragment>
      <GlobalStyle />
      {excludedPaths.includes(pathname) ? null : <Navbar />}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route
            component={ConsumerRegistrationPage}
            exact
            path="/consumer-registration"
          />
          <Route
            component={OwnerRegistrationPage}
            exact
            path="/owner-registration"
          />
          <Route component={LoginPage} exact path="/login" />
          <Route component={GuestLoginPage} exact path="/guest-login" />
          <Route component={SelectionPage} exact path="/selection" />
          <Route component={AdminLoginPage} exact path="/admin-login" />
          <Route component={AdminPage} exact path="/admin" />
          <Route component={MarketsPage} exact path="/markets" />
          <Route component={FourOFourPage} />
        </Switch>
      </Suspense>
      {excludedPaths.includes(pathname) ? null : <Footer />}
    </Fragment>
  );
};

export default App;
