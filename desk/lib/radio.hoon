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
    %viewers
      :: ~&  >  [%json %vs act]
      ::
      (set-ship viewers.act)
    %tune
      (unit-ship tune.act)
    %spin
     %-  pairs
      :~
      ['url' %s url.act]
      ['time' (sect time.act)]
      ==
    %talk
      [%s talk.act]
    :: %view
    ::   [%s view.act]
    %public
      [%b public.act]
    ==
  --
++  unit-ship
    |=  who=(unit @p)
    ^-  json
    ?~  who
      ~
    [%s (scot %p u.who)]
++  set-ship
  |=  ships=(set @p)
  ^-  json
  :-  %a
  %+  turn
    ~(tap in ships)
    |=  her=@p
    [%s (scot %p her)]
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
        :: [%view so]
        [%chat chat]
        [%tune (mu patp)]
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
    ::
    --
  --
--