/-  store=greg, rore=radio
/+  greg, rib=radio
/+  default-agent, dbug, verb, agentio
=,  format
:: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  minitowers=(map ship minitower:store)
  banned=(set ship)
  ==
+$  card     card:agent:gall
--
%+  verb  &
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    hc    ~(. +> bowl)
    io    ~(. agentio bowl)
::
++  on-fail   on-fail:def
++  on-peek   on-peek:def
++  on-leave  on-leave:def
++  on-watch  on-watch:def
++  on-agent  on-agent:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  :: ::
  `this(state old)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    `this
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: greg-event
      %greg-event
      :: `this
    =/  ent  !<(event:store vase)
    ?-  -.ent
      :: ::
          %response  `this
      :: ::
          %remove
      ?.  ?|  =(src.bowl our.bowl)
              =(src.bowl ship.ent)
          ==
        :: must either be admin or
        :: removing self
        `this
      =.  minitowers
        (remove minitowers [ship.ent ~])
      `this
      :: ::
          %put
      =/  tow=minitower:store  +.ent
      ::
      :: no comets
      ?:  =(%pawn (clan:title src.bowl))
        `this
      ::
      :: no 0 viewer B.S.
      :: ?:  =(0 viewers.tow)
      ::   `this
      ::
      =.  description.tow
        ::  truncate description
        %-  crip
        %+  scag
          max-description
          (trip description.tow)
      ::
      :: set true time and location
      =.  location.tow  src.bowl
      =.  time.tow  now.bowl
      ::
      :: truncate viewers
      ::   no silly numbers.
      :: if you have more than 256 viewers im gonna find you and
      =.  viewers.tow
        ?:  (gth viewers.tow max-viewers)
          max-viewers
        viewers.tow
      ::
      :: actually put
      =.  minitowers
        (~(put by minitowers) src.bowl tow)
      `this
      :: ::
          %request
      :: filter out crud
      ::  so we only keep a max of 64
      ::  and its the 64 most recent
      =/  too-old=(list ship)
        (get-too-old:hc minitowers)
      :: remove a list of ships from the map
      =.  minitowers
        (remove minitowers too-old)
      :: form the output
      =/  ent=event:store  [%response minitowers]
      :_  this
      (poke-tower src.bowl ent)
    ==
    ::
    :: :: radio admin
    :: banning stuff
      %radio-admin
    ?.  =(src.bowl our.bowl)
      :: only admin
      `this
    =/  adi  !<(admin:rore vase)
    ?:  =(src.bowl ship.adi)
      :: dont ban yourself lol
      `this
    =.  banned
      (set-banned:rib adi banned)
    ::
    =.  minitowers
      (~(del by minitowers) ship.adi)
    `this
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  max-description    64
++  max-viewers       256
++  max-towers         64
++  timeout           ~m6  :: this is relatively more than the onInterval in the frontend
++  poke-tower
  |=  [src=ship ent=event:store]
  :~
    %+  poke:pass:agentio
      [src %tower]
      :-  %greg-event
      !>  ent
  ==
::
:: too-old: oldest stations exceeding maximum number of stations
++  get-too-old
  |=  [tows=(map ship minitower:store)]
  ^-  (list ship)
  =/  vows=(list minitower:store)
    ~(val by tows)
  ::
  ?:  (lte (lent vows) max-towers)  ~
  :: sort by time
  =.  vows
    %+  sort  vows
    minitower-time-gte
  =.  vows
    (scag max-towers vows)
  |-
    ?~  vows  ~
    :-  location.i.vows
    $(vows t.vows)
++  minitower-time-gte
  |=  [a=minitower:store b=minitower:store]
  %+  gte
  time.a  time.b
++  remove
  |=  [tows=(map ship minitower:store) stale=(list ship)]
  ^-  (map ship minitower:store)
  =.  tows
  |-
  ?~  stale  tows
    =.  tows
    (~(del by tows) i.stale)
    $(stale t.stale)
  tows
-- 

