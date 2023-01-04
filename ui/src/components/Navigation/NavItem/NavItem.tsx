import React, { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { isPhone, renderSigil, tuneTo } from '../../../util';
import { radio } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { selectIsDarkMode, selectIsLandscape } from '../../../features/ui/uiSlice';
import { Television, Users } from 'phosphor-react';

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLandscape = useAppSelector(selectIsLandscape);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleNavItemClick = () => {
    navigate('/station/' + patp)
  }

  const patpIsValid = patp && patp.length <= 14 && isValidPatp(patp);

  return (
    <button
      className={` 
                     ${isPhone() ?
          (isDarkMode ?
            'nav-item-phone text-black-10'
            : 'nav-item-phone  text-black-80') :
          (isDarkMode ?
            'nav-item   hover:bg-black-85 text-black-10  '
            : 'nav-item   hover:bg-black-10  text-black-80')

        }
                     `}
      onClick={handleNavItemClick}
    >
      <span
        className={` rounded flex 
          items-center justify-center  relative
          ${isDarkMode ? 'bg-black-70 text-black-10' : 'bg-black-80 text-white'}
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
          <>
            {
              patpIsValid &&
              renderSigil(patp, 60, isDarkMode)
            }
          </>
        }
        {!(patp == radio.hub) &&
          <span className={`absolute bottom-0 w-full right-0 flex items-center 
          justify-center px-1 py-0.5 font-bold rounded-b 
          ${isDarkMode ? 'bg-black-60 text-black-10' : 'bg-black-70  text-white'}
          `}
            style={{
              fontSize: '14px',
            }}
          >
            <Users
              size={20}
              weight="bold"
              style={{
                marginRight: '0.25em',
                zIndex: 10,
              }}
            />
            {flare}
          </span>}
      </span>
      <div
        className='flex flex-col 	w-full'
      >
        <div className={`font-bold  flex items-center  w-full mb-0.5
         ${isDarkMode ? 'text-black-5' : 'text-black-90 '}
 
          `}
          style={{
            textAlign: 'left',
            lineHeight: '18px',
          }}
        >
          <span
            className={`font-bold  flex items-center 
            ${isPhone() ? 'mb-1' : 'mb-0.5'}
          ${patpIsValid ? 'whitespace-nowrap' : 'whitespace-normal break-words'}
           `}
            style={{ maxWidth: '70%' }}
          >
            {title ? title : patp}
          </span>
          <span className={`flex items-center justify-center rounded
                          ml-1  font-bold  text-black-90 h-3  bg-blue-70
                          ${isPhone() ? 'mb-1' : 'mb-0.5'}
                          `}
            style={{
              fontSize: '14px',
              padding: '0 .3em'
            }}
          >
            {isPublic ? 'Public' : 'Private'}
          </span>
        </div>
        <div className={`flex font-bold    break-words whitespace-normal
                    ${isDarkMode ? 'text-black-20' : 'text-black-70'}
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
