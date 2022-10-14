import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import {
  selectTunePatP,
  selectIsPublic
} from '../features/station/stationSlice';
import {
  setNavigationOpen,
  selectNavigationOpen
} from '../features/ui/uiSlice';

interface INavigation {
  our: string;
  tuneTo: ((patp: string|null) => void);
}

export const Navigation: FC<INavigation> = (props: INavigation) => {

  const { our, tuneTo } = props;
  
  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);
  const navigationOpen = useAppSelector(selectNavigationOpen);
  const dispatch = useAppDispatch();

  return(
    <div>
      <div className="flex mt-2 align-middle table w-full">
        <span className="text-2xl align-middle">📻</span> 
        {/* tuned to */}
        <span className="flex-full ml-4 px-2 align-middle">
          {tunePatP}{' '}{isPublic ? '(public)' : '(private)'}
        </span>
      </div>
      <div className="mb-2 flex flex-row">
       {/* <span className="">navigation:</span> */}
        <button
          className={`hover:pointer button border-black \
                    border p-1 text-center mt-2 mr-2 \
                    flex-initial ${navigationOpen ? 'font-bold' : ''}`}
          style={{ whiteSpace:'nowrap' }}
          onClick={() => dispatch(setNavigationOpen(!navigationOpen))}
        >
          navigation
        </button> 
        {navigationOpen && 
          <div
            className='w-full flex flex-row border border-black \
                      border-t-0 border-b-0 px-2 mt-2 overflow-scroll'
          >
            <NavItem tuneTo={tuneTo} patp={our} title='my station'/>
            <NavItem tuneTo={tuneTo} patp={'~nodmyn-dosrux'} flare={'🎉'}/>
            {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
            <NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
            <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/>
            <NavItem tuneTo={tuneTo} patp={null} logout/>
          </div>
        }
      </div>   
    </div>
  )
}