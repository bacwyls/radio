import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import { selectTunePatP, selectIsPublic, selectHasPublishedStation, setHasPublishedStation } from '../features/station/stationSlice';
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
  const hasPublishedStation = useAppSelector(selectHasPublishedStation);
  const navigationOpen = useAppSelector(selectNavigationOpen);
  const dispatch = useAppDispatch();

  const [towers, setTowers] = useState<Array<IMinitower>>([])
  const [ourTower, setOurTower] = useState<IMinitower>();

  useEffect(()=>{
    radio.api
    .subscribe({
        app: "tower",
        path: "/greg/local",
        event: (e)=> {
          console.log('greg update', e)
          if(!e['response']) return;

          let newTowers = e.response;
          newTowers.sort(function(a:any, b:any) {
            return b.viewers - a.viewers;
          });
          setTowers(e.response);
        },
        quit: ()=> alert('(greg) lost connection to your urbit. please refresh'),
        err: (e)=> console.log('radio err', e),
    })
    radio.gregRequest();
  }, [])

  useEffect(()=>{
    setOurTower(towers.find(t=>t.location===our));
  }, [towers])

  useEffect(()=>{
    if(!ourTower || !hasPublishedStation) return;
    setInterval(() => {
      // heartbeat to detect presence
      radio.gregPut(ourTower.description);
    }, 1000 * 60 * 3)

  }, [hasPublishedStation]);


  return(
    <div>
      <div className="flex mt-2 align-middle table w-full">
        <span className="text-2xl align-middle">📻</span>
        {/* tuned to */}
        <span className="flex-full ml-4 px-2 align-middle">
          {tunePatP}{' '}{isPublic ? '(public)' : '(private)'}
        </span>
      </div>
      <div className="mb-2 flex-col">
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

            dispatch(setNavigationOpen(!navigationOpen))
          }}
        >
          navigation
          {(radio.tunedTo===radio.our && !hasPublishedStation) && ' *'}
        </button>

        {navigationOpen &&
          <div>
            <div
              className='flex flex-col bg-white border border-black absolute \
                        p-2 mt-1 overflow-scroll \
                        items-start'
            >
              {/* <NavItem tuneTo={tuneTo} patp={null} logout/> */}
              {(radio.tunedTo===radio.our && !hasPublishedStation) &&
                  <button
                  className="hover:pointer border-blue-700 text-blue-700  \
                            border px-1 text-left inline-block \
                            flex-initial mr-2 my-1"
                  style={{ whiteSpace:'nowrap' }}
                  onClick={() => {
                    dispatch(setHasPublishedStation(true))
                    radio.gregRequest();
                  }}
                >
                  <span>publish my station</span>
                </button>
              }

              {radio.tunedTo!==radio.our &&
                <NavItem
                      tuneTo={tuneTo}
                      patp={our}
                      title={'my station'}/>
              }

              {radio.tunedTo!==radio.hub &&
                <NavItem
                      tuneTo={tuneTo}
                      patp={radio.hub}
                      title={'hub'}/>
              }
              {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
              <NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
              {/* <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/> */}

              {towers.map((tower:any, i:number) =>
                  <NavItem tuneTo={tuneTo}
                      key={i}
                      patp={tower.location}
                      flare={tower.viewers.toString()}
                      description={tower.description} />
              )}

            </div>
          </div>
        }
      </div>
    </div>
  )
}