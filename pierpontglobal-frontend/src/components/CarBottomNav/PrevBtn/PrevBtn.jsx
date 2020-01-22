import React from 'react';
import Text from '../../styles/Text/Text';

function PrevBtn({ car, onClick }) {
  const carAvailable = (car !== undefined);
  car = carAvailable ? car : { title: 'Not Available', car: 'Not Available' };

  const footerText = text => (
    <Text
      className="mb-0"
      fontColor="darkgray"
      fontSize="0.75em"
      lineHeight={1.33}
    >
      {text}
    </Text>
  );
  return (
    <div onClick={onClick} className="d-flex flex-row ml-auto pr-2 pr-md-0 mx-auto">
      <div className="d-flex align-items-center pr-3">
        <i style={{ color: carAvailable ? '#4276c1' : 'dimgray' }} className="material-icons">
          arrow_back
        </i>
      </div>
      <div className="pt-2 pr-md-5">
        <Text
          className="mb-0"
          fontWeight={600}
          lineHeight={1.31}
          fontColor={carAvailable ? '#3e78c0' : 'dimgray'}
        >
          Previous Vehicle
        </Text>
        {footerText(car.title)}
        {footerText(car.price)}
      </div>
    </div>
  );
}

export default PrevBtn;
