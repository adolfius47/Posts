import {DELETE_POSTS} from '../actions'

export default payload => {
    return {
        type: DELETE_POSTS,
        payload
    }
}