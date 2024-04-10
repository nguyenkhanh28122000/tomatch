import classNames from 'classnames/bind';
import styles from './inputCheckboxStyles.module.scss';

const cx = classNames.bind(styles);

function InputRadio({ label, onChange, idCheck = [], idCheckbox, isLabelLeft = false }) {
    return (
        <label className={cx('radioItem', isLabelLeft || 'isLabelLeft')}>
            <input type="checkbox" onChange={onChange} checked={idCheck.includes(idCheckbox)} />
            {label}
            <span></span>
        </label>
    );
}

export default InputRadio;
