import classNames from 'classnames/bind';
import styles from '../styles/infoItemStyles.module.scss';

const cx = classNames.bind(styles);

function InfoItem({ title, children, errorMes, styles }) {
    return (
        <div className={cx('infoItemContainer', errorMes ? 'err' : null)} style={styles}>
            <h3>{`${title} `}:</h3>
            {children}
            <span className={cx('mesErr')}>{errorMes}</span>
        </div>
    );
}

export default InfoItem;
