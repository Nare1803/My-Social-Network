import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { Account } from "../pages/auth/account";
import { Requests } from "../pages/auth/profile/components/requests";
import { Followers } from "../pages/auth/profile/components/followers";
import { Followings } from "../pages/auth/profile/followings";

export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
            { path: 'requests', element: <Requests /> },
            { path: 'followers', element: <Followers /> },
            { path: 'following', element: <Followings /> },
            { path: ':id', element: <Account /> }
        ]
    }
])