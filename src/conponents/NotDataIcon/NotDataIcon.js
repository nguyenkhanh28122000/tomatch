import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { BsDatabaseX } from 'react-icons/bs';

const cx = classNames.bind(styles);

function NotDataIcon({ title = 'Không có dữ liệu', pl, pr, isMaxSize, isCenter }) {
    return (
        <div className={cx('body', { isMaxSize, isCenter })} style={{ paddingLeft: pl, paddingRight: pr }}>
            <BsDatabaseX className={cx('icon')} />
            <p>{title}</p>
        </div>
    );
}

export default NotDataIcon;
