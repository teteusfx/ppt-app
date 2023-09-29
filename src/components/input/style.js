import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  height: 38px;
  background-color: transparent;
  padding: 12px 30px;

  color: white;
  border: solid 1px white;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
  
  ::placeholder {
    color: white;
    opacity: 0.7;
  }
`;
