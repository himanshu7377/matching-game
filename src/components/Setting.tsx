// Setting.tsx
import React from 'react';
import Ellipse307 from '../images/Ellipse 307.svg';
import Ellipse308 from '../images/Ellipse 308.svg';
import cog from '../images/Cog.svg';

const Setting = () => {
  return (
    <div className="relative">
      <img src={Ellipse308} alt="Ellipse 308" className="w-8 absolute bottom-2  left-32  transform translate-x-4/8 -translate-y-1/6" />
      <img src={cog} alt="Cog" className="w-20 absolute  bottom-10 left-36 transform translate-x-1/6 -translate-y-2/6" />
      <img src={Ellipse307} alt="Ellipse 307" className="w-12 absolute bottom-40 left-60 transform -translate-x-2/3 -translate-y-1/6" />
    </div>
  );
}

export default Setting;
