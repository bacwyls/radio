import { MusicNotes, Users, X, } from "phosphor-react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { IMinitower, selectTowers } from "../../../features/station/stationSlice";
import { isPhone } from "../../../util";
import { IsPublicBadge } from "../../IsPublicBadge";
import { Sigil } from "../../Sigil";
import './style.css';

interface ISearchStationRow {
}

export const SearchStationRow: FC<ISearchStationRow> = (props: ISearchStationRow) => {

    const towers = useAppSelector(selectTowers);
    const [isFocused, setIsFocused] = useState(false)

    const navigate = useNavigate();

    const [tuneToText, setTuneToText] = useState('');
    const [queriedTowers, setQueriedTowers] = useState(towers);

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
        if (text.trim().length > 0) {
            setQueriedTowers(towers.filter(x => x.location.includes(text) && x.location != radio.our));
        }
        else {
            setQueriedTowers(towers);
        }
    }

    const handleTuneToSubmit = () => {
        if (!isValidPatp(tuneToText) || tuneToText == radio.our) { return; };

        setTuneToText('');
        navigate('/station/' + tuneToText);
    }

    const handleSuggestionClick = (x) => {
        setIsFocused(false);
        setTuneToText(x);
    }

    return (
        <div
            className={`relative items-center flex w-full 	h-8  `}
        >
            < input
                id={searchStationInputId}
                type="text"
                className={`   relative whitespace-nowrap	w-full h-full rounded-md  font-bold
               text-black-80 placeholder-black-60    focus:outline-none slow-animation
             ${isFocused ? 'bg-orange-input-focused  border-2 shadow ' : 'bg-orange-input border'}
             ${(isValidPatp(tuneToText) && tuneToText != radio.our) ? '  pl-7 border-orange ' : '  pl-2 border-orange-disabled '}
             `}
                style={{
                    paddingRight: '5rem',
                }}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                placeholder={isPhone() ? 'e.g. ~zod' : "e.g. ~sampel-palnet"}
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        handleTuneToSubmit();
                    }
                }}
                value={tuneToText}
                onChange={
                    handleInputTextChange

                }
            />
            {isValidPatp(tuneToText) && tuneToText != radio.our &&
                <span opacity-50
                    className={`absolute ml-2 mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       bg-background-icon
                                       `}
                >
                    <Sigil patp={tuneToText} size={0.75} />
                </span>
            }
            < button
                className={`absolute right-0  rounded-md  h-full  flex  
            justify-center items-center whitespace-nowrap px-1 font-bold z-10 text-text-button 
            ${(isValidPatp(tuneToText) && tuneToText != radio.our) ? 'bg-orange hover:shadow' : 'bg-orange-disabled cursor-default text-opacity-disabled'}
            `}
                style={{
                    width: isPhone() ? '4rem' : '4.7rem',
                }}
                onClick={() =>
                    handleTuneToSubmit()
                }
            >
                {!isPhone() && <MusicNotes weight="bold" className="mr-0.5 text-lg" />}
                Tune In
            </ button>
            {
                tuneToText.trim().length > 0 && queriedTowers.length > 0 && !isValidPatp(tuneToText) && isFocused && !isPhone() &&
                <div
                    id={suggestionsId}
                    className={`absolute border  z-10 shadow-lg rounded-md 
            w-full top-8 flex flex-col py-2 overflow-y-auto mt-1
            border-border-default  bg-background-default text-text-default

            `}
                    style={{
                        minHeight: '2rem',
                        maxHeight: '6rem',
                    }}
                >
                    {
                        queriedTowers.map((x: IMinitower) =>
                            <div
                                className={`w-full flex justify-between h
                                 cursor-pointer  px-2 py-1.5 hover:bg-hover-default
                                 `}
                                onClick={
                                    () =>
                                        handleSuggestionClick(x.location)
                                }
                            >
                                <div className="flex items-center font-bold">
                                    <span
                                        className={`mr-1.5 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       bg-background-icon
                                       `}
                                        style={{ minWidth: '1rem' }}
                                    >
                                        {x.location.length <= 14 && isValidPatp(x.location) &&
                                            <Sigil patp={x.location} size={0.75} />
                                        }
                                    </span>
                                    <div
                                        style={{
                                            maxWidth: '5.7rem',
                                            lineHeight: '0.583rem',
                                        }} >
                                        {x.location}
                                    </div>
                                    <IsPublicBadge isPublic={x.public} />
                                </div>
                                <div className="flex gap-1 items-center  ml-1">
                                    <span className="flex items-center font-bold text-sm "
                                    >
                                        <Users
                                            weight="bold"
                                            className="mr-0.5 text-lg"
                                            style={{
                                                marginBottom: '0.04rem',
                                            }}
                                        />
                                        {x.viewers}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
}