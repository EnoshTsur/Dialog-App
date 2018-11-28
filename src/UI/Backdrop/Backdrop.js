import React from 'react';
import classes from './Backdrop.module.css';

/***
 * Backdrop - if the attribute show is true backdrop is visible.
 * When backdrop is clicked,
 * Props invokes a function - usually for closing the backdrop.
 */
const backdrop = props => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)

export default backdrop;