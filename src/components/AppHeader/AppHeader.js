import React from 'react';
import classes from './AppHeader.module.css';
import Center from '../../hoc/CenterElementWrapper/CenterWrapper';

// Main Header
const AppHeader = props => {
    return (
        <Center>
            <div className={classes.Header}>
                <h1>The Bold and the Beautiful</h1>
            </div>
        </Center>
    )
}

export default AppHeader
