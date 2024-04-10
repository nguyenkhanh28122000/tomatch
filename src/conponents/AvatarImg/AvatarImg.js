import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './avatarImgStyles.module.scss';

import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../GlobalStyle/swiper.css';

const cx = classNames.bind(styles);

// import required modules
function AvatarImg({
    idBird = 1,
    title,
    to,
    src,
    styles,
    classname,
    classNameTitle,
    value,
    isEagle,
    isOwl,
    isPeacock,
    isDove,
    onClick,
}) {
    let Comp = 'div';

    if (to) {
        Comp = Link;
    }

    const clases = cx('body', { [classname]: classname, isEagle, isOwl, isPeacock, isDove });

    return (
        <>
            <div className={cx('container')} onClick={onClick}>
                <Comp to={to} className={clases} style={styles}>
                    <img src={src} alt="avatar default error" />
                    {value && (
                        <div className={cx('showPercent')}>
                            <p className={cx('text')}>{value}%</p>
                        </div>
                    )}
                </Comp>
                {title ? <h4 className={cx('title', { [classNameTitle]: classNameTitle })}>{title}</h4> : null}
            </div>
        </>
    );
}

export default AvatarImg;
