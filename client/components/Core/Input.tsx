import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder?: string;
  value?: string;
  type: string;
  errors?: any;
  name: string;
  onChange?: Function;
  disabled?: boolean;
  autoComplete?: string;
}

const InputGroup = styled.div`
  text-align: left;
  width: 100%;

  p {
    margin: -8px 0 10px 5px;
    font-size: 14px;
  }
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  font-size: 16px;
  text-indent: 2px;
  height: 45px;
  background: #F6F6F6;
  width: 100%;
  margin-bottom: 15px;
  text-indent: 12px;

  &:focus {
    border-color: #7FBFC5;
  }
`;

export default (props: InputProps) => {
  const errors = props.errors || {};
  const error = errors[props.name];

  return (
    <InputGroup>
      <Input
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        autoComplete={props.autoComplete}
        onChange={props.onChange}
        disabled={props.disabled}
        autoCapitalize="none"
        autoCorrect="off"
      />
    {error && <p>{error}</p>}
    </InputGroup>
  )
};
