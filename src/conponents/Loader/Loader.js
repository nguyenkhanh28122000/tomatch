import classNames from 'classnames/bind';
import styles from './loaderStyle.module.scss';
const cx = classNames.bind(styles);

function LoaderIcon({ className, sizeBig = false, title, center }) {
    return (
        <div className={cx('loader', { [className]: className, sizeBig, center })}>
            <div className={cx('loaderInner')}></div>

            {title && <h3>{title}</h3>}
        </div>
    );
}

export default LoaderIcon;
