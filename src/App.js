import { Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './Router/router';
import DefaultLayout from './conponents/Layout/Layout';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserProfile } from './store/apiSlice';

function App() {
    const auth = useSelector(selectUserProfile);

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map(({ path, element, layout }, index) => {
                    const Page = element;
                    const Layout = layout === null ? Fragment : DefaultLayout;
                    return (
                        <Route
                            key={`${path} + ${index}`}
                            path={path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {Object.values(auth).length !== 0 &&
                    privateRoutes.map(({ path, element, layout, layoutHome }, index) => {
                        const Page = element;
                        const LayoutHome = layoutHome === null ? Fragment : layoutHome;
                        const Layout = layout === null ? Fragment : DefaultLayout;

                        return (
                            <Route
                                key={`${path} + ${index}`}
                                path={path}
                                element={
                                    <Layout>
                                        <LayoutHome>
                                            <Page />
                                        </LayoutHome>
                                    </Layout>
                                }
                            />
                        );
                    })}
            </Routes>
        </div>
    );
}

export default App;
