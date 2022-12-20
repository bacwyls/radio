import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { isPhone, tuneTo } from '../../../util';
import { radio } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { selectIsDarkMode, selectIsLandscape } from '../../../features/ui/uiSlice';
import { Television, Users } from 'phosphor-react';

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

  return (
    (patp && patp.length <= 14 && isValidPatp(patp)) ?
      <button
        className={` nav-item  rounded  hover:shadow	 relative
                      text-center inline-block px-4 py-2
                      flex items-center  gap-2 
                     relative overflow-hidden 
                     ${isDarkMode ?
            'bg-black-85 hover:bg-black-80 text-black-10  '
            : 'bg-black-10 hover:bg-black-20  text-black-80'}
                     `}
        style={{
          fontSize: '16px',
          whiteSpace: 'nowrap',
          width: '100%',
          minHeight: '124px',
          zIndex: 2,
        }}
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
                patp && patp.length <= 14 && isValidPatp(patp) &&
                sigil({
                  patp: patp,
                  renderer: reactRenderer,
                  size: 60,
                  colors: isDarkMode ? ['#60605E', '#E9E8E9'] : ['#4A4948', 'white'],
                })
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
          style={{
            lineHeight: '1.2rem',
          }}
        >
          <div className={`font-bold w-full flex items-center 
         whitespace-nowrap   
         ${isDarkMode ? 'text-black-5' : 'text-black-90 '}
 
          `}
            style={{
              wordWrap: 'break-word',
            }}
          >
            {title ? title : patp}
            <span className={`flex items-center justify-center rounded-full
                          ml-1 font-bold h-4 text-black-90
                          ${isDarkMode ? 'bg-blue-50 ' : 'bg-blue-70  '}
                          `}
              style={{
                fontSize: '14px',
                padding: '0 .6em'
              }}
            >
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
          <div className={`flex font-bold    break-words whitespace-normal
                    ${isDarkMode ? 'text-black-30' : 'text-black-70'}
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
      :
      <button
        className={` nav-item  rounded  hover:shadow	 relative
                      text-center inline-block px-4 py-2
                      flex flex-col items-center justify-center
                     relative overflow-hidden  
                     ${isDarkMode ?
            'bg-black-85 hover:bg-black-80 text-black-10  '
            : 'bg-black-10 hover:bg-black-20  text-black-80'}
                               `}
        style={{
          fontSize: '16px',
          whiteSpace: 'nowrap',
          width: '100%',
          minHeight: '124px',
          zIndex: 2,
        }}
        onClick={handleNavItemClick}
      >
        <div className={`font-bold w-full flex items-center  
           whitespace-normal justify-center     
          `}
          style={{
            wordWrap: 'break-word',
            lineHeight: '.8rem',
          }}
        >
          {title ? title : patp}
          <span className={`flex items-center justify-center rounded-full
                             ml-1 font-bold text-black-90 h-4
                             ${isDarkMode ? 'bg-blue-50' : 'bg-blue-70'}
                             `}
            style={{
              fontSize: '14px',
              padding: '0 .6em'
            }}
          >
            {isPublic ? 'Public' : 'Private'}
          </span>
        </div>
        <div className={`flex mb-0.5   font-bold 	   break-words whitespace-normal
                    ${isDarkMode ? 'text-black-30' : 'text-black-70'}
                        `}
          style={{
            lineHeight: '19.36px',
            letterSpacing: '.4px',

            textAlign: 'center',
          }}
        >
          {description}
        </div>
        <div className={`flex items-center tracking-wide	  font-bold 	
            justify-center       
          `}
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: '14px',

          }}
        >
          <Users
            size={20}
            weight="bold"
            style={{
              marginRight: '0.25em'
            }}
          />
          {flare}
        </div>
      </button >

  );
};

