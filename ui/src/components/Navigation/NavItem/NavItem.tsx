import React, { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { isPhone } from '../../../util';
import { radio } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { Television, Users } from 'phosphor-react';
import { Sigil } from '../../Sigil';
import { IsPublicBadge } from '../../IsPublicBadge';
import './style.css';

interface INavItem {
  patp: string | null,
  flare?: string,
  title?: NavItemTitle,
  logout?: boolean,
  description: string,
  isPublic: boolean,
}

export type NavItemTitle = 'Hub' | 'My Station';

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const { patp, flare, title, logout, description, isPublic } = props;

  const navigate = useNavigate();

  const handleNavItemClick = () => {
    navigate('/station/' + patp)
  }

  const patpHasSigil = patp && patp.length > 14 && isValidPatp(patp);

  return (
    <button
      className={` 
                     ${isPhone() ? 'nav-item-phone ' : 'nav-item nav-item-grow '}
                     `}
      onClick={handleNavItemClick}
    >
      <span
        className={` rounded flex 
          items-center justify-center  relative bg-background-icon text-text-icon
          `}
        style={{
          height: '88px',
          width: '88px',
          minWidth: '88px',
          minHeight: '88px',
        }}
      >
        {patp == radio.hub ?
          <Television weight='bold' size={40} /> :
          (patp &&
            <Sigil patp={patp} size={60} />
          )
        }
        {!(patp == radio.hub) &&
          <span className={`absolute bottom-0 w-full right-0 flex items-center  text-sm
          justify-center px-1 py-0.5 font-bold rounded-b bg-background-navitem-viewers
          `}
          >
            <Users
              size={20}
              weight="bold"
              style={{
                marginRight: '0.25em',
                marginBottom: '0.095em',
                zIndex: 10,
              }}
            />
            {flare}
          </span>}
      </span>
      <div
        className='flex flex-col 	w-full'
      >
        <div className={`font-bold  flex items-center  w-full 
        text-text-default mb-1
          `}
          style={{
            textAlign: 'left',
          }}
        >
          <span
            className={`font-bold  flex items-center 
          ${!patpHasSigil ? 'whitespace-nowrap' : 'whitespace-normal break-words'}
           `}
            style={{
              maxWidth: '70%',
              lineHeight: '18px'
            }}
          >
            {title ? title : patp}
          </span>
          <IsPublicBadge />
        </div>
        <div className={`flex font-bold    break-words whitespace-normal text-text-secondary
                    `}
          style={{
            lineHeight: '19.36px',
            textAlign: 'left',
            letterSpacing: '.4px',
          }}
        >
          {description}
        </div>
      </div>
    </button >
  );
};
