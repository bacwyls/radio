import React, { FC } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Radio } from '../lib';

interface INavItem {
  patp: string|null,
  flare?: string,
  title?: string,
  // logout?: boolean,
  radio: Radio;
  description?: string
}

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const dispatch = useAppDispatch();

  const {patp, radio, flare, title, description} = props;
  return(
   
      <button
          className="hover:pointer border-black  \
                    border px-1 text-left inline-block \
                    flex-initial mr-2 my-1"
          style={{ whiteSpace:'nowrap' }}
          onClick={() => radio.tuneTo(dispatch, patp)}
        >
          <span>
            {flare && `${flare} `}
            {title ? title : patp}
            {description && ` | ${description}`}
          </span>
        </button>
  )
};
