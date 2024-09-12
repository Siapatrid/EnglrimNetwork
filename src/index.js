// import * as serviceWorker from "./serviceWorker"; у Димыча есть но не помню когда и зачем появилась
import store from './Redux/Redux-store'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

// let rerenderEntireTree = (state) => {
const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
// ReactDOM.render(
//     const container = document.getElementById('app');
//     const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
            {/*почитать про bind()*/}
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)
// rerenderEntireTree(store.getState())
//
// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// })

// <React.StrictMode>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
