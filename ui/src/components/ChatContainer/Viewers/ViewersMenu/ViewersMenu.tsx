import React, { useState, useEffect } from "react";
import { radio } from "../../../../api";
import { isPhone, } from "../../../../util";
import { ViewersTabOption } from "../ViewersButton";
import { MagnifyingGlass } from "phosphor-react";
import { useAppSelector } from "../../../../app/hooks";
import { selectBanned, selectTunePatP, selectViewers } from "../../../../features/station/stationSlice";
import { Banned } from "./Banned";
import { Viewer } from "./Viewer";
import './style.css';
import { selectIsViewersMenuOpen } from "../../../../features/ui/uiSlice";

// const viewers = ['~zod', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]
// const viewers = ['~zod', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn--tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel']

export const ViewersMenu = () => {
    const viewers = useAppSelector(selectViewers);
    const banned = useAppSelector(selectBanned);
    const tunePatP = useAppSelector(selectTunePatP);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen)

    const [openTab, setOpenTab] = useState<ViewersTabOption>('Online');
    const [viewersQuery, setViewersQuery] = useState('');
    const [queriedList, setQueriedList] = useState<string[]>(viewers);

    function handleTabClick(option: ViewersTabOption) {
        setOpenTab(option);
        setViewersQuery('');

        if (option == 'Online') {
            setQueriedList(viewers)
        }

        else if (option == 'Banned') {
            setQueriedList(banned)
        }

    }

    function handleViewersInputTextChange(e) {
        setViewersQuery(e.target.value);
    }

    useEffect(() => {
        if (openTab == 'Online') {
            let newv = viewers.filter(x => x.includes(viewersQuery))
            setQueriedList(newv);
        }
        else if (openTab == 'Banned') {
            let newb = banned.filter(x => x.includes(viewersQuery))
            setQueriedList(newb);
        }
    }, [viewersQuery, viewers, banned]);

    return (
        viewers.length > 0 && (radio.our != tunePatP || banned) ?
            <div
                className={` 
               ${isPhone() ? 'viewers-menu-phone' : ' viewers-menu'}
                    `}
            >
                {
                    radio.isAdmin() &&
                    <div className={`flex h-7 border-b-2  border-transparent text-text-default
            `}
                    >
                        <button
                            className={`w-1/2  py-2 
                            flex justify-center items-center border-b-2
                             ${openTab == 'Online' ?
                                    '  border-text-default font-semibold  '
                                    :
                                    ' border-border-default'
                                }
                      ` }
                            style={{ marginBottom: '-1px' }}
                            onClick={() => handleTabClick('Online')}
                        >
                            Online
                            <span className={`ml-1 text-sm  bg-hover-default px-1.5 h-4 flex items-center justify-center rounded
                                                     ${openTab == 'Online' && ' bg-hover-intense  font-bold'}

                        `}
                            >
                                {viewers.length}
                            </span>
                        </button>
                        <button
                            className={`w-1/2 
                 py-2 flex justify-center items-center border-b-2
                 ${openTab == 'Banned' ?
                                    'border-text-default  font-semibold border-b-2 '
                                    : 'border-border-default '}
                         `}
                            onClick={() => {
                                handleTabClick('Banned')
                            }}
                            style={{ marginBottom: '-1px' }}
                        >
                            Banned
                            <span className={`ml-1 text-sm  bg-hover-default px-1.5 h-4 flex items-center justify-center rounded
                                                                                 ${openTab == 'Banned' && ' bg-hover-intense font-bold'}
                     `}
                            >
                                {banned.length}
                            </span>
                        </button>
                    </div>
                }
                <div className="relative h-full "
                >
                    <div className="absolute w-full h-10 top-0 left-0 "
                    >
                        <div
                            className="viewers-input-wrapper  "
                        >
                            < input
                                type="text"
                                className={`viewers-input
                                ${viewersQuery.trim().length > 0 ? 'focus:border-blue-button' : 'focus:border-blue-disabled'}
                                `}
                                autoCorrect={'off'}
                                autoCapitalize={'off'}
                                autoComplete={'off'}
                                placeholder="e.g. ~sampel-palnet"
                                value={viewersQuery}
                                onChange={handleViewersInputTextChange}
                            />
                            <MagnifyingGlass className="absolute right-2 text-base text-text-default " weight="bold" />
                        </div>
                    </div>
                    <div className="viewers-list"
                        style={{
                            height: radio.isAdmin() ? 'calc(100% - 1.75rem)' : '100%'
                        }}
                    >
                        <div className={` 
                                ${isPhone() ? 'viewers-input-sticky-row-phone' : 'viewers-input-sticky-row'}
                `}
                        >
                        </div>

                        <div className="flex flex-col ">
                            {openTab == 'Online' ?
                                queriedList.map((x, i) =>
                                    <Viewer key={x} ship={x} index={i} />
                                )
                                :
                                queriedList.map((x, i) =>
                                    <Banned key={x} ship={x} index={i} />
                                )
                            }
                        </div>
                    </div>
                </div >
            </div >
            :
            <></>
    )
}



// <div className={`flex h-7 border-b-2  border-transparent text-text-default
//             `}
//                     >
//                         <button
//                             className={`w-1/2  py-2
//                             flex justify-center items-center border-b-2
//                              ${openTab == 'Online' ?
//                                     '  border-text-default font-semibold  '
//                                     :
//                                     ' border-border-default'
//                                 }
//                       ` }
//                             style={{ marginBottom: '-2px' }}
//                             onClick={() => handleTabClick('Online')}
//                         >
//                             Online

//                             {!radio.isAdmin() &&
//                                 <span className={`ml-1 text-sm  bg-hover-default px-1.5 h-4 flex items-center justify-center rounded
//                                                      ${openTab == 'Online' && ' bg-hover-intense  font-bold'}

//                         `}
//                                 >
//                                     {viewers.length}
//                                 </span>
//                             }
//                         </button>
//                         {!radio.isAdmin() ?
//                             <button
//                                 className={`w-1/2
//                  py-2 flex justify-center items-center border-b-2
//                  ${openTab == 'Banned' ?
//                                         'border-text-default  font-semibold border-b-2 '
//                                         : 'border-border-default '}
//                          `}
//                                 onClick={() => {
//                                     handleTabClick('Banned')
//                                 }}
//                                 style={{ marginBottom: '-2px' }}
//                             >
//                                 Banned
//                                 <span className={`ml-1 text-sm  bg-hover-default px-1.5 h-4 flex items-center justify-center rounded
//                                                                                  ${openTab == 'Banned' && ' bg-hover-intense font-bold'}
//                      `}
//                                 >
//                                     {banned.length}
//                                 </span>
//                             </button>
//                             :
//                             <button
//                                 className={`w-1/2
//                     py-2 flex justify-center items-center border-b-2
//                     cursor-default opacity-50
//                     ${openTab == 'Banned' ?
//                                         'border-text-default  font-semibold border-b-2 '
//                                         : 'border-border-default '}
//                             `}
//                                 style={{ marginBottom: '-2px' }}
//                             >
//                                 Banned
//                             </button>
//                         }
//                     </div>