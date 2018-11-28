import React, { Component } from 'react'
import classes from './FindUsersContainer.module.css';
import Dialog from '../../UI/Dialog/Dialog';
import AllUsers from '../../components/AllUsers/AllUsers';
import FindOne from '../../components/FindOne/FindOne';

/***
 * Container for Calc dialog
 */
class FindUsersContainer extends Component {

    // state
    state = {
        name: '',
        show: false,
        ariaHidden: false,
        dialogStates: ['find-one', 'find-all'],
        dialogState: '',
        users: [],
        singleUser: null

    }

    // Last focus
    focusHandler = () => {
        this.props.sendLastActive(this.inputElement)

    }

    // Getting user input
    handleChange = e => this.setState({ name: e.target.value });

    // Getting users from data base
    fetchUsers = async () => {
        const results = await fetch('https://vast-shore-81939.herokuapp.com/users/');
        const data = await results.json();
        this.setState({ show: true, dialogState: this.state.dialogStates[1], users: data, ariaHidden: true });
    }

    // Geeting user from data base if exists
    findOneHandler = async () => {
        const response = await fetch(`https://vast-shore-81939.herokuapp.com/users/${this.state.name}`);
        const data = await response.json();
        this.setState({ show: true, dialogState: this.state.dialogStates[0], singleUser: data.data, ariaHidden: true })
    }

    // Close dialog / backdrop
    setShowFalse = () => {
        this.setState({ show: false, ariaHidden: false });
        this.props.setFocus();
    }



    render() {

        // Dialog Children
        const dialogChildren = (this.state.dialogState === this.state.dialogStates[0]) ?
            <FindOne setShowFalse={this.setShowFalse} singleUser={this.state.singleUser} /> :
            <AllUsers setShowFalse={this.setShowFalse} users={this.state.users} />

        // Dialog
        const dialog = this.state.show ?
            <Dialog setShowFalse={this.setShowFalse} show={this.state.show}
                setUser={this.setUser} imgPath={this.state.imgPath}>
                {dialogChildren}
            </Dialog> : null


        // Button
        const findBtn = this.state.name !== '' ?
            <button className="btn btn-success" onClick={this.findOneHandler}>Find</button> :
            <button className="btn btn-success" disabled>Find</button>

        return (
            <div className={classes.Container}>
                {dialog}
                <div className={classes.Input} aria-hidden={this.state.ariaHidden}>
                    <input type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onFocus={this.focusHandler}
                        ref={el => this.inputElement = el} />
                    {findBtn}
                </div>


                <div className={classes.Item}>
                    <button className="btn btn-info" onClick={this.fetchUsers}>See All</button>
                </div>
            </div>
        )
    }
}

export default FindUsersContainer;
