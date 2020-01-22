import React, { useEffect } from 'react';
import styled from 'styled-components';
import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';

const Container = styled.div`
  background-color: #fafafa;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  min-height: 72px;
`;

function CarBottomNav({
  prev, next, position, goTo,
}) {
  useEffect(() => {
    setTimeout(() => {
      window.changeWWPosition('moveToTop');
    }, 1000);
    return () => {
      setTimeout(() => {
        window.changeWWPosition('normal');
      }, 1000);
    };
  }, []);
  return (
    <Container>
      <PrevBtn car={prev} onClick={() => goTo(`marketplace/car?vin=${prev.vin}&position=${parseInt(position, 10) - 1}`)} />
      <NextBtn car={next} onClick={() => goTo(`marketplace/car?vin=${next.vin}&position=${parseInt(position, 10) + 1}`)} />
    </Container>
  );
}

export default CarBottomNav;
