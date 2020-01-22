import React from 'react';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

const Link = ({option, selected, title}) => (
    <Container
        className="flex-fill py-1" 
        backgroundColor={selected === option ? '#ffffff': '#fafafa'}
    >
        <Text
            className="mb-0 text-center py-2" 
            fontWeight={600}
            lineHeight={1.31}
        >
            {title}
        </Text>
    </Container>
);
function PendingNav({selected}) {
    return (
        <div className="d-flex flex-row">
            <Link
                option="buy"
                title="BUY LIST"
                selected={selected}
            />
            <Link
                option="watch"
                title="WATCH LIST"
                selected={selected}
            />
            <Link
                option="history"
                title="History"
                selected={selected}
            />
        </div>
    );
}

export default PendingNav;