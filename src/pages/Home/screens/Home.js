import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/homeStyles.module.scss';

import { privatePath } from '../../../Router/paths';
import { exams } from '../../../acset/dataRender';
import { Header, Line, BgrMain, ButtonCpn, ModalComp, InputRadio } from '../../../conponents';
import { useSearchParams } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Home({ children }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [examTestPath, setExamTestPath] = useState({ path: privatePath.personalityTest, type: 1 });

    const handleOk = () => {
        navigate(examTestPath.path, { state: { questionBankType: examTestPath.type } });
    };

    return (
        <BgrMain className={cx('container')} isHomeScreen isVerticalAlignment>
            <div className={cx('boxSelect')}>
                <ButtonCpn button2 className={cx('btn')} onClick={() => setOpenModal(true)}>
                    làm bài đánh giá
                </ButtonCpn>
                <ButtonCpn button2 className={cx('btn', 'btn2')} to={privatePath.createGroup}>
                    tạo nhóm đánh giá
                </ButtonCpn>
            </div>

            <div className={cx('header')}>
                <Header title={'kết quả của bạn'} header2 />
                <Line isShadow isLine1 width={'60rem'} styles={{ marginTop: '-1rem' }} />
            </div>
            <div className={cx('boxBtn')}>
                <ButtonCpn
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen((prev) => !prev);
                    }}
                    className={cx('btn', 'btnPersonal', {
                        active: privatePath.personalResults === location.pathname,
                    })}
                >
                    {Number(searchParams.get('type')) === 1 ? 'Kết quả đánh giá DISC' : 'Kết quả đánh giá BECK'}
                    <FaCaretDown className={cx('iconShow')} />
                    <div className={cx('bodyBtnPersonal', open && 'isShow')}>
                        <ButtonCpn
                            to={`${privatePath.personalResults}?type=1`}
                            className={cx('selectItem', Number(searchParams.get('type')) === 1 && 'active')}
                        >
                            Kết quả đánh giá DISC
                        </ButtonCpn>
                        <ButtonCpn
                            to={`${privatePath.personalResults}?type=2`}
                            className={cx('selectItem', Number(searchParams.get('type')) === 2 && 'active')}
                        >
                            Kết quả đánh giá BECK
                        </ButtonCpn>
                    </div>
                </ButtonCpn>
                <div className={cx('line')}></div>
                <ButtonCpn
                    to={privatePath.groupResults}
                    onClick={() => {
                        if (open) {
                            setOpen(false);
                        }
                    }}
                    className={cx('btn', {
                        active: privatePath.groupResults === location.pathname,
                    })}
                >
                    Kết quả nhóm đã tạo
                </ButtonCpn>

                {/* <ButtonCpn onClick={() => setSearchParams({ value: 123 })}>test btn</ButtonCpn> */}
            </div>
            {children}
            <ModalComp
                isOpen={openModal}
                setOpenModal={setOpenModal}
                onOk={handleOk}
                isBtnCancel={false}
                textBtnOk={'Làm Bài'}
            >
                <div className={cx('contentModal')}>
                    <h3 className={cx('title')}>Chọn bài đánh giá mà bạn muốn làm !!!</h3>
                    <div className={cx('boxRadio')}>
                        {exams.map((exam) => {
                            return (
                                <InputRadio
                                    key={exam.id}
                                    label={exam.label}
                                    isLabelLef
                                    onChange={() => setExamTestPath({ path: exam.path, type: exam.id })}
                                    idCheck={examTestPath.type}
                                    idRadio={exam.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </ModalComp>
        </BgrMain>
    );
}

export default Home;
