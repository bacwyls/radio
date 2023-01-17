import React, { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { isPhone } from '../../../util';
import { radio } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { Television, Users } from 'phosphor-react';
import { Sigil } from '../../Sigil';
import { IsPublicBadge } from '../../IsPublicBadge';
import './style.css';
import { selectDocumentFontSize } from '../../../features/ui/uiSlice';
import { useAppSelector } from '../../../app/hooks';

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
          height: '3.7rem',
          width: '3.7rem',
          minWidth: '3.7rem',
          minHeight: '3.7rem',
        }}
      >
        {patp == radio.hub ?
          <Television weight='bold' className='text-4xl' /> :
          (patp &&
            <Sigil patp={patp} size={2.2} />
          )
        }
        {!(patp == radio.hub) &&
          <span className={`absolute bottom-0 w-full right-0 flex items-center  text-sm
          justify-center px-1 py-0.5 font-bold rounded-b bg-background-navitem-viewers
          `}
          >
            <Users
              weight="bold"
              className='text-lg z-10'
              style={{
                marginRight: '0.17rem',
                marginBottom: '0.04rem',
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
              lineHeight: '0.75rem'
            }}
          >
            {title ? title : patp}
          </span>
          <IsPublicBadge />
        </div>
        <div className={`flex font-bold    break-words whitespace-normal text-text-secondary
                    `}
          style={{
            lineHeight: '0.85rem',
            textAlign: 'left',
            letterSpacing: '0.02rem',
          }}
        >
          {description}
        </div>
      </div>
    </button >
  );
};
