/-  sur=radio
=<  [sur .]
=,  sur
|%
++  agent     %tenna
++  provider  %tower
::
::
++  enjs
  =,  enjs:format
  |%
  ++  action
    |=  act=^action
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.act
    ?+  -.act  !!
    %chat
      %-  pairs
      :~
      ['message' %s message.act]
      ['from' %s (scot %p from.act)]
      ==
    %tune
      [%s (scot %p tune.act)]
    %spin
      [%s spin.act]
    %talk
      [%s talk.act]
    ==
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    :: *^action
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~
        [%talk so]
        [%spin so]
        [%chat chat]
        [%tune patp]
      ==
    ++  patp
      (su ;~(pfix sig fed:ag))
    ++  chat
      %-  ot
      :~  
          [%message so]
          [%from patp]
      ==
    :: ::
    :: ++  game
    ::   %-  ot
    ::   :~  [%from patp]
    ::       [%data so]
    ::   ==
    :: ++  slop
    ::   %-  ot
    ::   :~  [%to (ar patp)]
    ::       [%data so]
    ::   ==
    --
  --
--