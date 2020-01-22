import React from 'react';
import SortBar from '../SortBar/SortBar';
import BreakLine from '../BreakLine/BreakLine';
import Row from './Row/Row';

function CarTable() {
    return (
        <div className="d-flex flex-column">
            <SortBar 
                header="January 19, 2017"
                className="mb-3" 
            />
            <BreakLine opacity={0.12} />
            <Row
                header
                purchaseDate="Date"
                carTitle="Vehicle"
                vin="Vin"
            />
            <BreakLine opacity={0.06} />
            <Row
                purchaseDate="05-09-2018"
                carTitle="2014 Honda Civic EX"
                vin="L974FFH73523GSB353Z0" 
            />
            <BreakLine opacity={0.06} />
            <Row
                purchaseDate="05-09-2018"
                carTitle="2014 Honda Civic EX"
                vin="L974FFH73523GSB353Z0" 
            />
            <BreakLine opacity={0.06} />
        </div>
    )
}

export default CarTable;