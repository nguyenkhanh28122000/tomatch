import classNames from 'classnames/bind';
import styles from './buttonStyles.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    className,
    children,
    disabled = false,
    button1 = false,
    button2 = false,
    button3 = false,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((keyProp) => {
            if (keyProp.startsWith('on') && typeof props[keyProp] === 'function') {
                delete props[keyProp];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const clases = cx('wrapper', {
        [className]: className,
        button1,
        button2,
        button3,
    });

    return (
        <Comp className={clases} {...props}>
            {children}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    colorRed: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
