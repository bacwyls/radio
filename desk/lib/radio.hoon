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
     %-  pairs
      :~
      ['url' %s url.act]
      ['time' (sect time.act)]
      ==
    %talk
      [%s talk.act]
    %view
      [%s view.act]
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
        [%spin spin]
        [%view so]
        [%chat chat]
        [%tune patp]
        [%public bo]
      ==
    ++  patp
      (su ;~(pfix sig fed:ag))
    ++  chat
      %-  ot
      :~  
          [%message so]
          [%from patp]
      ==
    ++  spin
      %-  ot
      :~  
          [%url so]
          [%time di]
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