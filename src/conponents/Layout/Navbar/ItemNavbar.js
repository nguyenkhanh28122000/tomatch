import { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './navbarStyles.module.scss';

import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemNavbar({ to, id, idActive, className, icon, title, childrens, onclick }) {
    const navigate = useNavigate();
    const [showChildren, setShowChildren] = useState(false);
    const [activeChildren, setActiveChildren] = useState(null);
    let Icon = null;

    if (icon) {
        Icon = icon;
    }
    let Comp = 'li';
    if (to) {
        Comp = Link;
    }

    const handleClickChildren = (id, path, type) => {
        setActiveChildren(id);
        navigate(path, { state: { questionBankType: type } });
    };

    const clases = cx('wrapperItem', {
        [className]: className,
        active: idActive === id,
    });

    useEffect(() => {
        if (idActive) {
            setActiveChildren(null);
        }
    }, [idActive]);

    return (
        <Comp className={clases} onClick={onclick} to={to}>
            <div className={cx('body')} onClick={() => setShowChildren(!showChildren)}>
                <h3 className={cx('title')}>{title}</h3>
                {icon ? <Icon className={cx('icon')} /> : null}
            </div>
            {childrens ? (
                <div className={cx('bodyChildren', { activeShowChildren: showChildren })}>
                    {childrens.map((item, index) => {
                        return (
                            <p
                                // to={`${item.path}/${item.type}`}
                                className={cx('body', { activeChildren: activeChildren === item.ID })}
                                key={index}
                                onClick={() => handleClickChildren(item.ID, item.path, item.type)}
                            >
                                <h3 className={cx('title')}>{item.title}</h3>
                            </p>
                        );
                    })}
                </div>
            ) : null}
        </Comp>
    );
}

export default memo(ItemNavbar);
