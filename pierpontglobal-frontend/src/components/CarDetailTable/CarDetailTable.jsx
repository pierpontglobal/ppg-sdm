import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Detail from './Detail/Detail';

const Container = styled.div`
    background-color: #fafafa;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 100%;
    padding: 8px;
`;

const CardTitle = styled.div`
  width: 100%;
  margin-bottom: 8px;
  text-align: center;
  & > span {
    font-size: 1.15em;
    font-weight: 600;
    line-height: 1.34;
  }
`;

function CarDetailTable({ car }) {
  return (
    <Container
      className="d-flex flex-column"
      backgroundColor="#fafafa"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
    >
      <CardTitle>
        <FormattedMessage id="label.vehicle-specs" />
      </CardTitle>
      <div>
        {Object.keys(car).map(
          (key, i) => {
            let text = '';
            if (car[key]) {
              text = (Array.isArray(car[key]) ? `${car[key].length} ${<FormattedMessage id="label.elements" />}` : car[key]);
            } else {
              text = <FormattedMessage id="label.not-available" />;
            }

            return (
              <Detail
                key={i}
                stripe={i === 0 || i % 2 === 0}
                title={key}
                text={text}
              />
            );
          },
        )}
      </div>
    </Container>
  );
}

export default CarDetailTable;
