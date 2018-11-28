import React from 'react';

// Order element to the right of the container
const Right = props => {
    const wrapperStyle = {
        display: 'inline'
    }

    const contentStyle = {
        textAlign: 'right'
    }

    return (
        <div style={wrapperStyle}>
            <div style={contentStyle}>
                {props.children}
            </div>
        </div>
    )
}

export default Right;