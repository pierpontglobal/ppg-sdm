import React from 'react';

function Row({purchaseDate, carTitle, vin, header, onClick}) {
    return (
        <div 
            className="row py-2"
            onClick={onClick}
        >
            <div className="col-4 col-sm-2">
                <p className={`mb-0 ${header ? 'font-weight-bold' : ''}`}>
                    {purchaseDate}
                </p>
            </div>
            <div className="col">
                <p className={`mb-0 ${header ? 'font-weight-bold' : ''}`}>
                    {carTitle}
                </p>
            </div>
            <div className="col-4 col-sm-4">
                <p className={`mb-0 text-right pr-auto ${header ? 'font-weight-bold' : ''}`}>
                    {vin}
                </p>
            </div>
        </div>
    );
}

export default Row;