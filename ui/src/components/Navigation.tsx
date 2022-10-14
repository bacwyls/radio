import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import { selectTunePatP, selectIsPublic, } from '../features/station/stationSlice';
import { setNavigationOpen, selectNavigationOpen } from '../features/ui/uiSlice';
import { Radio } from '../lib';

interface INavigation {
  our: string;
  tuneTo: ((patp: string|null) => void);
  radio: Radio;
}

interface IMinitower {
  location: string;
  description: string;
  time: number;
  viewers:number;
}

export const Navigation: FC<INavigation> = (props: INavigation) => {

  const {our, tuneTo, radio} = props;
  
  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);
  const navigationOpen = useAppSelector(selectNavigationOpen);
  // const towers = useAppSelector(selectTowers);
  const dispatch = useAppDispatch();

  const [towers, setTowers] = useState<Array<IMinitower>>([])

  useEffect(()=>{
    radio.api
    .subscribe({
        app: "tower",
        path: "/greg/local",
        event: (e)=> {
          console.log('greg update', e)
          if(!e['response']) return;
         setTowers(e.response);
        },
        quit: ()=> alert('(greg) lost connection to your urbit. please refresh'),
        err: (e)=> console.log('radio err', e),
    })
  }, [])


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
          onClick={() => {

            if(!navigationOpen) {
              radio.gregRequest();
            }
            // if(radio.our === radio.tunedTo) {
            //   radio.gregPut('my epic radio station');
            // }

            dispatch(setNavigationOpen(!navigationOpen))
          }}
        >
          navigation
        </button> 
       
        {navigationOpen && 
          <div
            className='w-full flex flex-row border border-black \
                      border-t-0 border-b-0 px-2 mt-2 overflow-scroll'
          >
            <NavItem tuneTo={tuneTo} patp={null} logout/>
            {radio.tunedTo===radio.our ? (
                <button
                className="hover:pointer border-blue-700 text-blue-700  \
                          border px-1 text-center inline-block \
                          flex-initial mr-2 my-1"
                style={{ whiteSpace:'nowrap' }}
                onClick={() => {
                  radio.gregPut('my epic radio station')
                  radio.gregRequest();
                }}
              >
                <span>publish my station</span>
              </button> 
            ): (
             <NavItem tuneTo={tuneTo} patp={our} title='my station'/>
            )
            }
            {/* <NavItem tuneTo={tuneTo} patp={'~nodmyn-dosrux'} flare={'🎉'}/> */}
            {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
            <NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
            {/* <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/> */}

            {towers.map((tower:any, i:number) => 
                <NavItem tuneTo={tuneTo}
                    key={i}
                    patp={tower.location}
                    flare={tower.viewers} />
            )}            

          </div>
        }
      </div>   
    </div>
  )
}