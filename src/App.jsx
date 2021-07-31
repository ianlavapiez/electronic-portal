import React, { Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import GlobalStyle from "./global.styles";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Spinner from "./components/spinner/Spinner";
import HomePage from "./pages/home";
import FourOFourPage from "./pages/404";
import {
  ConsumerRegistrationPage,
  LoginPage,
  OwnerRegistrationPage,
  SelectionPage,
} from "./pages/auth";
import MarketsPage from "./pages/markets";

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Navbar />
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
          <Route component={SelectionPage} exact path="/selection" />
          <Route component={MarketsPage} exact path="/markets" />
          <Route component={FourOFourPage} />
        </Switch>
      </Suspense>
      <Footer />
    </Fragment>
  );
};

export default App;
