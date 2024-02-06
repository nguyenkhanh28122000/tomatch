import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
function Layout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default Layout;
