import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
    function handleClick (event) {
        console.log('Button component clicked');
    }

    return <Button onClick={handleClick}>Click Here</Button>
};
