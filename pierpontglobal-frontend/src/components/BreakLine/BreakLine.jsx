import React from 'react';

function BreakLine({opacity, className}) {
    return (
        <div
            className="d-flex flex-fill" 
            style={{
                opacity: opacity,
                borderBottom: 'solid 0.5px #000000'
            }} 
        />
    );
}

export default BreakLine;