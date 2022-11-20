import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { FC } from 'react';
import { isValidPatp } from 'urbit-ob'
import { isPhone, tuneTo } from '../../../util';
import { radio } from '../../../api';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { selectIsDarkMode, selectIsLandscape } from '../../../features/ui/uiSlice';
import { Users } from 'phosphor-react';

interface INavItem {
  patp: string | null,
  flare?: string,
  title?: NavItemTitle,
  logout?: boolean,
}

export type NavItemTitle = 'Hub' | 'My Station';

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const { patp, flare, title, logout } = props;
  const navItemHeight = '145px';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLandscape = useAppSelector(selectIsLandscape);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const handleNavItemClick = () => {
    navigate('/station/' + patp)
  }

  return (
    logout
      ? <button
        className="hover:pointer border-red-500 text-red-500  
                    border px-1 text-center inline-block 
                    flex-initial "
        style={{ whiteSpace: 'nowrap' }}
        onClick={() => tuneTo(null, radio, dispatch)}
      >
        <span>logout</span>
      </button>
      : <button
        className={`  rounded  hover:shadow-md	
                      text-center inline-block px-3
                      flex items-center  gap-2
                     relative overflow-hidden 
                     ${(isPhone() && !isLandscape) ? 'nav-item-phone-portrait' : 'nav-item'}
                     ${isDarkMode ? 'hover:border-white border-transparent hover:border-4 border-4 ' : 'border-transparent	hover:border-black hover:border-2 border-2'}
                     `}
        style={{
          whiteSpace: 'nowrap',
          backgroundColor: 'rgb(218,228,240)',
          width: 'calc(50% - 0.5rem)',
          height: '4em',
        }}
        onClick={handleNavItemClick}
      >
        {(patp && isValidPatp(patp) && patp.length <= 14) &&
          <span
            className='bg-black py-1.5 px-2 rounded border-2 '
            style={{
              borderColor: isDarkMode ? 'rgb(218,228,240)' : 'white',
            }}
          >
            {
              sigil({
                patp: patp,
                renderer: reactRenderer,
                size: 35,
                colors: ['black', 'white'],
              })
            }
          </span>
        }
        <div
          className='flex flex-col '
          style={{
            lineHeight: '.6rem',
          }}
        >
          <div className={`font-bold w-full flex 
           ${patp && patp.length > 14 ? 'whitespace-normal' : 'whitespace-nowrap'}       
          `}
            style={{
              wordWrap: 'break-word',
              // whiteSpace: 'normal',
              lineHeight: '.8rem',
              // fontSize: '.8rem'
            }}
          >
            {title ? title : patp}
          </div>
          <div className={`flex items-center tracking-wide	  font-bold 	
            ${patp && patp.length > 14 && 'justify-center'}          
          `}
            style={{
              fontSize: '.7rem',
              color: 'rgba(0,0,0,0.5)',
            }}
          >
            <Users
              size={25}
              weight="bold"
              style={{
                marginTop: '0.1em',
                marginRight: '0.25em'
              }}
            />
            {flare + (flare && flare != '1' ? ' viewers' : ' viewer')}
          </div>
        </div>
      </button >
  );
};


// <span >
// <div className='sigil-background '
// >
//   {(patp && isValidPatp(patp) && patp.length <= 14) &&
//     sigil({
//       patp: patp,
//       renderer: reactRenderer,
//       size: 145,
//       colors: ['rgba(186, 162, 89, 0.1)', 'white'],
//     })
//   }
// </div>
// </span>
// <div
// className='absolute flex flex-col
// items-center justify-center	h-full'
// >
// <div
//   className='inline-block font-semibold	 leading-3'
//   style={{
//     fontSize: '.7rem',
//     wordWrap: 'break-word',
//     whiteSpace: 'normal',
//     padding: '.2em 0 .2em 0'
//   }}>
//   {title ? title : patp}
// </div>
// {flare &&
//   <span
//     className='flex items-center font-semibold text-center '
//     style={{ fontSize: '.65rem' }}>
//     <MdOutlinePeopleAlt className={` text-base mr-1`} />
//     {flare}
//   </span>}
// </div>