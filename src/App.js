import { Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './Router/router';
import DefaultLayout from './conponents/Layout/Layout';
import { Fragment } from 'react';

function App() {
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
                {privateRoutes.map(({ path, element }, index) => {
                    const Page = element;
                    return (
                        <Route
                            key={`${path} + ${index}`}
                            path={path}
                            element={
                                <DefaultLayout>
                                    <Page />
                                </DefaultLayout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
