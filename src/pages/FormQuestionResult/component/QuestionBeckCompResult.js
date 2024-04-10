import classNames from 'classnames/bind';
import styles from '../../QuestionForm/styles/questionStyles.module.scss';
import { InputRadio } from '../../../conponents';
const cx = classNames.bind(styles);

function QuestionBeckCompResult({ id, question, answer }) {
    return (
        <div className={cx('questionPsyContainer')}>
            <div className={cx('boxTitle', 'boxTitleResult')}>
                <div className={cx('question')}>
                    <p className={cx('test')}>Đề mục {id}:</p>
                    <p className={cx('text')}>Lựa chọn mà bạn thấy đúng nhất với bản thân</p>
                </div>

                <p className={cx('textPoint')}>
                    Điểm đạt: <span>{question[answer - 1].Score}</span>
                </p>
            </div>
            {question.map((item) => {
                return (
                    <div className={cx('boxSelect', 'boxSelectResult')} key={item.DetailID}>
                        <InputRadio idCheck={answer} idRadio={item.DetailID} />
                        <p>{item.DetailDescription}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default QuestionBeckCompResult;
