import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/detailResultStyles.module.scss';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackBtn, BgrMain, Header, Line, BoxResultGroup, PersonalInfos } from '../../../conponents';
import { privatePath } from '../../../Router/paths';

const cx = classNames.bind(styles);
function MemberResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const { idGroup } = useParams();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('is_login'))) {
            navigate(privatePath.home);
        }
    }, []);
    return (
        <BgrMain className={cx('container', 'containerMemberResult')} isHomeScreen isVerticalAlignment>
            <div className={cx('boxHeader')}>
                <BackBtn />
                <Header title={`kết quả của ${location.state.data.Name}`} />
                <Line width={'500px'} isLine1 />
            </div>
            <BoxResultGroup item={location.state.data} idGroup={idGroup} />
            <PersonalInfos />
        </BgrMain>
    );
}

export default MemberResult;
