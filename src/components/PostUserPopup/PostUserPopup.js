import React, { Component } from 'react';
import classes from './PostUserPopup.module.css';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';


class PostUserCallback extends Component {

    // Add event listener -> listen to keys
    componentWillMount = () => window.addEventListener('keydown', this.handleKeys)

    // Removing event listener when component no longer exists
    componentWillUnmount = () => window.removeEventListener('keydown', this.handleKeys)

    // Handling keys
    handleKeys = e => {
        if (e.key === 'Escape') {
            this.props.setShowFalse();
        }
    }

    render() {
        return (
            <div className={classes.PostUser}>
                <div className={classes.Header}>
                    {this.props.title}
                </div>
                <hr />
                <Center>
                    <button className="btn btn-info" onClick={this.props.setShowFalse}>Back</button>
                </Center>
            </div>
        )
    }
}

export default PostUserCallback;
