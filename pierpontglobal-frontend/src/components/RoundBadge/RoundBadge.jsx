import React from 'react';
import Button from '../styles/Button/Button';

function RoundBadge({count, fontColor = '#ffffff', color= '#3c79c0', className = ''}) {
    return (
        <Button
            className={`border-0 ${className}`} 
            maxWidth="20px"
            borderRadius="50%"
            backgroundColor={color}
            fontSize="0.75em"
            fontWeight="bold"
            lineHeight={1.67}
            fontColor={fontColor}
        >
            {count}
        </Button>
    )
}

export default RoundBadge;