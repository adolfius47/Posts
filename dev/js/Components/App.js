import React, {Component} from 'react';
import {connect} from 'react-redux';
class App extends Component {
    render() {
        let dropDown, access
        if (this.props.location.pathname == '/') {
            document.title = "Posts";


            dropDown = <div className="page-title">

                            <h1 className="page-title__word">
                            Посты
                            </h1>
                        </div>



       }

            access = this.props.children

        return <div>
            {dropDown}
            <div className="app">
                    {access}
                </div>
        </div>
    }
}
export default connect(store => store)(App);