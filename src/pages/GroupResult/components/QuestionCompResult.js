import classNames from 'classnames/bind';
import styles from '../../QuestionForm/styles/questionStyles.module.scss';

import { InputRadio } from '../../../conponents';
const cx = classNames.bind(styles);

function QuestionCompResult({ id, question, result }) {
    return (
        <div className={cx('questionContainer')}>
            <p>{`Câu ${id + 1}: ${question}?`}</p>
            <div className={cx('boxSelect', 'boxSelectResult')}>
                <InputRadio label="Đúng" idCheck={result} idRadio={true} />
                <InputRadio label="Sai" idCheck={result} idRadio={false} />
            </div>
        </div>
    );
}

export default QuestionCompResult;
