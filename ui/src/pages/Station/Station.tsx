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
import { PhoneFooter } from "../../components/Mobile/PhoneFooter/PhoneFooter";
import { isMobile, isTablet } from "react-device-detect";
import { UpperRowContainer } from "../../components/UpperRow/UpperRowContainer/UpperRowContainer";
import { selectIsChatFullScreen, selectIsDarkMode } from "../../features/ui/uiSlice";
import './style.css';

const PlayerContainerMemo = React.memo(PlayerContainer);
const ChatContainerMemo = React.memo(ChatContainer);

export const Station: FC = () => {
    let { patp } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const radioSub = useAppSelector(selectRadioSub);
    const isDarkMode = useAppSelector(selectIsDarkMode);

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
        <div className={`text-xs fixed station-container
                        flex flex-col  
                        ${isDarkMode ? 'bg-default-bg-dark' : 'bg-default-bg-light'}
                        `}
            style={{
                height: '100vh',
                width: '100%',
                padding: '25px 25px 0 25px'
            }}
        >
            {/* <UpperRowContainer /> */}
            <div className=" flex flex-col lg:flex-row h-full"
            >
                <PlayerContainerMemo />
                <div className="flex flex-col "
                    style={{
                        paddingBottom: '70px',
                        width: 'calc(44vw - 75px)',
                        height: '100%',
                    }}
                >
                    <UpperRowContainer />
                    <ChatContainerMemo />
                </div>
            </div>
        </div>
    )

}