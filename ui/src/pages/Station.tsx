import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { radio } from "../api";
import { ChatContainer } from "../components/ChatContainer/ChatContainer";
import { PlayerContainer } from "../components/PlayerContainer/PlayerContainer";
import { UpperRow } from "../components/UpperRow/UpperRow";
import { tuneTo } from "../util";
import { isValidPatp } from 'urbit-ob'
import { selectRadioSub } from "../features/station/stationSlice";
import { useAppSelector } from "../app/hooks";

export const Station: FC = () => {
    let { patp } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const radioSub = useAppSelector(selectRadioSub);

    useEffect(() => {
        if (!radioSub) return;

        if (patp && isValidPatp(patp)) {
            tuneTo(patp, radio, dispatch);
        }

        else {
            navigate('/');
            tuneTo(null, radio, dispatch);
        }
    }, [patp, radioSub]);

    return (
        <div className="px-2 md:px-10 text-xs font-mono 
                        flex flex-col h-screen"
            style={{ backgroundColor: 'rgb(253 253 253)' }}
        >
            <UpperRow />
            <div className="flex flex-col lg:flex-row"
                style={{ height: '78vh', maxHeight: '78vh' }}>
                <PlayerContainer />
                <ChatContainer
                // inputReference={inputReference}
                />
            </div>
        </div>
    )

}