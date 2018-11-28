import React, { Component } from 'react';
import classes from './AllUsers.module.css';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';

class AllUsers extends Component {

    // Add event listener -> listen to keys
    componentWillMount = () => window.addEventListener('keydown', this.handleKeys)

    // Removing event listener when component no longer exists
    componentWillUnmount = () => window.removeEventListener('keydown', this.handleKeys)

    // Handling keys
    handleKeys = e => {
        if (e.key === 'Escape') {
            this.props.closeDialog();
        }
    }


    render() {

        return (
            <div className={classes.AllUsers}>

                <div className={classes.Avatars}>
                    {
                        this.props.users.map(u => {
                            return (

                                <div key={u._id} className={classes.Avatar}>
                                    <img src={u.imgPath} alt="user" />
                                    <h4 >{u.name}</h4>
                                </div>

                            )
                        })
                    }
                </div>

                <Center>
                    <button className="btn btn-danger" onClick={this.props.closeDialog}>Close</button>
                </Center>
            </div>
        )
    }
}

export default AllUsers
