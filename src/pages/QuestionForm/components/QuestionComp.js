import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/questionStyles.module.scss';
import { compareValues } from '../../../hooks/hocks';
import { InputRadio } from '../../../conponents';
const cx = classNames.bind(styles);

function QuestionComp({ id, idResponse, question, type, answer, setResultForm }) {
    const [result, setResult] = useState(answer);

    useEffect(() => {
        setResultForm((prev) => {
            if (typeof result === 'boolean') {
                const arr2 = prev;
                const arr = arr2.filter((item) => item.SortOrder !== id);
                return [
                    {
                        SortOrder: id,
                        Description: question,
                        QuestionID: idResponse,
                        QuestionType: type,
                        Answer: result,
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
        <div className={cx('questionContainer')}>
            <p>{`Câu ${id + 1}: ${question}`}</p>
            <div className={cx('boxSelect')}>
                <InputRadio label="Phù hợp" onChange={() => setResult(true)} idCheck={result} idRadio={true} />
                <InputRadio label="Chưa phù hợp" onChange={() => setResult(false)} idCheck={result} idRadio={false} />
            </div>
        </div>
    );
}

export default QuestionComp;
