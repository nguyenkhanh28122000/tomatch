import classNames from 'classnames/bind';
import styles from './inputRadioStyles.module.scss';

const cx = classNames.bind(styles);

function InputRadio({ label, onChange, idCheck, idRadio, isLabelLeft = false }) {
    return (
        <label className={cx('radioItem', isLabelLeft || 'isLabelLeft')}>
            <input type="radio" onChange={onChange} checked={idRadio === idCheck} />
            {label}
            <span></span>
        </label>
    );
}

export default InputRadio;
