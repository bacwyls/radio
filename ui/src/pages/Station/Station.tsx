import React, { useEffect, useRef } from "react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { radio } from "../../api";
import { ChatContainer } from "../../components/ChatContainer/ChatContainer/ChatContainer";
import { PlayerContainer } from "../../components/PlayerContainer/PlayerContainer";
import { isPhone } from "../../util";
import { selectDescription, selectHasPublishedStation, selectIsPublic, selectTunePatP } from "../../features/station/stationSlice";
import { useAppSelector } from "../../app/hooks";
import { PhoneFooter } from "../../components/Mobile/PhoneFooter/PhoneFooter";
import { UpperRowContainer } from "../../components/UpperRow/UpperRowContainer/UpperRowContainer";
import { selectIsChatFullScreen, selectIsLandscape, selectIsViewersMenuOpen } from "../../features/ui/uiSlice";
import { Connecting } from "../../components/Connecting/Connecting";
import './style.css';

const PlayerContainerMemo = React.memo(PlayerContainer);
const ChatContainerMemo = React.memo(ChatContainer);

export const Station: FC = () => {
    let { patp } = useParams();

    const tunePatP = useAppSelector(selectTunePatP);
    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const isLandscape = useAppSelector(selectIsLandscape);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);
    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const isPublic = useAppSelector(selectIsPublic);
    const description = useAppSelector(selectDescription);

    const gregInterval = useRef<NodeJS.Timer>();

    useEffect(() => {

        const pingInterval = setInterval(() => {
            // heartbeat to detect presence
            radio.ping();

        }, 1000 * 60 * 2)

        return () => {
            clearInterval(pingInterval)
            if (gregInterval.current)
                clearInterval(gregInterval.current)
        }

    }, []);

    useEffect(() => {
        if (gregInterval.current) {
            clearInterval(gregInterval.current);
            gregInterval.current = undefined;
        }

        if (hasPublishedStation) {
            radio.gregPut(description, isPublic);

            gregInterval.current =
                setInterval(() => {
                    radio.gregPut(description, isPublic);
                }, 1000 * 60 * 2)
        }

    }, [hasPublishedStation, description]);

    return (
        <div className='station-container'>
            <div className={`
                 ${isPhone() ? 'upperow-player-phone' : 'upperow-player'}
            `}
            >
                <UpperRowContainer />
                <PlayerContainerMemo />
            </div>
            {(!isLandscape || !isPhone()) && <ChatContainerMemo />}
            {patp && patp != tunePatP && < Connecting />}
            {isPhone() && (!isChatFullScreen || isViewersMenuOpen) && <PhoneFooter />}
        </div >
    )

}