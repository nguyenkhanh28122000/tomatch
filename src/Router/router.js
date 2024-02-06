import { LoginScreen, RegisterScreen } from '../pages/Auth';
import { HomeScreen } from '../pages/Home';
import { authPath } from './paths';

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
        path: '/',
        element: HomeScreen,
    },
];

export { publicRoutes, privateRoutes };
