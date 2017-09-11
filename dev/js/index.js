import './style/index.scss'
import React from 'react'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import store from './store'
import Routing from './router'
import 'react-select/dist/react-select.css';

const id = 'contact-list'
const app = document.getElementById(id)
if (!app) throw 'Element was not found: ' + id

render(
    <Provider store={store}>
        {Routing(store.getState, store.dispatch)}
    </Provider>, app
)


