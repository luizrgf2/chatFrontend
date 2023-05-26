import {
    createBrowserRouter,
  } from "react-router-dom";
import { LoginPage } from "./page/login";
import { NotFoundPage } from "./page/notFound";
import { ValidationPage } from "./page/validateUser";
import { PrivateRouter } from "./components/privateRouter";
import { ChatPage } from "./page/chat";
import { PrivacyPolicyPage } from "./page/privacyPolicy";



export const router = createBrowserRouter([
    {
        path:"/",
        element:<LoginPage></LoginPage>,
        errorElement:<NotFoundPage></NotFoundPage>
    },

    {
        path:"/validation",
        element:<ValidationPage></ValidationPage>,
    },

    {
        path:"/chat",
        element:<PrivateRouter><ChatPage></ChatPage></PrivateRouter>
    },
    {
        path:"/privacyPolicy",
        element:<PrivacyPolicyPage></PrivacyPolicyPage>
    }
])