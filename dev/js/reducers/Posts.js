"use strict"
import {combineReducers} from 'redux'
import * as Action from '../actions';


const data = (previousState = [], action = {}) => {

    switch (action.type) {
        case Action.ADD_POST:
            previousState.unshift(action.payload)
            return previousState
        case Action.ADD_MARK_AND_COMMENT:
        previousState.map(item=>{
            if(action.payload.id===item.id){
                item.comments.unshift(action.payload.markAndComment)
            }
        })
        return previousState
        case Action.DELETE_POSTS:
            return []
        default:
            return previousState;


    }
}


export default combineReducers({

    data,


})