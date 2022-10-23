import React, { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectNavigationOpen, toggleNativationOpen } from "../../features/ui/uiSlice";
import { Radio } from "../../lib"
import { NavigateMenu } from "./NavigateMenu";
import { IMinitower } from "./UpperRow";

interface INavigation {
    radio: Radio,
    our: string;
    tuneTo: ((patp: string | null) => void);
}

export const Navigation: FC<INavigation> = (props: INavigation) => {
    const { radio, tuneTo, our } = props;

    const navigationOpen = useAppSelector(selectNavigationOpen);
    const dispatch = useAppDispatch();
    const [towers, setTowers] = useState<Array<IMinitower>>([])

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

    return (
        <>
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
                    dispatch(toggleNativationOpen())
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
            {
                navigationOpen &&
                <NavigateMenu radio={radio} tuneTo={tuneTo} our={our} towers={towers} />
            }
        </>
    )
}