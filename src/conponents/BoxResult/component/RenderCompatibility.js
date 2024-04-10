import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../boxResultStyles.module.scss';

import Line from '../../Line/Line';
import AvatarImg from '../../AvatarImg/AvatarImg';
import { bird } from '../../../acset/images';

import { getCompatibilityCalculation } from '../../../pages/GroupResult/hook';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../GlobalStyle/swiper.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import BoxSelectBird from './BoxSelectBird';
import NotDataIcon from '../../NotDataIcon/NotDataIcon';

const cx = classNames.bind(styles);

function BoxCompatibility({ birdSelect, itemPeople, isFormGroup = false }) {
    const [activeBird, setActiveBird] = useState(birdSelect);
    const [compatibilitys, setCompatibilitys] = useState(() => {
        return getCompatibilityCalculation(birdSelect, itemPeople.listBirdPeople);
    });

    useEffect(() => {
        setCompatibilitys(getCompatibilityCalculation(activeBird, itemPeople.listBirdPeople));
    }, [activeBird]);

    useEffect(() => {
        setCompatibilitys(() => {
            return getCompatibilityCalculation(birdSelect, itemPeople.listBirdPeople);
        });
    }, [birdSelect]);

    return (
        <div className={cx('compatibilityContainer', isFormGroup && 'isFormGroup')}>
            {isFormGroup || (
                <>
                    <BoxSelectBird setCharacterSelect={setActiveBird} characterSelect={activeBird} isMemberResult />
                    <Line key={1} isLine1 width={'100%'} styles={{ marginBottom: '1rem' }} />
                </>
            )}
            {!itemPeople.listBirdPeople ? (
                <NotDataIcon isCenter />
            ) : (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    grabCursor={true}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    className="mySwiper"
                >
                    {itemPeople.listBirdPeople.map((item, index) => {
                        switch (item.QuestionType) {
                            case 1:
                                return (
                                    <SwiperSlide>
                                        <div
                                            className={cx('birdAvt', 'bodySlider', activeBird === 1 ? 'active' : null)}
                                            key={item.QuestionType}
                                        >
                                            <div className={cx('boxInfo')}>
                                                <h4>Tình cảm</h4>
                                                <p>{compatibilitys[index].job}</p>
                                                <h4>Công việc</h4>
                                                <p>{compatibilitys[index].character}</p>
                                            </div>
                                            <AvatarImg
                                                src={bird.eagle}
                                                isEagle
                                                styles={{ width: '4rem', height: '4rem' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            case 2:
                                return (
                                    <SwiperSlide>
                                        <div
                                            className={cx('birdAvt', 'bodySlider', activeBird === 2 ? 'active' : null)}
                                            key={item.QuestionType}
                                        >
                                            <div className={cx('boxInfo')}>
                                                <h4>Tình cảm</h4>
                                                <p>{compatibilitys[index].job}</p>
                                                <h4>Công việc</h4>
                                                <p>{compatibilitys[index].character}</p>
                                            </div>
                                            <AvatarImg
                                                src={bird.owl}
                                                isOwl
                                                styles={{ width: '4rem', height: '4rem' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            case 3:
                                return (
                                    <SwiperSlide>
                                        <div
                                            className={cx('birdAvt', 'bodySlider', activeBird === 3 ? 'active' : null)}
                                            key={item.QuestionType}
                                        >
                                            <div className={cx('boxInfo')}>
                                                <h4>Tình cảm</h4>
                                                <p>{compatibilitys[index].job}</p>
                                                <h4>Công việc</h4>
                                                <p>{compatibilitys[index].character}</p>
                                            </div>
                                            <AvatarImg
                                                src={bird.peacock}
                                                isPeacock
                                                styles={{ width: '4rem', height: '4rem' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                            case 4:
                                return (
                                    <SwiperSlide>
                                        <div
                                            className={cx('birdAvt', 'bodySlider', activeBird === 4 ? 'active' : null)}
                                            key={item.QuestionType}
                                        >
                                            <div className={cx('boxInfo')}>
                                                <h4>Tình cảm</h4>
                                                <p>{compatibilitys[index].job}</p>
                                                <h4>Công việc</h4>
                                                <p>{compatibilitys[index].character}</p>
                                            </div>
                                            <AvatarImg
                                                src={bird.dove}
                                                isDove
                                                styles={{ width: '4rem', height: '4rem' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                );
                        }
                    })}
                </Swiper>
            )}
        </div>
    );
}

export default BoxCompatibility;
