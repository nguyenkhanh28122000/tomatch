import classNames from 'classnames/bind';
import styles from './headerStyles.module.scss';

const cx = classNames.bind(styles);

function Header({ title, header2 = false, header3 = false }) {
    let Header = 'h1';
    if (header2) {
        Header = 'h3';
    } else if (header3) {
        Header = 'h4';
    }

    return <Header className={cx('header')}>{title}</Header>;
}

export default Header;
