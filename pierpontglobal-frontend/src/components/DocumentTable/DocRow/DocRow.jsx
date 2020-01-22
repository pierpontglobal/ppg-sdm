import React from 'react';
import './style.css';

const headerStyle = {
    fontSize: '0.875em',
    fontWeight: 600,
    lineHeight: 1.36,
    color: '#000000'
}

const wordStyle = {
    fontSize: '1em',
    lineHeight: 1.25,
    color: 'rgba(0, 0, 0, 0.87)'
}
function DocRow({name, date, header}) {
    return (
        <div 
            className="DocRow row py-2 pr-3"
        >
            <div className="col-4 col-sm-2">
            {!header ? 
                <i 
                    className="fas fa-document-"
                    style={{
                        fontSize: '1em',
                        color: '#747474'
                    }} 
                /> :
                    <p 
                        className="mb-0 font-weight-bold"
                        style={headerStyle}
                    >
                        Type
                    </p> }
            </div>
            <div className="col">
                <p 
                    className={`mb-0 ${header ? 'font-weight-bold' : ''}`}
                    style={header ? headerStyle : wordStyle}
                >
                    {name}
                </p>
            </div>
            <div className="col-4 col-sm-4">
                <p 
                    className={`mb-0 text-right pr-auto ${header ? 'font-weight-bold' : ''}`}
                    style={header ? headerStyle : wordStyle}
                >
                    {date}
                </p>
            </div>
            <div className="col-2">
                <p 
                    className="text-right font-weight-bold mb-0"
                    style={header ? headerStyle : wordStyle}
                >
                    {header ? 'Delete' : 
                        <i 
                            className="fas fa-trash-alt" 
                            style={{
                                fontSize: '0.875em',
                                color: '#747474'
                            }} 
                        />}
                </p>
            </div>
        </div>
    );
}

export default DocRow;