import React from 'react';

const style = {
    fontSize: '1em',
    lineHeight: 1.25,
    color: '#3a7abf'
}
function FileUploader({onClick}) {
    return (
        <div 
            className="row  py-2 pr-3"
        >
            <div className="col-4 col-sm-2">
                <i 
                    className="fas fa-plus-square"
                    style={{
                        fontSize: '1.125em',
                        color: '#3a7abf'
                    }} 
                />
            </div>
            <div className="col">
                <p 
                    className="mb-0"
                    style={style}
                >
                    Upload new document
                </p>
            </div>
        </div>
    );
}

export default FileUploader;