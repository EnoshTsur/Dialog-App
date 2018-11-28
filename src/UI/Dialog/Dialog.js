import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Dialog = props => (
    <div>
        <Wrapper>
            <Backdrop show={props.show} clicked={props.setShowFalse} />
            {props.children}
        </Wrapper>
    </div>
)


export default Dialog
