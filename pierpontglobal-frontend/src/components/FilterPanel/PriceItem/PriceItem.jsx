import React from 'react';
import Text from '../../styles/Text/Text';
import Container from '../../styles/Container/Container';
import Input from '../../styles/Input/Input';

function PriceItem() {
    const priceInput = <Input
        className="border-0 w-100"
        type="number"
        maxWidth="62px"
        height="24px"
        backgroundColor="#EEEEEE"
        fontSize="0.8125em"
        borderRadius="4px"
        lineHeight={1.31}  
    />;
    return (
        <Container
            className="d-flex flex-column border-bottom justify-content-center" 
            minHeight="54px"
        >
            <div  className="d-flex mb-0 px-3 justify-content-between">
                <Text
                    className="mb-0 align-self-center"
                    fontWeight={600}
                    lineHeight={1.31}
                >
                    Price, $
                </Text>
                <div className="d-flex">
                        {priceInput}
                        <span className="mr-1 ml-1">-</span>
                        {priceInput}
                </div> 
            </div>
        </Container>
    );
}

export default PriceItem;