import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GithubConfirm from "./routes/GithubConfirm";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import CompanyDetail from "./routes/CompanyDetail";
import UploadCompany from "./routes/UploadCompany";
import StaffNotificat from "./routes/StaffNotificat";
import Dashbord from "./routes/Dashbord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "companies/:companyPk",
        element: <CompanyDetail />,
      },

      {
        path: "companies/:companyPk/upload",
        element: <UploadCompany />,
      },

      {
        path: "companies/:companyPk/staffs",
        element: <StaffNotificat />,
      },
      {
        path: "companies/:companyPk/dashbord",
        element: <Dashbord />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
