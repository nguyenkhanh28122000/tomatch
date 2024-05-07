import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../styles/questionFormStyles.module.scss';

import {
    BgrMain,
    BackBtn,
    Pagination,
    ButtonCpn,
    Header,
    Line,
    BoxInput,
    ModalComp,
    BoxResultBeck,
    LoaderIcon,
} from '../../../conponents';

import {
    useUserSubmitExamResultMutation,
    useGetQuestionBankWithTypeQuery,
    useGetQuestionWithIDBankQuery,
} from '../../../store/api';
import { selectUserId } from '../../../store/apiSlice';
import { testEmail } from '../../../hooks/hocks';
import { privatePath } from '../../../Router/paths';
import PsyQuestionComp from '../components/PsyQuestionComp';

import { VscError } from 'react-icons/vsc';

const cx = classNames.bind(styles);

function FormPsychologicalTest({ groupId = null, questionBankID }) {
    const { idGroup } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [valueEmail, setValueEmail] = useState({
        email: '',
        name: '',
    });
    const [errEmail, setErrEmail] = useState({});
    const userID = useSelector(selectUserId);

    const bank = useGetQuestionBankWithTypeQuery(location.state?.questionBankType).data?.data[0].QuestionBankID;
    const { data, isLoading } = useGetQuestionWithIDBankQuery(questionBankID ? questionBankID : bank);
    const [userSubmitExam, userSubmitExamResponse] = useUserSubmitExamResultMutation();

    const [resultForm, setResultForm] = useState();

    //open modal
    const [openModal, setOpenModal] = useState(false);
    const [mesRespone, setMesRespone] = useState();

    useEffect(() => {
        if (data?.data) {
            setResultForm(() => {
                return data?.data?.reduce((previousValue, currentValue, currentIndex) => {
                    return [
                        ...previousValue,
                        {
                            SortOrder: currentIndex + 1,
                            Description: currentValue.Description,
                            QuestionID: currentValue.QuestionID,
                            QuestionType: currentValue.QuestionType,
                            SelectID: Math.floor(Math.random() * currentValue.Description.length) + 1,
                            // SelectID: null,
                            // Score: currentValue.Description[],
                            Score: Math.floor(Math.random() * 3),
                        },
                    ];
                }, []);
            });
        }
    }, [data?.data]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);

    //api

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let datas = resultForm?.slice(firstPostIndex, lastPostIndex);

    const setClass = (arr) => {
        let classify1 = 0;
        let classify2 = 0;
        for (let value of arr) {
            if (value.QuestionType === 1) {
                classify1 = classify1 + value.Score;
            }

            if (value.QuestionType === 2) {
                classify2 = classify1 + value.Score;
            }
        }

        if (classify1 > classify2) {
            return 0;
        } else {
            return 1;
        }
    };

    const handleSubmit = () => {
        const validationErrors = {};
        const classify = setClass(resultForm);
        if (idGroup) {
            if (!valueEmail.email.trim()) {
                validationErrors.email = 'Vui lòng nhập Email';
            } else if (testEmail(valueEmail.email)) {
                validationErrors.email = testEmail(valueEmail.email);
            }
        }

        if (Object.keys(validationErrors).length === 0) {
            const result = resultForm.reduce(
                (previousValue, currentValue) => {
                    return {
                        Result: [
                            ...previousValue.Result,
                            {
                                QuestionID: currentValue.QuestionID,
                                SortOrder: currentValue.SortOrder,
                                SelectID: currentValue.SelectID,
                            },
                        ],
                        Percentage: {
                            Total: previousValue.Percentage.Total + currentValue.Score,
                            Classify: previousValue.Percentage.Classify,
                        },
                    };
                },
                {
                    Result: [],
                    Percentage: {
                        Total: 0,
                        Classify: classify,
                    },
                },
            );

            userSubmitExam({
                result: JSON.stringify(result),
                userID: userID ? userID : null,
                // userID: null,
                groupInformationID: idGroup ? idGroup : null,
                questionBankID: questionBankID ? questionBankID : bank,
                emailInformation: idGroup ? JSON.stringify({ Email: valueEmail.email, Name: valueEmail.name }) : null,
            })
                .then((data) => {
                    setOpenModal(true);
                    setMesRespone(data?.data);
                })
                .catch(() => {
                    alert('Đã có lỗi xảy ra, vui lòng thử lại sau');
                });
        } else {
            setErrEmail(validationErrors);
        }
    };

    const handleOk = (status) => {
        if (status === 1) {
            navigate('/personal-results?type=2');
        } else {
            setOpenModal(false);
        }
    };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('is_login'))) {
            navigate(privatePath.home);
        }
    }, []);

    if (isLoading) {
        return <LoaderIcon title={'Đang tải dữ liệu'} center sizeBig />;
    }

    return (
        <BgrMain isHomeScreen isAlignCenter>
            <BackBtn />
            <div className={cx('formTestContainer')}>
                <Header title={'bài đánh giá tâm lý của bạn'} header2 />
                <Line styles={{ wdth: '40rem', marginTop: '-1rem', marginBottom: '3rem' }} isShadow isLine1 />
                {idGroup && (
                    <BoxInput
                        styles={{ marginBottom: '3rem' }}
                        setValueEmail={setValueEmail}
                        isCheckEmail
                        mesErr={errEmail.email}
                        serErrEmail={setErrEmail}
                    />
                )}

                {datas?.map((question) => {
                    return (
                        <PsyQuestionComp
                            key={question.SortOrder}
                            id={question.SortOrder}
                            idResponse={question.QuestionID}
                            question={question.Description}
                            type={question.QuestionType}
                            answer={question.SelectID}
                            score={question.Score}
                            setResultForm={setResultForm}
                        />
                    );
                })}

                <ButtonCpn
                    className={cx('btnSubmit')}
                    button1
                    onClick={handleSubmit}
                    disabled={
                        resultForm?.filter((item) => item.SelectID === null).length !== 0 ||
                        userSubmitExamResponse.isLoading
                    }
                >
                    <p className={cx('total')}>
                        Số câu hỏi đã hoàn thành:{' '}
                        <span>{`${21 - resultForm?.filter((item) => item.SelectID === null).length}/21`}</span>
                    </p>
                    {userSubmitExamResponse.isLoading && <LoaderIcon className={cx('loaderIcon')} />}
                    Hoàn Thành
                    {resultForm?.filter((item) => item.SelectID === null).length !== 0 && (
                        <p className={cx('boxHover')}>Vui lòng hoàn thành tất cả lựa chọn!!!</p>
                    )}
                </ButtonCpn>

                <Pagination
                    isFixedBottom
                    isPagination2
                    totalPosts={resultForm?.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {mesRespone && (
                <ModalComp
                    className={cx('boxModal', mesRespone.status !== 1 && 'boxModalErr')}
                    isOpen={openModal}
                    setOpenModal={setOpenModal}
                    onOk={() => handleOk(mesRespone.status)}
                    textBtnOk={mesRespone.status === 1 ? 'Xem kết quả' : 'Kiểm tra'}
                    isBtnCancel={false}
                >
                    {mesRespone.status === 1 ? (
                        <>
                            <h3>KẾT QUẢ BÀI ĐÁNH GIÁ</h3>
                            <p className={cx('text1')}>Kết luận bên dưới dựa trên kết quả bài đánh giá của bạn</p>
                            <BoxResultBeck item={mesRespone.data} isBoxGroup />
                            <br />
                        </>
                    ) : (
                        <>
                            <VscError className={cx('iconErr')} />
                            <h3>{mesRespone.message}</h3>
                            <p>Đã xảy ra lỗi, vùi lòng quay lại sau</p>
                        </>
                    )}
                </ModalComp>
            )}
        </BgrMain>
    );
}

export default FormPsychologicalTest;
