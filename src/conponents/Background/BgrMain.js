import classNames from 'classnames/bind';
import styles from './backgroundStyle.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Bgr({ children, className, isOverflow = false, isVerticalAlignment = false, isHomeScreen = false, onSubmit }) {
    const clases = cx('main', {
        [className]: className,
        overflow: isOverflow,
        verticalAlignment: isVerticalAlignment,
        isHomeScreen,
    });

    let BoxMain = 'div';

    if (onSubmit) {
        BoxMain = 'form';
    }

    return (
        <div className={cx('container')}>
            <BoxMain className={clases} onSubmit={onSubmit}>
                {children}
            </BoxMain>
        </div>
    );
}

Bgr.propTypes = {
    isOverflow: PropTypes.bool,
    isVerticalAlignment: PropTypes.bool,
};

export default Bgr;
