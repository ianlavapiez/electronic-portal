import React from "react";

export const ConsumerRegistrationPage = React.lazy(() =>
  import("./components/ConsumerRegistration")
);
export const OwnerRegistrationPage = React.lazy(() =>
  import("./components/OwnerRegistration")
);
export const GuestLoginPage = React.lazy(() =>
  import("./components/GuestLogin")
);
export const AdminLoginPage = React.lazy(() =>
  import("./components/AdminLogin")
);
export const LoginPage = React.lazy(() => import("./components/Login"));
export const SelectionPage = React.lazy(() => import("./components/Selection"));
