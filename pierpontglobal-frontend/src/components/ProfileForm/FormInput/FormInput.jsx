import React from 'react';
import styled from 'styled-components';

const InputContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.875em;
  line-height: 1.36;
  color: #707070;
  flex-direction: row;
  padding: 16px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SpanWrapper = styled.div`
  font-weight: 600;
  display: flex;
  min-width: 120px;
  @media only screen and (max-width: 768px) {
    width: 100%;
    min-width: 0px;
    justify-content: center;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const InputComponent = styled.input`
  width: 100%;
  height: 40px;
  color: ${props => (!props.disabled ? '#707070' : '')};
  border: none;
  border-radius: ${props => (!props.disabled ? '' : '4px')};
  background-color: ${props => (!props.disabled ? '#eeeeee' : '')};
  font-size: 14px;
  line-height: 1.36;
  text-align: left;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

function FormInput({
  label, editable, value, onChange, id,
}) {
  return (
    <InputContent>
      <SpanWrapper>
        <span style={{ fontWeight: '600' }}>{`${label}: `}</span>
      </SpanWrapper>
      <InputWrapper>
        <InputComponent
          type="text"
          defaultValue={value}
          onChange={onChange}
          disabled={!editable}
          id={id}
        />
      </InputWrapper>
    </InputContent>
  );
}

export default FormInput;
