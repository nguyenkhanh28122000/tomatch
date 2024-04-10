import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './navbarStyles.module.scss';

import { IoMenuOutline } from 'react-icons/io5';
import Line from '../../Line/Line';
import ItemNavbar from './ItemNavbar';

import { itemNavbarPath1, itemNavbarPath2 } from '../../../acset/dataRender';

const cx = classNames.bind(styles);

function Navbar({ setOpenLogout }) {
    const [idActive, setIDActive] = useState(1);

    const handleClick = (id) => {
        if (id === 5) {
            setOpenLogout(true);
        }
        if (id) {
            setIDActive(id);
        } else {
            setIDActive(idActive);
        }
    };

    return (
        <div className={cx('container')}>
            <IoMenuOutline className={cx('iconMenu')} />
            <ul className={cx('content-1')}>
                {itemNavbarPath1.map((item, index) => {
                    return (
                        <ItemNavbar
                            key={index}
                            idActive={idActive}
                            id={item.ID}
                            title={item.title}
                            to={item.path}
                            icon={item.icon}
                            childrens={item.children}
                            onclick={() => handleClick(item.ID)}
                        />
                    );
                })}
            </ul>
            <Line width={'100%'} styles={{ margin: '2rem 0' }} />
            <ul className={cx('content-1')}>
                {itemNavbarPath2.map((item, index) => {
                    return (
                        <ItemNavbar
                            key={index}
                            idActive={idActive}
                            id={item.ID}
                            title={item.title}
                            to={item.path}
                            icon={item.icon}
                            childrens={item.children}
                            onclick={() => handleClick(item.ID)}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export default Navbar;
