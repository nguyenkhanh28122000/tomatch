import classNames from 'classnames/bind';
import styles from './lineStyles.module.scss';

const cx = classNames.bind(styles);

function Line({ isLine1 = false, width, styles, isShadow }) {
    const clases = cx('line', {
        isLine1,
        isShadow,
    });

    return <div className={clases} style={{ width: width, ...styles }} />;
}

export default Line;
