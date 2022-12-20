import { reactRenderer, sigil } from "@tlon/sigil-js";
import { MusicNotes, Users, XCircle } from "phosphor-react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic, selectTowers } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import './style.css';

interface ISearchStationRow {
}

export const SearchStationRow: FC<ISearchStationRow> = (props: ISearchStationRow) => {

    const towers = useAppSelector(selectTowers);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isPublic = useAppSelector(selectIsPublic);
    const [isFocused, setIsFocused] = useState(false)

    const navigate = useNavigate();

    const [tuneToText, setTuneToText] = useState('');
    const [queriedTowers, setQueriedTowers] = useState(towers);

    const hardCodedTowers = ['~wed', '~zod', '~fidwed'];

    useEffect(() => {
        document.addEventListener(
            "click",
            handleInputClick
        )

        return () => document.removeEventListener('click', handleInputClick)
    }, []);

    const suggestionsId = "suggestions-box";
    const searchStationInputId = "search-station-input";

    const handleInputClick = (event: any) => {
        var clicked = event.target as Element;
        var searchStationInput = document.getElementById(searchStationInputId);
        var suggestions = document.getElementById(suggestionsId);

        if (clicked == searchStationInput
            ||
            suggestions?.contains(clicked)
        ) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    }

    const handleInputTextChange = (e) => {
        let text = e.target.value
        setTuneToText(text);
        text.trim().length > 0 &&
            setQueriedTowers(queriedTowers.filter(x => x.location.includes(text)));
    }

    const handleTuneToSubmit = () => {
        if (!isValidPatp(tuneToText)) { return; };

        setTuneToText('');
        navigate('/station/' + tuneToText);
    }

    const handleSuggestionClick = (x) => {
        setIsFocused(false);
        setTuneToText(x);
    }

    // const handleClearInputClick = () => {
    //     setTuneToText('');
    //     setQueriedTowers([]);
    // }

    return (
        <div
            className={`h-8 relative items-center mb-2 flex w-min	
            `}
        >
            < input
                id={searchStationInputId}
                type="text"
                className={`
             h-8 whitespace-nowrap	
            rounded-md border font-semibold 
               focus:outline-none focus:shadow
            ${isDarkMode ? 'text-black-95 placeholder-black-95 border-2 ' : ' placeholder-black-80  text-black-80 border'}
            ${isFocused ? 'bg-orange-10  ' : ' bg-orange-20'}
            ${isValidPatp(tuneToText) ? ' border-orange-80    ' : ' border-orange-50 '}
            ${isValidPatp(tuneToText) && tuneToText.length <= 14 ?
                        'pl-7' : 'pl-2'
                    }
            `}
                style={{
                    width: '22em',
                    fontSize: '.65rem',
                    paddingBottom: '0.1em',
                    paddingRight: '9.1em',
                }}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                placeholder="e.g. ~sampel-palnet"
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        handleTuneToSubmit();
                    }
                }}
                value={tuneToText}
                onChange={handleInputTextChange}
            />
            {/* {tuneToText.trim().length != 0 && <XCircle className="absolute cursor-pointer" style={{ right: '7em' }} size={22} weight="bold"
                onClick={() => handleClearInputClick()}
            />
            } */}
            {isValidPatp(tuneToText) && tuneToText.length <= 14 &&
                <span
                    className={`absolute ml-2 mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       ${isDarkMode ? 'bg-black-60' : 'bg-black-80'}
                                       `}
                >
                    {sigil({
                        patp: tuneToText,
                        renderer: reactRenderer,
                        size: 16,
                        colors: isDarkMode ? ['#777777', 'white'] : ['#4A4948', 'white'],
                    })
                    }
                </span>
            }
            < button
                className={`  rounded-md  h-8 
            outline-none flex   
            rounded 
            ${isValidPatp(tuneToText) ? 'hover:shadow ' : 'cursor-not-allowed	'} 
            justify-center items-center whitespace-nowrap px-1 font-bold
            ${isDarkMode ? 'text-black-90' : 'text-white'}
            ${isValidPatp(tuneToText) ? 'bg-orange-80 ' : 'bg-orange-50 text-opacity-50	'}
            `}
                style={{
                    fontSize: '.65rem',
                    marginLeft: '-7em',
                    width: '7em'
                }}
                onClick={() =>
                    handleTuneToSubmit()
                }
            >
                <MusicNotes size={20} weight="bold" className="mr-0.5" />
                Tune In
            </ button>
            {
                hardCodedTowers.length > 0 && isFocused &&
                <div
                    id={suggestionsId}
                    className={`absolute border z-10 shadow rounded 
            w-full top-8 flex flex-col py-2 overflow-y-auto mt-1
            ${isDarkMode ? 'bg-black-90 border-black-85' : 'bg-white border-black-10'}
            `}
                    style={{
                        minHeight: '3em',
                        maxHeight: '9em',
                    }}
                >
                    {
                        hardCodedTowers.map((x) =>
                            <div
                                className={`w-full flex justify-between h
                                 cursor-pointer  px-2 py-1.5
                                 ${isDarkMode ? 'hover:bg-black-80' : 'hover:bg-black-10'}
                                 `}
                                onClick={
                                    () =>
                                        handleSuggestionClick(x)
                                }
                                style={{
                                    fontSize: '.65rem',

                                }}
                            >
                                <div className="flex items-center font-bold">
                                    {x.length <= 14 && isValidPatp(x)
                                        &&
                                        <span
                                            className={`mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       ${isDarkMode ? 'bg-black-60' : 'bg-black-80'}
                                       `}
                                        >{
                                                sigil({
                                                    patp: x,
                                                    renderer: reactRenderer,
                                                    size: 16,
                                                    colors: isDarkMode ? ['#777777', 'white'] : ['#4A4948', 'white'],
                                                })
                                            }
                                        </span>
                                    }
                                    <div style={{ maxWidth: "60%" }} >
                                        {x}
                                    </div>
                                    <span className='flex items-center justify-center ml-1
                                     rounded-lg text-black-90  font-bold h-3 w-9 pt-0.5 bg-blue-50'
                                        style={{
                                            fontSize: '.5rem',
                                            paddingBottom: '0.2em',
                                        }}
                                    >
                                        {isPublic ? 'Public' : 'Private'}
                                    </span>
                                </div>
                                <div className="flex items-center font-bold ml-1"
                                >
                                    <Users
                                        size={20}
                                        weight="bold"
                                        className="mr-0.5"
                                        style={{
                                        }}
                                    />
                                    20
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
}