import classNames from 'classnames/bind';
import styles from '../styles/questionFormStyles.module.scss';
import { BackBtn, BgrMain } from '../../../conponents';

import FormPersonalityTest from './FormPersonalityTest';
import FormPsychologicalTest from './FormPsychologicalTest';
import { useGetQuestionBankWithIDQuery } from '../../../store/api';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function TestGroupScreen() {
    const { idGroup, questionBankID } = useParams();
    const questionBankType = useGetQuestionBankWithIDQuery(questionBankID).data?.data?.QuestionBankType;

    return (
        <>
            {questionBankType === 1 && <FormPersonalityTest groupId={idGroup} questionBankID={questionBankID} />}
            {questionBankType === 2 && <FormPsychologicalTest groupId={idGroup} questionBankID={questionBankID} />}
        </>
    );
}

export default TestGroupScreen;
