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
++  on-load   on-load:def
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
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    :: ~&  >>>  [%greg %poke-from-banned src.bowl]
    `this
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: greg-event
      %greg-event
      :: `this
    =/  ent  !<(event:store vase)
    :: ~&  >  [%greg %poke ent]
    ?-  -.ent
      :: ::
          %response  `this
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
      ::  and its the 64 with the most viewers
      ::   this may be over engineered,
      ::   but it should be relatively future proof
      =/  stale=(list ship)
        (get-stale minitowers now.bowl)
      =/  nerds=(list ship)
        (get-nerds minitowers)
      ::
      :: union stale nerds
      =/  crud=(list ship)
        =|  crums=(set ship)
        =.  crums
          %-  ~(gas in crums)
          (weld stale nerds)
        ~(tap in crums)
      ::
      :: remove a list of ships from the map
      =.  minitowers
        (remove minitowers crud)
      ::
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
++  timeout           ~m6  :: TODO pick a thoughtful time depending on put frequency
++  poke-tower
  |=  [src=ship ent=event:store]
  :~
    %+  poke:pass:agentio
      [src %tower]
      :-  %greg-event
      !>  ent
  ==
::
++  get-nerds
  |=  [tows=(map ship minitower:store)]
  ^-  (list ship)
  ::
  =*  max-tows  64
  ::
  :: bad DoS problem running a sort every request...
  :: this is what bans are for
  =/  vows=(list minitower:store)
    ~(val by tows)
  ::
  ?:  (lte (lent vows) max-tows)  ~
  :: sort by viewers
  =.  vows
    %+  sort  vows
    minitower-gte
  :: get all the biggest nerds
  ::  nerd: anyone past max-length because they dont have enough viewers
  =.  vows
    (slag max-tows vows)
  ::
  :: convert to list ship
  |-
  ?~  vows  ~
  :-  location.i.vows
  $(vows t.vows)
++  get-stale
  |=  [tows=(map ship minitower:store) now=time]
  ^-  (list ship)
  ::
  =/  vows=(list minitower:store)
    ~(val by tows)
  ::
  ?:  =(0 (lent vows))  ~
  ::
  :: filter out anything too old
  |-
  ?~  vows  ~
  ?:  (lth time.i.vows `@da`(sub now timeout))
    :-  location.i.vows
    $(vows t.vows)
  $(vows t.vows)
++  minitower-gte
  |=  [a=minitower:store b=minitower:store]
  :: is a > b?
  %+  gte
  viewers.a  viewers.b
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

