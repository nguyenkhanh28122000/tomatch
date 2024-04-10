import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/questionStyles.module.scss';
import { compareValues } from '../../../hooks/hocks';
import { InputRadio } from '../../../conponents';
const cx = classNames.bind(styles);

function PsyQuestionComp({ id, idResponse, question, score, type, answer, setResultForm }) {
    const [result, setResult] = useState(answer);
    const [point, setPoint] = useState(score);

    useEffect(() => {
        setResultForm((prev) => {
            if (typeof result === 'number') {
                const arr2 = prev;
                const arr = arr2.filter((item) => item.SortOrder !== id);

                return [
                    {
                        SortOrder: id,
                        Description: question,
                        QuestionID: idResponse,
                        QuestionType: type,
                        SelectID: result,
                        Score: point,
                    },
                    ...arr,
                ].sort(compareValues('SortOrder'));
            } else {
                return [...prev];
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    return (
        <div className={cx('questionPsyContainer')}>
            <div className={cx('boxTitle')}>
                <div className={cx('question')}>
                    <p className={cx('test')}>Đề mục {id}:</p>
                    <p className={cx('text')}>Hãy chọn 1 ý đúng nhất với bản thân</p>
                </div>

                <p className={cx('textPoint')}>
                    Điểm đạt: <span>{point || point === 0 ? point : ''}</span>
                </p>
            </div>
            {question.map((item) => {
                return (
                    <div className={cx('boxSelect')} key={item.DetailID}>
                        <InputRadio
                            onChange={() => {
                                setResult(item.DetailID);
                                setPoint(item.Score);
                            }}
                            idCheck={result}
                            idRadio={item.DetailID}
                        />
                        <p>{item.DetailDescription}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default PsyQuestionComp;
