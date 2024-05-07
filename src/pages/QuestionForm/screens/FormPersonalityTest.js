import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../styles/questionFormStyles.module.scss';

import QuestionComp from '../components/QuestionComp';
import {
    BgrMain,
    BackBtn,
    Pagination,
    ButtonCpn,
    Header,
    Line,
    BoxInput,
    ModalComp,
    PersonalInfos,
    LoaderIcon,
} from '../../../conponents';
import { RenderBird } from '../../FormQuestionResult/screen/FormQuestionResultScreen';
import {
    useUserSubmitExamResultMutation,
    useGetQuestionBankWithTypeQuery,
    useGetQuestionWithIDBankQuery,
} from '../../../store/api';
import { selectUserId, selectUserProfile } from '../../../store/apiSlice';
import { testEmail } from '../../../hooks/hocks';
import { findMax } from '../../../hooks/hocks';
import { VscError } from 'react-icons/vsc';
import { updateActivePerInfo } from '../../../store/apiSlice';
import { privatePath } from '../../../Router/paths';
const cx = classNames.bind(styles);

function FormPersonalityTest({ groupId = null, questionBankID }) {
    const { idGroup } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserProfile);
    const [valueEmail, setValueEmail] = useState(() => {
        return {
            email: userInfo.UserName ? userInfo.UserName : '',
            name: userInfo.FullName ? userInfo.FullName : '',
        };
    });
    const [errEmail, setErrEmail] = useState({});

    const userID = useSelector(selectUserId);
    const bank = useGetQuestionBankWithTypeQuery(location.state?.questionBankType).data?.data[0].QuestionBankID;
    const { data, isLoading } = useGetQuestionWithIDBankQuery(questionBankID ? questionBankID : bank);

    // console.log(valueEmail.email.length === 0 && !idGroup ? 1 : JSON.stringify(valueEmail));
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
                            SortOrder: currentIndex,
                            Description: currentValue.Description,
                            QuestionID: currentValue.QuestionID,
                            QuestionType: currentValue.QuestionType,
                            // Answer: true,
                            Answer: currentIndex % 2 === 0 ? true : false,
                            // Answer: null,
                        },
                    ];
                }, []);
            });
        }
    }, [data?.data]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

    //api
    const [userSubmitExam, userSubmitExamResponse] = useUserSubmitExamResultMutation();

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let datas = resultForm?.slice(firstPostIndex, lastPostIndex);

    const getPercent = (arr) => {
        let sumEagle = 0;
        let sumOwl = 0;
        let sumPeacock = 0;
        let sumDove = 0;

        for (const { QuestionType, Answer } of arr) {
            switch (QuestionType) {
                case 1:
                    if (Answer) {
                        sumEagle++;
                    }
                    break;
                case 2:
                    if (Answer) {
                        sumOwl++;
                    }
                    break;

                case 3:
                    if (Answer) {
                        sumPeacock++;
                    }
                    break;

                case 4:
                    if (Answer) {
                        sumDove++;
                    }
                    break;
            }
        }
        return [
            { QuestionType: 1, Percentage: Number(((sumEagle / 80) * 100).toFixed()) },
            { QuestionType: 2, Percentage: Number(((sumOwl / 80) * 100).toFixed()) },
            { QuestionType: 3, Percentage: Number(((sumPeacock / 80) * 100).toFixed()) },
            { QuestionType: 4, Percentage: Number(((sumDove / 80) * 100).toFixed()) },
        ];
    };

    const handleSubmit = () => {
        // e.preventDefault();
        const validationErrors = {};

        const Result = resultForm.reduce((previousValue, currentValue, currentIndex) => {
            return [
                ...previousValue,
                {
                    SortOrder: currentIndex,
                    QuestionID: currentValue.QuestionID,
                    Answer: currentValue.Answer,
                },
            ];
        }, []);
        const Percentage = getPercent(resultForm);

        if (idGroup) {
            if (!valueEmail.email.trim()) {
                validationErrors.email = 'Vui lòng nhập Email';
            } else if (testEmail(valueEmail?.email)) {
                validationErrors.email = testEmail(valueEmail?.email);
            }
        }

        if (Object.keys(validationErrors).length === 0) {
            console.log(findMax(Percentage, 'Percentage'), Percentage);
            userSubmitExam({
                result: JSON.stringify({
                    Result,
                    Percentage,
                }),
                userID: userID ? userID : null,
                // userID: null,
                groupInformationID: groupId ? groupId : null,
                questionBankID: questionBankID ? questionBankID : bank,
                emailInformation: groupId ? JSON.stringify({ Email: valueEmail.email, Name: valueEmail.name }) : null,
            }).then((data) => {
                if (data?.data.status !== 1) {
                    setOpenModal(true);
                    setMesRespone(data?.data);
                } else {
                    setOpenModal(true);
                    setMesRespone({ ...data?.data, questionType: findMax(Percentage, 'Percentage').QuestionType });
                }
            });
        } else {
            setErrEmail(validationErrors);
        }
    };

    const handleOk = (status) => {
        if (status === 1) {
            navigate('/personal-results?type=1');
        } else {
            setOpenModal(false);
        }
    };

    const handleClickAvt = (id) => {
        dispatch(
            updateActivePerInfo({
                isOpen: true,
                initSlidePerInfo: id,
            }),
        );
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
                <Header title={'bài đánh giá tính cách của bạn'} header2 />
                <Line styles={{ wdth: '40rem', marginTop: '-1rem', marginBottom: '3rem' }} isShadow isLine1 />
                {idGroup && (
                    <BoxInput
                        styles={{ marginBottom: '3rem' }}
                        setValueEmail={setValueEmail}
                        isCheckEmail
                        mesErr={errEmail.email}
                        serErrEmail={setErrEmail}
                        email={valueEmail.email}
                        name={valueEmail.name}
                    />
                )}
                {datas?.map((question) => {
                    return (
                        <QuestionComp
                            key={question.SortOrder}
                            id={question.SortOrder}
                            question={question.Description}
                            idResponse={question.QuestionID}
                            type={question.QuestionType}
                            answer={question.Answer}
                            setResultForm={setResultForm}
                            resultForm={resultForm}
                        />
                    );
                })}

                <ButtonCpn
                    className={cx('btnSubmit')}
                    button1
                    onClick={handleSubmit}
                    disabled={
                        resultForm?.filter((item) => item.Answer === null).length !== 0 ||
                        userSubmitExamResponse.isLoading
                    }
                >
                    <p className={cx('total')}>
                        Số câu hỏi đã hoàn thành:{' '}
                        <span>{`${80 - resultForm?.filter((item) => item.Answer === null).length}/80`}</span>
                    </p>
                    {userSubmitExamResponse.isLoading && <LoaderIcon className={cx('loaderIcon')} />}
                    Hoàn Thành
                    {resultForm?.filter((item) => item.Answer === null).length !== 0 && (
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
                    isBtnCancel={mesRespone.status === 1}
                >
                    {mesRespone.status === 1 ? (
                        <>
                            <h3>XIN CHÚC MỪNG BẠN</h3>
                            <p className={cx('text1')}>Thông qua kết quả bài đánh giá của bạn</p>
                            <p className={cx('text2')}>Chúng tôi nhận định tính cách của bạn thuộc nhóm</p>
                            <RenderBird questionType={mesRespone.questionType} />

                            <p className={cx('text3')}>
                                <span className={cx('link')} onClick={() => handleClickAvt(mesRespone.questionType)}>
                                    Xem thêm
                                </span>{' '}
                                thông tin về tính cách này !
                            </p>
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
            <PersonalInfos />
        </BgrMain>
    );
}

export default FormPersonalityTest;
