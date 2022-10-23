import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { FC } from 'react';
import { GrFormView } from 'react-icons/gr';
import { isValidPatp } from 'urbit-ob'

import { MdOutlineDeviceHub, MdOutlineRadio } from 'react-icons/md';
import { tuneTo } from '../../util';
import { radio } from '../../api';
import { useAppDispatch } from '../../app/hooks';

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

  return (
    logout
      ? <button
        className="hover:pointer border-red-500 text-red-500  \
                    border px-1 text-center inline-block \
                    flex-initial mr-2 "
        style={{ whiteSpace: 'nowrap' }}
        onClick={() => tuneTo(null, radio, dispatch)}
      >
        <span>logout</span>
      </button>
      : <button
        className="hover:pointer  rounded  \
                    border border-gray-400 text-center inline-block \
                    flex-initial mr-2 flex items-center
                     justify-center relative overflow-hidden"
        style={{
          whiteSpace: 'nowrap',
          minWidth: navItemHeight,
          minHeight: navItemHeight,
          maxHeight: navItemHeight,
          maxWidth: navItemHeight,
        }}
        onClick={() => tuneTo(patp, radio, dispatch)}
      >
        <span className=' opacity-5	'>
          {title != 'hub' && title != 'my station' && patp &&
            <>
              {
                (isValidPatp(patp) && patp.length <= 14) ? sigil({
                  patp: patp,
                  renderer: reactRenderer,
                  size: 145,
                  colors: ['black', 'white'],
                })
                  :
                  <div className='bg-black'
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
          {/* {title != 'hub' && title != 'my station' && <GrSatellite style={{ fontSize: '5rem' }} />} */}
          {title == 'hub' && <MdOutlineDeviceHub style={{ fontSize: '5rem' }}></MdOutlineDeviceHub>}
        </span>
        <div className='absolute  flex flex-col items-center justify-center	h-full'>
          <div className='	inline-block font-bold' style={{
            fontSize: '.65rem',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            padding: '.2em'
          }}>
            {title ? title : patp}
          </div>
          <span className='flex items-center text-center' style={{ fontSize: '.65rem' }}>
            {flare &&
              <>
                <GrFormView className=' text-lg ' />
                {flare}
              </>
            }
          </span>
        </div>
      </button >
  );
};
