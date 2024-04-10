import classNames from 'classnames/bind';
import styles from '../styles/boxMailStyles.module.scss';
import { Line } from '../../../conponents';

const cx = classNames.bind(styles);

function BoxMail({ title, children, errorMes, total }) {
    return (
        <div className={cx('container', errorMes ? 'err' : null)}>
            <h3>{title}</h3>
            <span className={cx('mesErr')}>{errorMes}</span>
            <Line isLine1 isShadow width={'100%'} />
            {children}
            {total ? (
                <div className={cx('boxTotal')}>
                    <h4>Số email hợp lệ:</h4>
                    <p>{`${total.err} / ${total.total}`}</p>
                </div>
            ) : null}
        </div>
    );
}

export default BoxMail;
