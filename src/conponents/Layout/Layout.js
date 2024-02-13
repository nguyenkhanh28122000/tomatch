import classNames from 'classnames/bind';

import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Bgr from '../Background/BgrMain';

import styles from './layoutStyle.module.scss';

const cx = classNames.bind(styles);

function Layout({ children }) {
    return (
        <div className={cx('container')}>
            <div className={cx('main')}>
                <Header />
                <Bgr className={cx('content')} isOverflow isHomeScreen>
                    {children}
                </Bgr>
            </div>
            <Navbar />
        </div>
    );
}

export default Layout;
