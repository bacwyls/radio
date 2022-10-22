import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NavItem } from './NavItem';
import { selectTunePatP, selectIsPublic, } from '../features/station/stationSlice';
import { setNavigationOpen, selectNavigationOpen, toggleNativationOpen } from '../features/ui/uiSlice';
import { Radio } from '../lib';
import { reactRenderer, sigil } from '@tlon/sigil-js';
import { isValidPatp } from 'urbit-ob'
import { NavigateMenu } from './NavigateMenu';
import { MdClose } from 'react-icons/md';

interface INavigation {
  our: string;
  tuneTo: ((patp: string | null) => void);
  radio: Radio;
}

export interface IMinitower {
  location: string;
  description: string;
  time: number;
  viewers: number;
}

export const Navigation: FC<INavigation> = (props: INavigation) => {

  const { our, tuneTo, radio } = props;

  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);
  const navigationOpen = useAppSelector(selectNavigationOpen);
  const dispatch = useAppDispatch();

  const [towers, setTowers] = useState<Array<IMinitower>>([])
  const [hasPublishedStation, setHasPublishedStation] = useState(false);

  useEffect(() => {
    radio.api
      .subscribe({
        app: "tower",
        path: "/greg/local",
        event: (e) => {
          console.log('greg update', e)
          if (!e['response']) return;

          // TODO sort by viewers
          let newTowers = e.response;
          newTowers.sort(function (a: any, b: any) {
            return b.viewers - a.viewers;
          });
          setTowers(e.response);
        },
        quit: () => alert('(greg) lost connection to your urbit. please refresh'),
        err: (e) => console.log('radio err', e),
      })

    document.addEventListener("keydown", handleTabPress);
    return () => {
      document.removeEventListener("keydown", handleTabPress);
    };

  }, [])

  const handleTabPress = (event: any) => {
    if (event.key == 'Tab') {
      event.preventDefault();
      dispatch(toggleNativationOpen());
    }
  }

  useEffect(() => {
    console.log(navigationOpen)

  }, [navigationOpen]);

  useEffect(() => {
    if (!hasPublishedStation) return;
    setInterval(() => {
      // heartbeat to detect presence
      radio.gregPut('');
    }, 1000 * 60 * 3)

  }, [hasPublishedStation]);

  const height = '10vh';
  return (
    <div className="py-1 flex" style={{ height: height, maxHeight: height }}
    >
      <div className="flex align-middle  items-center justify-between m-w-2/3 mr-2 w-2/3">
        {/* tuned to */}
        <div className='flex item-center'>
          {isValidPatp(tunePatP) && <>
            <span className='bg-black p-0.5 mr-2 rounded flex justify-center items-center'>
              {tunePatP.length <= 14 && sigil({
                patp: '~fidwed-sipwyn',
                renderer: reactRenderer,
                size: 18,
                colors: ['black', 'white'],
              })}
            </span>
            <span >
              {tunePatP == our ? 'My station' :
                `~fidwed-sipwyn's station`}
              {' '}{isPublic ? '(public)' : '(private)'}
            </span>
          </>
          }
        </div>
        {(radio.tunedTo === radio.our && !hasPublishedStation) &&
          <button
            className="border border-solid border-gray-400  \
                       rounded px-2 py-1 text-center inline-block \
                      flex-initial my-1 bg-white bg-green-50 h-7 "
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => {
              radio.gregPut('')
              setHasPublishedStation(true);
              radio.gregRequest();
            }}
          >
            <span >publish my station</span>
          </button>
        }
      </div>
      <div className="flex flex-row m-w-1/3 w-1/3 justify-end items-center" >
        {/* <span className="">navigation:</span> */}
        <button
          className={`hover:pointer button border-gray-400 \
                    border px-4 text-center rounded bg-white\
                    flex-initial h-7 
                    flex justify-center items-center relative 
                    `}

          onClick={() => {
            if (!navigationOpen) {
              radio.gregRequest();
            }

            dispatch(setNavigationOpen(!navigationOpen))
          }}
        >
          {/* <span className="text-xl align-middle">📻</span> */}
          <img src='src/assets/favicon.ico' className='h-3 mr-1' />
          <span className='font-bold'
            style={{ fontSize: '.7rem' }}>
            navigate
          </span>
          <span className=' text-gray-500 ml-1 px-1 
                          border-gray-400 rounded border'
            style={{
              fontSize: '.6rem', right: '0.1em', top: '0.1em',
              boxShadow: 'rgba(50, 50, 93, 0.25) \
                0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
            }}>Tab</span>
        </button>
        {navigationOpen &&
          <NavigateMenu radio={radio} tuneTo={tuneTo} our={our} towers={towers} />
        }
      </div>

    </div >
  )
}