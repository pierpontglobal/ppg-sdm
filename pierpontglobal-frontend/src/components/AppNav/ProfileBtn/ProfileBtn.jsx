import React from 'react';

function ProfileBtn({onClick}) {
    return (
        <i 
            className="far fa-user-circle img-fluid d-md-none align-self-center"
            onClick={onClick}
            style={{
                    fontSize: '1.85em',
                    opacity: 0.85
            }} 
        />
        
    );
}

export default ProfileBtn;