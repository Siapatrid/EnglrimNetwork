import React from 'react'
import style from './Preloader.module.css'

let Preloader = (props) => {
    return (
        <div className={style.loader}>
            {/*<img*/}
            {/*    src="https://img.freepik.com/free-vector/loading-circles-blue-gradient_78370-2646.jpg?w=740&t=st=1710157327~exp=1710157927~hmac=4a3d5e601bf34c473e92baadfabe9bf7b5aebcea81f3a2dadef6149446866456"*/}
            {/*    alt="Preloader"*/}
            {/*/>*/}
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
            <span className={style.loader__element}></span>
        </div>
    )
}

export default Preloader
