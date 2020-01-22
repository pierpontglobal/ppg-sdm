import React from 'react';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function FinancialCard({icon, title, value}) {
    return (
        <Container
            className="d-inline-flex flex-fill flex-column p-3"
            backgroundColor="#fafafa"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
            maxWidth="226px"
        >
            <div className="d-flex flex-row mb-4 justify-content-center">
                <i 
                    className={icon}
                    style={{
                        color: "#727272",
                        fontSize: '2.25em'
                    }}
                />
                <Text
                    className="mb-0 ml-4 align-self-center"
                    opacity={0.87}
                    fontSize="1em"
                    lineHeight={1.79}
                    letterSpacing="0.04375em"
                >
                    {title}
                </Text>
            </div>
            <Text
                className="text-center mb-2 pt-2 mt-1"
                opacity={0.87}
                fontSize="2.5em"
                fontWeight={300}
                lineHeight={0.63}
            >
                {value}
            </Text>
        </Container>
    );
}

export default FinancialCard;