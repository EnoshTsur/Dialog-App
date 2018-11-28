import React, { Component } from 'react'
import classes from './UserContainer.module.css';
import Dialog from '../../UI/Dialog/Dialog';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';
import SetUser from '../../components/SetUser/SetUser';
import DefaultImage from '../../utils/DefaultImage';
import PostUserPopup from '../../components/PostUserPopup/PostUserPopup';

/***
 * Container for Editing new Users 
 */
class UserContainer extends Component {

    // State - holds img url & dialog visible mode 
    state = {
        defaultPath: DefaultImage,
        imgPath: DefaultImage,
        name: '',
        show: false,
        postShow: false,
        postTitle: '',
        ariaHidden: false

    }

    // Last focus
    focusHandler = () => {
        this.props.sendLastActive(this.inputElement)

    }

    // Set Dialogs visible mode to false
    closeDialog = () => {
        this.setState({ show: false, postShow: false, ariaHidden: true });
        this.props.setFocus();
    }

    // Set Edit User dialog to be true and aria-hidden modes
    openDialog = () => this.setState({ show: true, ariaHidden: true })

    // Setting image url
    setUser = user => this.setState({ name: user.name, imgPath: user.imgPath });

    // Handling illegal path - by replace it with default path
    handleNoPath = () => {
        this.setState({
            imgPath: this.state.defaultPath
        })
    }

    // Posting User after editing
    postUserHandler = async () => {

        // User to post.
        const body = { name: this.state.name, imgPath: this.state.imgPath }

        await fetch('https://vast-shore-81939.herokuapp.com/users/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(data => {
            this.setState({
                postTitle: `${this.state.name} Was saved Succesfully!`,
                postShow: true
            })
        }).catch(err => {
            this.setState({
                postTitle: 'Something went worng.',
                postShow: true
            })
        });



    }

    render() {

        // Fetch Answer Dialog
        const postDialog = this.state.postShow ?
            <Dialog show={this.state.postShow} closeDialog={this.closeDialog}>
                <PostUserPopup title={this.state.postTitle} closeDialog={this.closeDialog} />
            </Dialog> : null

        // Edit User Dialog
        const editDialog = this.state.show ?
            <Dialog setShowFalse={this.closeDialog} show={this.state.show}
                setUser={this.setUser} imgPath={this.state.imgPath} >
                <SetUser name={this.state.name} closeDialog={this.closeDialog} setUser={this.setUser} />
            </Dialog>
            : null;

        // Image
        const img = this.state.imgPath !== '' ?
            <img className={classes.Image}
                src={this.state.imgPath}
                alt="User"
                onError={this.handleNoPath} />
            : <img className={classes.Image}
                src={this.state.defaultPath}
                alt="User"
                onError={this.handleNoPath} />;

        // Saving button
        const savingButton = this.state.name !== '' ?
            <button className="btn btn-success" onClick={this.postUserHandler}>Save User</button>
            : <button className="btn btn-success" disabled>Save User</button>


        // UI - JSX
        return (
            <div className={classes.UserContainer}>

                {postDialog}

                <Center>
                    {img}
                </Center>
                <div className={classes.Header}>
                    <h4>{this.state.name === '' ? '' : this.state.name}</h4>
                </div>
                <Center>
                    <div className={classes.OpenDialog} aria-hidden={this.state.ariaHidden}>
                        <button className="btn btn-primary" onClick={this.openDialog}>Edit</button>
                        {editDialog}
                    </div>
                </Center>
                <div className={classes.Input}>
                    <input type="text" className="form-control" placeholder="Focus me"
                        onFocus={this.focusHandler} ref={el => this.inputElement = el} />
                </div>

                <Center>
                    <div className={classes.SavingButton}>
                        {savingButton}
                    </div>
                </Center>
            </div>
        )
    }
}

export default UserContainer;
