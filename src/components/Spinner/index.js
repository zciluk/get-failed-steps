import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
const rotate = keyframes`
from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AnimatedSpinner = styled.div`
  display: block;
  padding: 2rem;
  margin: 4rem;
  border: 1rem solid #cccccc;
  border-left-color: #777777;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${rotate} 1.2s linear infinite;
`;

const Spinner = () => {
  return <AnimatedSpinner />;
};

export default Spinner;
