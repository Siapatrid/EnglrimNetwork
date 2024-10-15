import React from 'react';
import style from './Preloader.module.css';

let Preloader = (props) => {
    return (
        <div className={style.loader}>
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
        </div>
    );
};

export default Preloader;
