import classNames from 'classnames/bind';
import styles from '../styles/questionFormStyles.module.scss';
import { BackBtn, BgrMain } from '../../../conponents';

import FormPersonalityTest from './FormPersonalityTest';
import FormPsychologicalTest from './FormPsychologicalTest';
import { useGetQuestionWithIDBankQuery, useGetQuestionBankWithTypeQuery } from '../../../store/api';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function TestScreen() {
    const [formData, setFormData] = useState();
    const { idGroup } = useParams();
    const location = useLocation();

    const bank = useGetQuestionBankWithTypeQuery(location.state?.questionBankType).data?.data.QuestionBankID;
    const { data } = useGetQuestionWithIDBankQuery(bank);

    useEffect(() => {
        if (data?.data) {
            setFormData(data?.data);
        }
    }, [data?.data]);

    // window.location.reload();
    // const { questionBanks } = useGetQuestionsBankQuery();
    // console.log(6666, data?.data);

    return (
        <BgrMain isHomeScreen isAlignCenter>
            <BackBtn />
            {location.state?.questionBankType === 1 && formData && (
                <FormPersonalityTest questions={formData} groupId={idGroup} questionBankID={bank} />
            )}
            {location.state?.questionBankType === 2 && formData && (
                <FormPsychologicalTest questions={formData} groupId={idGroup} questionBankID={bank} />
            )}
        </BgrMain>
    );
}

export default TestScreen;
