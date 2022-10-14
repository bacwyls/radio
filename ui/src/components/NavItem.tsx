import React, { FC, useEffect, useState } from 'react';

interface INavItem {
  patp: string|null,
  tuneTo: ((patp: string|null) => void);
  flare?: string,
  title?: string,
  logout?: boolean
}

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const {patp, tuneTo, flare, title, logout} = props;

  if (logout) {
    return(
      <button
        className="hover:pointer border-red-500 text-red-500  \
                  border px-1 text-center inline-block \
                  flex-initial mr-2 my-1 
                  "
        style={{ whiteSpace:'nowrap' }}
        onClick={() => tuneTo(null)}
      >
        <span>logout</span>
      </button> 
    )
  }

  return(
    <button
      className="hover:pointer border-black  \
                border px-1 text-center inline-block \
                flex-initial mr-2 my-1"
      style={{ whiteSpace:'nowrap' }}
      onClick={() => tuneTo(patp)}
    >
      <span>
        {flare && `${flare} `}
        {title ? title : patp}
      </span>
    </button> 
  );
};
