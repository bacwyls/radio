import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { FC } from 'react';
import { GrFormView } from 'react-icons/gr';
import { isValidPatp } from 'urbit-ob'
import { GoRadioTower } from 'react-icons/go';

import { MdOutlineDeviceHub, MdOutlineRadio } from 'react-icons/md';
import { tuneTo } from '../../util';
import { radio } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

interface INavItem {
  patp: string | null,
  flare?: string,
  title?: string,
  logout?: boolean,
}

export const NavItem: FC<INavItem> = (props: INavItem) => {

  const { patp, flare, title, logout } = props;
  const navItemHeight = '145px';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavItemClick = () => {
    navigate('/station/' + patp)
  }

  return (
    logout
      ? <button
        className="hover:pointer border-red-500 text-red-500  \
                    border px-1 text-center inline-block \
                    flex-initial "
        style={{ whiteSpace: 'nowrap' }}
        onClick={() => tuneTo(null, radio, dispatch)}
      >
        <span>logout</span>
      </button>
      : <button
        className="hover:border-2  rounded bg-white \
                    border border-gray-400 text-center inline-block \
                    flex-initial  flex items-center
                     justify-center relative overflow-hidden"
        style={{
          whiteSpace: 'nowrap',
          minWidth: navItemHeight,
          minHeight: navItemHeight,
          maxHeight: navItemHeight,
          maxWidth: navItemHeight,
        }}
        onClick={handleNavItemClick}
      >
        {title != 'hub' && title != 'my station' && <GoRadioTower className="absolute opacity-100 " style={{ top: '.3em', right: '.3em', color: 'black' }} />}
        <span className=' opacity-5	'>
          {title != 'hub' && title != 'my station' && patp &&
            <>
              {
                (isValidPatp(patp) && patp.length <= 14) ? <>
                  {
                    sigil({
                      patp: patp,
                      renderer: reactRenderer,
                      size: 145,
                      colors: ['white', 'black'],
                    })
                  }
                </>
                  :
                  <div className='bg-white'
                    style={{
                      minWidth: navItemHeight,
                      minHeight: navItemHeight,
                      maxHeight: navItemHeight,
                      maxWidth: navItemHeight,
                    }}
                  ></div>
              }
            </>
          }
          {title == 'my station' && <MdOutlineRadio style={{ fontSize: '5rem' }} />}
          {title == 'hub' && <MdOutlineDeviceHub style={{ fontSize: '4rem' }}></MdOutlineDeviceHub>}
        </span>
        <div className='absolute  flex flex-col items-center justify-center	h-full'>
          <div
            className='inline-block font-bold leading-3 '
            style={{
              fontSize: '.65rem',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
              padding: '.2em 0 .2em 0'
            }}>
            {title ? title : patp}
          </div>
          {flare && <span className='flex items-center text-center ' style={{ fontSize: '.65rem' }}>
            <GrFormView className=' text-lg ' />
            {flare}
          </span>}
        </div>
      </button >
  );
};
