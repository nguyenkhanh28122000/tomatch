import classNames from 'classnames/bind';

import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Bgr from '../Background/BgrMain';

import styles from './layoutStyle.module.scss';
import { ModalComp } from '..';
import { useState } from 'react';
import { useUserLogoutMutation } from '../../store/api';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/apiSlice';
import { useNavigate } from 'react-router-dom';
import { authPath } from '../../Router/paths';

const cx = classNames.bind(styles);

function Layout({ children }) {
    const [openLogout, setOpenLogout] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userLogout] = useUserLogoutMutation();

    const handleOk = () => {
        userLogout().then((data) => {
            if (data?.data?.status === 1) {
                navigate(authPath.login);
            }
        });
        localStorage.clear();
        dispatch(logout);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('main')}>
                <Header />
                <Bgr className={cx('content')} isOverflow isHomeScreen>
                    {children}
                </Bgr>
            </div>
            <Navbar setOpenLogout={setOpenLogout} />
            {openLogout && (
                <ModalComp isOpen={openLogout} setOpenModal={setOpenLogout} onOk={handleOk} textBtnOk={'Logout'}>
                    <p className={cx('titleLogoutModal')}>
                        <span>Đăng xuất</span> khỏi ứng dụng?
                    </p>
                </ModalComp>
            )}
        </div>
    );
}

export default Layout;
