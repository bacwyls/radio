import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Radio } from '../lib';
import { handleUserInput } from '../util';
import { ChatBox } from './ChatBox';
import { selectSpinUrl, selectSpinTime } from '../features/station/stationSlice';
import { setPlayerInSync } from '../features/ui/uiSlice';

interface IChatColumn {
  our: string;
  radio: Radio;
  tuneTo: ((patp: string|null) => void);
  inputReference: React.RefObject<HTMLInputElement>;
}

export const ChatColumn: FC<IChatColumn> = (props: IChatColumn) => {

  const {our, radio, tuneTo, inputReference} = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const dispatch = useAppDispatch();

  const chatInputId ='radio-chat-input';

  return(
    <div
      className="flex-1 flex-col flex"
      style={{ maxWidth:'33%' }}
    >
      <ChatBox/>
      <div>
        <hr/>
        <div className="flex">
          <input type="text"
            ref={inputReference}
            className="hover:pointer px-4 py-2 inline-block \
                      flex-1 outline-none border-none placeholder-gray-800 "
            autoCorrect={'off'}
            autoCapitalize={'off'}
            autoComplete={'off'}
            // autoFocus={false}
            placeholder="write your message..."
            id={chatInputId}
            onKeyDown={(e: any) => {
              if (e.key == 'Enter'){
                handleUserInput(
                  radio,
                  tuneTo,
                  dispatch,
                  chatInputId,
                  spinTime,
                  spinUrl,
                  our
                );
              }
            }}
          />
          <button 
            className="hover:pointer px-4 py-2\
                      flex-initial ml-2 outline-none border-none"
            style={{ backdropFilter: 'blur(32px)' }}
            onClick={() => 
              handleUserInput(
                radio,
                tuneTo,
                dispatch,
                chatInputId,
                spinTime,
                spinUrl,
                our
              )
            }
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}