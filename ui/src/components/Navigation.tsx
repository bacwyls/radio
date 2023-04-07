import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import { selectTunePatP, selectIsPublic, selectHasPublishedStation, setHasPublishedStation, selectOurTowerDescription } from '../features/station/stationSlice';
import { setNavigationOpen, selectNavigationOpen } from '../features/ui/uiSlice';
import { Radio } from '../lib';
import { isOlderThanNMinutes } from '../util';


interface IMinitower {
  location: string;
  description: string;
  time: number;
  viewers:number;
}

let radio : Radio = new Radio();


function splitMinitowersByAge(minitowers: IMinitower[]): { newTowers: IMinitower[], oldTowers: IMinitower[] } {
  // Split the Minitowers into two arrays
  const maxAgeInMinutes = 10
  const newTowers = minitowers.filter(minitower => !isOlderThanNMinutes(minitower.time, maxAgeInMinutes));
  const oldTowers = minitowers.filter(minitower => isOlderThanNMinutes(minitower.time, maxAgeInMinutes));

  return { newTowers, oldTowers}
}

export const Navigation: FC = () => {


  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);
  const hasPublishedStation = useAppSelector(selectHasPublishedStation);
  const ourTowerDescription = useAppSelector(selectOurTowerDescription);
  const navigationOpen = useAppSelector(selectNavigationOpen);
  const dispatch = useAppDispatch();

  const [towers, setTowers] = useState<Array<IMinitower>>([])
 
  useEffect(()=>{
    // console.log('subscribing to tower /greg/local from navigation')
    radio.api
    .subscribe({
        app: "tower",
        path: "/greg/local",
        event: (e)=> {
          console.log('greg update', e)
          if(!e['response']) return;

          let allTowers = e.response;
          // split towers into new and old
          // then sort new by # of viewers and old by most recent
          let {newTowers, oldTowers} = splitMinitowersByAge(allTowers)
          newTowers.sort(function(a:any, b:any) {
            return b.viewers - a.viewers;
          });
          oldTowers.sort(function(a:any, b:any) {
            return b.time - a.time;
          });

          let sortedTowers : IMinitower[] = [];
          sortedTowers = sortedTowers.concat(newTowers, oldTowers)
          setTowers(sortedTowers)
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
      <div className="flex flex-row my-2 w-full h-8">


        <div className="flex flex-col mr-3"
          style={{
            justifyContent: 'center',
          }}
        >
        <button
          className={`hover:pointer button border-black \
                    border p-1 text-center\
                    ${navigationOpen ? 'font-bold' : ''}`}
          style={{ whiteSpace:'nowrap' }}
          onClick={() => {

            if(!navigationOpen) {
              radio.gregRequest();
            }

            dispatch(setNavigationOpen(!navigationOpen))
          }}
        >
          navigation
          {(tunePatP===radio.our && !hasPublishedStation) && ' *'}
        </button>

        {navigationOpen &&
          <div>
            <div
              className='flex flex-col bg-white border border-black absolute \
              p-2 overflow-scroll z-10 items-start mt-1'
              style={{
                maxHeight:'50%',
                overflowY:'scroll',
              }}
            >
              {(tunePatP===radio.our && !hasPublishedStation) &&
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

              {tunePatP!==radio.our &&
                <NavItem
                      patp={radio.our}
                      radio={radio}
                      title={'my station'}/>
              }

              {tunePatP!==radio.hub &&
                <NavItem
                      // tuneTo={radio.tuneTo}
                      patp={radio.hub}
                      radio={radio}
                      title={'hub'}/>
              }
              {towers.map((tower:any, i:number) =>
                  <NavItem
                      radio={radio}
                      key={i}
                      patp={tower.location}
                      flare={tower.viewers.toString()}
                      description={tower.description}
                      time={tower.time}
                      />
              )}

            </div>
          </div>
        }
      </div>

         {/* tuned to */}
        <div className="flex-full inline-block"
        >
          <span className="text-xl mr-3">
            📻
          </span>
          <span className="">
            {tunePatP}
          </span>
          <span>
            {' '}{isPublic ? '(public)' : '(private)'}
          </span>
        </div>





      </div>

    </div>
  )
}