import classNames from 'classnames/bind';
import styles from './personalInfoStyles.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import Modal from '../Modal/Modal';
import Line from '../Line/Line';
import { RenderBird } from '../../pages/FormQuestionResult/screen/FormQuestionResultScreen';
import { personalityInfos } from '../../acset/dataRender';
import { Navigation } from 'swiper/modules';
import Button from '../Button/Button';

import { MdOutlineArrowBackIos } from 'react-icons/md';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../GlobalStyle/swiper.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectActivePerInfo, updateActivePerInfo } from '../../store/apiSlice';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const RenderChars = ({ character }) => {
    return (
        <div className={cx('charContentBody')}>
            <ul>
                {character[0].map((char, index) => {
                    return <li key={'char1' + index}>{char}</li>;
                })}
            </ul>

            <ul>
                {character[1].map((char, index) => {
                    return <li key={'char2' + index}>{char}</li>;
                })}
            </ul>
        </div>
    );
};

const RenderExamples = ({ examples }) => {
    return (
        <>
            {examples.map((example, index) => {
                return (
                    <li key={'example' + index}>
                        <span>{example.title}:</span>
                        <p>{example.des}</p>
                    </li>
                );
            })}
        </>
    );
};

function PersonalInfos({ className }) {
    const dispatch = useDispatch();
    const { isOpen, initSlidePerInfo } = useSelector(selectActivePerInfo);

    const handleBack = () => {
        dispatch(
            updateActivePerInfo({
                isOpen,
                initSlidePerInfo: initSlidePerInfo - 1,
            }),
        );
    };

    const handleNext = () => {
        dispatch(
            updateActivePerInfo({
                isOpen,
                initSlidePerInfo: initSlidePerInfo + 1,
            }),
        );
    };

    return (
        <Modal isBtnCancel={false} isBtnOk={false} className={cx('boxModal')} isOpen={isOpen}>
            <div className={cx('boxSelectCharacter', { [className]: className })}>
                <div className={cx('birdBody', initSlidePerInfo === 1 ? 'active' : null)}>
                    <RenderBird questionType={personalityInfos[0].birdType} />
                    <div className={cx('boxInfoItem')}>
                        <h3>Đặc tính:</h3>
                        <Line width={'100%'} isLine1 />
                        <RenderChars character={personalityInfos[0].character} />
                    </div>
                    <div className={cx('boxInfoItem', 'boxMargin')}>
                        <h3>Ví dụ:</h3>
                        <Line width={'100%'} isLine1 />

                        <ul className={cx('exampleContentBody')}>
                            <RenderExamples examples={personalityInfos[0].examples} />
                        </ul>
                    </div>
                </div>
                <div className={cx('birdBody', initSlidePerInfo === 2 ? 'active' : null)}>
                    <RenderBird questionType={personalityInfos[1].birdType} />
                    <div className={cx('boxInfoItem')}>
                        <h3>Đặc tính:</h3>
                        <Line width={'100%'} isLine1 />
                        <RenderChars character={personalityInfos[1].character} />
                    </div>
                    <div className={cx('boxInfoItem', 'boxMargin')}>
                        <h3>Ví dụ:</h3>
                        <Line width={'100%'} isLine1 />

                        <ul className={cx('exampleContentBody')}>
                            <RenderExamples examples={personalityInfos[1].examples} />
                        </ul>
                    </div>
                </div>
                <div
                    className={cx(
                        'birdBody',
                        initSlidePerInfo === 3 ? 'active' : null,
                        // isMemberResult && 'isMemberResult',
                    )}
                >
                    <RenderBird questionType={personalityInfos[2].birdType} />
                    <div className={cx('boxInfoItem')}>
                        <h3>Đặc tính:</h3>
                        <Line width={'100%'} isLine1 />
                        <RenderChars character={personalityInfos[2].character} />
                    </div>
                    <div className={cx('boxInfoItem', 'boxMargin')}>
                        <h3>Ví dụ:</h3>
                        <Line width={'100%'} isLine1 />
                        <ul className={cx('exampleContentBody')}>
                            <RenderExamples examples={personalityInfos[2].examples} />
                        </ul>
                    </div>
                </div>
                <div
                    className={cx(
                        'birdBody',
                        initSlidePerInfo === 4 ? 'active' : null,
                        // isMemberResult && 'isMemberResult',
                    )}
                >
                    <RenderBird questionType={personalityInfos[3].birdType} />
                    <div className={cx('boxInfoItem')}>
                        <h3>Đặc tính:</h3>
                        <Line width={'100%'} isLine1 />
                        <RenderChars character={personalityInfos[3].character} />
                    </div>
                    <div className={cx('boxInfoItem', 'boxMargin')}>
                        <h3>Ví dụ:</h3>
                        <Line width={'100%'} isLine1 />
                        <ul className={cx('exampleContentBody')}>
                            <RenderExamples examples={personalityInfos[3].examples} />
                        </ul>
                    </div>
                </div>
                <div className={cx('boxBtn')}>
                    <Button
                        button3
                        className={cx('btn', initSlidePerInfo === 1 ? 'delBtn' : null)}
                        disabled={initSlidePerInfo === 1}
                        onClick={handleBack}
                    >
                        <MdOutlineArrowBackIos />
                    </Button>
                    <Button
                        button3
                        className={cx('btn', 'btnNext', initSlidePerInfo === 4 ? 'delBtn' : null)}
                        disabled={initSlidePerInfo === 4}
                        onClick={handleNext}
                    >
                        <MdOutlineArrowBackIos className={cx('icon')} />
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default PersonalInfos;
