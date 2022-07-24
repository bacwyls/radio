import React, { useState } from 'react';
import marble from './img/marble.jpeg';

export const StatusBar = ({statusMsg}) => {
  return (
    <div
      className="flex-none relative p-3 mr-3 overflow-wrap font-bold"
      style={{
      backgroundImage: "url(https://0x0.st/oS_V.png)",
      backgroundRepeat: "no-repeat",
      boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.5), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
      textShadow: "1px 1px 2px gray"
    }}>
    <p>{statusMsg}</p>
    </div>
  );
};
