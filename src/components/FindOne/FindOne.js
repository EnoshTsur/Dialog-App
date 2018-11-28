import classes from './FindOne.module.css';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';

import React, { Component } from 'react'

class FindOne extends Component {


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



        const content = this.props.singleUser === null ?
            <h3>Sorry, User is not exists yet.</h3> :
            <Center>
                <div className={classes.Avatar}>
                    <img src={this.props.singleUser.imgPath} alt="" />
                    <h4>{this.props.singleUser.name}</h4>
                </div>
            </Center>

        return (
            <div className={classes.FindOne}>
                {content}
                <hr />
                <Center>
                    <button className="btn btn-danger" onClick={this.props.setShowFalse}>Close</button>
                </Center>
            </div>
        )
    }
}

export default FindOne;
