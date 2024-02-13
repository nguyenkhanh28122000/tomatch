import { LoginScreen, RegisterScreen } from '../pages/Auth';
import { HomeScreen, PersonalResultsScreen, GroupResultsScreen } from '../pages/Home';
import { UserScreen } from '../pages/User';

import { authPath, privatePath } from './paths';

const publicRoutes = [
    {
        path: authPath.login,
        element: LoginScreen,
        layout: null,
    },
    {
        path: authPath.register,
        element: RegisterScreen,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: privatePath.user,
        element: UserScreen,
        layout: null,
        layoutHome: null,
    },
    {
        path: privatePath.personalResults,
        element: PersonalResultsScreen,
        layoutHome: HomeScreen,
    },
    {
        path: privatePath.groupResults,
        element: GroupResultsScreen,
        layoutHome: HomeScreen,
    },
];

export { publicRoutes, privateRoutes };
