import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import { selectTunePatP, selectIsPublic, selectHasPublishedStation, setHasPublishedStation, selectOurTowerDescription } from '../features/station/stationSlice';
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
  const ourTowerDescription = useAppSelector(selectOurTowerDescription);
  const navigationOpen = useAppSelector(selectNavigationOpen);
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

  useInterval(() => {
    if(!hasPublishedStation) return;

    // heartbeat to update our slot in the discovery pool
    console.log('sending greg heartbeat')
    
    // get fresh state
    radio.gregPut(ourTowerDescription);

  }, 1000 * 60 * 3)

  // @ts-ignore
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
          // @ts-ignore
        savedCallback.current();
      }
  
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }, [delay]);
  }


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
              p-2 mt-1 overflow-scroll z-10 items-start'
            >
              {/* <NavItem tuneTo={tuneTo} patp={null} logout/> */}
              {(radio.tunedTo===radio.our && !hasPublishedStation) &&
                  <button
                  className="hover:pointer border-blue-700 text-blue-700  \
                            border px-1 text-left inline-block \
                            flex-initial mr-2 my-1"
                  style={{ whiteSpace:'nowrap' }}
                  onClick={() => {
                    radio.gregPut('')
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