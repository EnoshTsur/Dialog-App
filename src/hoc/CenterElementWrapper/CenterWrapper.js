import React from 'react';

// Order element to the center of the container
const Center = props => {

    const wrapperStyle = {
        display: 'inline'
    }

    const contentStyle = {
        textAlign: 'center'
    }

    return (
        <div style={wrapperStyle}>
            <div style={contentStyle}>
                {props.children}
            </div>
        </div>
    )
}

export default Center;