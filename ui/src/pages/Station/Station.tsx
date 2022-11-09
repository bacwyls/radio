import React, { useEffect } from "react";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { radio } from "../../api";
import { ChatContainer } from "../../components/ChatContainer/ChatContainer/ChatContainer";
import { PlayerContainer } from "../../components/PlayerContainer/PlayerContainer";
import { isPhone, tuneTo } from "../../util";
import { isValidPatp } from 'urbit-ob'
import { selectRadioSub, setHasPublishedStation } from "../../features/station/stationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './Station.css';
import { PhoneFooter } from "../../components/Mobile/PhoneFooter/PhoneFooter";
import { isMobile, isTablet } from "react-device-detect";
import { UpperRowContainer } from "../../components/UpperRow/UpperRowContainer/UpperRowContainer";
import { selectIsChatFullScreen } from "../../features/ui/uiSlice";

const PlayerContainerMemo = React.memo(PlayerContainer);
const ChatContainerMemo = React.memo(ChatContainer);

export const Station: FC = () => {
    let { patp } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const radioSub = useAppSelector(selectRadioSub);

    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);

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
        <div className="text-xs  
                        flex flex-col"
            style={{
                backgroundColor: 'rgb(253 253 253)',
            }}
        >
            <UpperRowContainer />
            <div className="station-padding flex flex-col lg:flex-row"
            >
                <PlayerContainerMemo />
                <ChatContainerMemo />
            </div>
            {isPhone() && !isChatFullScreen && <PhoneFooter />}
        </div>
    )

}