import home from "./pages/home";
import page2 from "./pages/page2";
import page3 from "./pages/page3";
import Error from "./pages/page404";
import privacy from "./pages/privacy";
import refund_policy from "./pages/refund_policy";
import terms from "./pages/terms";
import about from "./pages/about";

export const allRoutes = [
  {
    path: "/home",
    component: home,
    exact: true,
  },
  {
    path: "/privacy-policy",
    component: privacy,
    exact: true,
  },
  {
    path: "/terms-and-conditions",
    component: terms,
    exact: true,
  },
  {
    path: "/refund-policy",
    component: refund_policy,
    exact: true,
  },
  {
    path: "/about",
    component: about,
    exact: true,
  }
];
