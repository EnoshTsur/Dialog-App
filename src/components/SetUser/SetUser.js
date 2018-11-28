import React, { Component } from 'react';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';
import classes from './SetUser.module.css';
import DefaultImage from '../../utils/DefaultImage';

class SetUser extends Component {

    // State holds image
    state = {
        name: '',
        imgPath: ''
    }

    // Change image handler
    setImage = e => this.setState({ imgPath: e.target.value })

    // Change name handler  
    setName = e => this.setState({ name: e.target.value })

    // Add event listener to key - only when component is alive
    componentDidMount = () => {
        this.setState({ name: this.props.name })
        this.nameInputRef.focus();
        window.addEventListener('keydown', this.handleKeys);
    }

    // Remove event listener when component is not alive anymore
    componentWillUnmount = () => window.removeEventListener('keydown', this.handleKeys)


    // Close Dialog with Escape key..
    handleKeys = e => {

        switch (e.key) {
            case 'Escape':
                this.props.closeDialog()
                break;

            case 'Tab':
                e.preventDefault()

                if (this.pathInputRef === document.activeElement) {
                    this.nameInputRef.focus();
                } else {
                    this.pathInputRef.focus();
                }
                break;

            case 'Enter':
                if (this.validateStateFields()) {
                    this.sendUser();
                } else {
                    return;
                }
                break;
            default:
                return;
        }

    }

    // Validate state attributes are not empty
    validateStateFields = () => (this.state.name !== '') ? true : false;


    // Send User to props
    sendUser = () => {
        const user = {
            name: this.state.name,
            imgPath: this.state.imgPath
        }

        this.props.setUser(user);
        this.props.closeDialog();
    }

    handleNoPath = () => this.setState({ imgPath: DefaultImage })


    // UI - Render
    render() {

        // Button to save
        const button = !this.validateStateFields() ?
            <button className="btn btn-success" disabled> Update</button> :
            <button className="btn btn-success" onClick={this.sendUser}> Update</button>

        return (

            <div className={classes.SetUser}>



                <div className={classes.Header}>
                    <h3>Set Name & Picture</h3>
                </div>

                <input type="text"
                    placeholder="Your Name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.setName}
                    ref={el => this.nameInputRef = el} />

                <br />

                <input type="text"
                    placeholder="Image Path"
                    className="form-control"
                    onChange={this.setImage}
                    ref={el => this.pathInputRef = el}
                />
                <hr />
                <p>Please notice image path must be valid</p>
                <p>Otherwise remain default</p>
                <Center>
                    <img src={this.state.imgPath} alt="user" onError={this.handleNoPath} />
                </Center>
                <Center>
                    <br />
                    <div className={classes.Buttons}>
                        {button}
                        <button className="btn btn-danger" onClick={this.props.closeDialog}>Cancel</button>
                    </div>
                </Center>


            </div>

        )
    }
}

export default SetUser;

