import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className='flex'>
      <button
        onClick={goBack}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
      </button>
    </div>
  );
};

export default BackButton;
