import React, { FC } from 'react';

interface INavItem {
  patp: string|null,
  tuneTo: ((patp: string|null) => void);
  flare?: string,
  title?: string,
  // logout?: boolean,
  description?: string
}

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const {patp, tuneTo, flare, title, description} = props;
  return(
   
      <button
          className="hover:pointer border-black  \
                    border px-1 text-left inline-block \
                    flex-initial mr-2 my-1"
          style={{ whiteSpace:'nowrap' }}
          onClick={() => tuneTo(patp)}
        >
          <span>
            {flare && `${flare} `}
            {title ? title : patp}
            {description && ` | ${description}`}
          </span>
        </button>
  )
};
