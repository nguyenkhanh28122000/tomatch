import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './avatarImgStyles.module.scss';

const cx = classNames.bind(styles);

function AvatarImg({ title, to, src, classname, isEagle, isOwl, isPeacock, isDove }) {
    let Comp = 'div';

    if (to) {
        Comp = Link;
    }

    const clases = cx('body', { [classname]: classname, isEagle, isOwl, isPeacock, isDove });

    return (
        <div className={cx('container')}>
            <Comp to={to} className={clases} style={{}}>
                <img src={src} alt="avatar default error" />
            </Comp>
            {title ? <h4 className={cx('title')}>{title}</h4> : null}
        </div>
    );
}

export default AvatarImg;
