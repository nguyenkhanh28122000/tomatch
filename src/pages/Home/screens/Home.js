import { useLocation } from 'react-router';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/homeStyles.module.scss';

import { privatePath } from '../../../Router/paths';
import { Header, Line, BgrMain, ButtonCpn, ModalComp } from '../../../conponents';

const cx = classNames.bind(styles);

function Home({ children }) {
    const location = useLocation();

    const [openModal, setOpenModal] = useState(false);

    return (
        <BgrMain className={cx('container')} isHomeScreen isVerticalAlignment>
            <div className={cx('boxSelect')}>
                <ButtonCpn button2 className={cx('btn')} onClick={() => setOpenModal(true)}>
                    làm bài test
                </ButtonCpn>
                <ButtonCpn button2 className={cx('btn', 'btn2')}>
                    taọ nhóm
                </ButtonCpn>
            </div>

            <div className={cx('header')}>
                <Header title={'kết quả của bạn'} header2 />
                <Line isShadow isLine1 width={'60rem'} styles={{ marginTop: '-1rem' }} />
            </div>
            <div className={cx('boxBtn')}>
                <ButtonCpn
                    to={privatePath.personalResults}
                    className={cx('btn', {
                        active: privatePath.personalResults === location.pathname,
                    })}
                >
                    Kết quả cá nhân
                </ButtonCpn>
                <div className={cx('line')}></div>
                <ButtonCpn
                    to={privatePath.groupResults}
                    className={cx('btn', {
                        active: privatePath.groupResults === location.pathname,
                    })}
                >
                    Kết quả nhóm đã tạo
                </ButtonCpn>
            </div>
            {children}
            <ModalComp isOpen={openModal} setOpenModal={setOpenModal}>
                11111
            </ModalComp>
        </BgrMain>
    );
}

export default Home;
