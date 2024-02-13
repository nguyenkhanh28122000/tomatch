import { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './navbarStyles.module.scss';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemNavbar({ to, id, idActive, className, icon, title, childrens, onclick }) {
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

    const handleClickChildren = (id) => {
        setActiveChildren(id);
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
                            <Link
                                to={item.path}
                                className={cx('body', { activeChildren: activeChildren === item.ID })}
                                key={index}
                                onClick={() => handleClickChildren(item.ID)}
                            >
                                <h3 className={cx('title')}>{item.title}</h3>
                            </Link>
                        );
                    })}
                </div>
            ) : null}
        </Comp>
    );
}

export default memo(ItemNavbar);
