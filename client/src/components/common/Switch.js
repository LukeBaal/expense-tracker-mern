import React from 'react';
import '../../style/common/switch.css';

const Switch = ({ active, setActive, style }) => {
  return (
    <div
      onClick={() => setActive(!active)}
      className={`switch ${active ? 'on' : 'off'}`}
      style={style}
    >
      <div className="toggle">
        <i className={`fas fa-${active ? 'plus' : 'minus'}`}></i>
      </div>
    </div>
  );
};

export default Switch;
