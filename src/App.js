import React, { Component } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import UserContainer from './containers/UserContainer/UserContainer';
import FindUsersContainer from './containers/FindUsersContainer/FindUsersContainer';


class App extends Component {

  // Manage last active element
  state = {
    active: null
  }

  // Reactivate element
  getLastActive = el => {
    this.setState({
      active: el
    })
  }

  // Set focus on last element
  setFocus = () => {
    if (this.state.active === null || this.state.active === undefined) {
      return;
    } else {
      this.state.active.focus()

    }
  }

  render() {

    return (
      <div>
        <AppHeader />
        <UserContainer sendLastActive={this.getLastActive} setFocus={this.setFocus} />
        <FindUsersContainer sendLastActive={this.getLastActive} setFocus={this.setFocus} />
      </div>
    );
  }
}

export default App;
