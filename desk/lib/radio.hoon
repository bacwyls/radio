/-  sur=radio
=<  [sur .]
=,  sur
|%
++  agent     %tenna
++  provider  %tower
::
++  is-banned
  |=  [=bowl:gall banned=(set ship)]
  ^-  ?
  :: if a ship is banned, so are its kids
  ?|  (~(has in banned) src.bowl)
    ::
    %-  ~(has in banned)
    %-  sein:title
    :-  our.bowl
    :-  now.bowl
    src.bowl
  ==
++  set-banned
  |=  [adi=admin banned=(set ship)]
  ?-  -.adi
      %ban
    (~(put in banned) ship.adi)
      %unban
    (~(del in banned) ship.adi)
  ==
::
++  enjs
  =,  enjs:format
  |%
  ++  admin
    |=  adi=^admin
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.adi
    ?-  -.adi
    %ban
      [%s (scot %p ship.adi)]
    %unban
      [%s (scot %p ship.adi)]
    ==
  ++  action
    |=  act=^action
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.act
    |^
      ?+  -.act  !!
      %chat
        (en-chat +.act)
      %chatlog
        :-  %a
        %+  turn  chatlog.act
        |=  =chat
        (en-chat chat)
      %viewers
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
      %permissions
        [%s p.act]
      %description
        [%s description.act]
      :: %initialize
      ::   %-  pairs
      ::   :~
      ::     ['is-online' %b is-online.f.act]
      ::     ['permissions' %s permissions.f.act]
      ::     ['talk' %s talk.f.act]
      ::     :-  'spin'
      ::       %-  pairs
      ::       :~
      ::       ['url' %s url.spin.f.act]
      ::       ['time' (sect start-time.spin.f.act)]
      ::       ==
      ::     ['description' %s description.f.act]
      ::     ['viewers' (set-ship ~(key by viewers.f.act))]
      ::     ['banned' (set-ship banned.f.act)]
      ::     ['promoted' (set-ship promoted.f.act)]
      ::     :-  'chatlog'
      ::       :-  %a
      ::       %+  turn  (flop chatlog.f.act)
      ::       |=  =chat
      ::       (en-chat chat)
      ::     ==
      ==
    :: |^
    ++  en-chat
      |=  [=chat]
      ^-  json
      %-  pairs:enjs
      :~
      ['message' %s message.chat]
      ['from' %s (scot %p from.chat)]
      ['time' (sect:enjs time.chat)]
      ==
    --
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
  ++  patp
    (su ;~(pfix sig fed:ag))
  ++  admin
    |=  jon=json
    ^-  ^admin
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~
        [%ban patp]
        [%unban patp]
      ==
    --
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
        [%permissions de-permissions]
        [%presence ul]
        [%description so]
        :: [%initialize ul]
      ==
    ++  de-permissions
      |=  =json
      ^-  permissions
      ?>  ?=(%s -.json)
      ?:  =('open' p.json)
        %open
      ?:  =('closed' p.json)
        %closed
      !!
    ++  chat
      %-  ot
      :~  
          [%message so]
          [%from patp]
          [%time di]
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