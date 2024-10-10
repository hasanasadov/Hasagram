import React from 'react';
import { ClockLoader } from 'react-spinners';

const Spinner = ({ size = 20 }) => {
  return (
    <ClockLoader size={size} />

  );
};

export default Spinner;