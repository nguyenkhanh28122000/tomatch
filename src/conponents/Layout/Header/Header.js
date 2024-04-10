import classNames from 'classnames/bind';
import styles from './headerStyles.module.scss';

import avatarDefault from '../../../acset/images';
import AvatarImg from '../../AvatarImg/AvatarImg';
import { privatePath } from '../../../Router/paths';
const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('headerMain')}>
            <AvatarImg to={privatePath.user} classname={cx('avatar')} src={avatarDefault} />
        </div>
    );
}

export default Header;
