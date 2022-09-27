/-  store=radio
/+  radio
/+  default-agent, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  tune=(unit ship)
  ==
+$  card     card:agent:gall
--
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
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  :: ~&  >  [%on-arvo %tower wire]
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  =.  tune
  [~ ~bep]  :: DEFAULT PROVIDER
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==  
++  on-agent
  |=  [=wire =sign:agent:gall]
  :: ~&  >  [%on-agent %tenna wire sign]

  ^-  (quip card _this)
  ?.  ?&  =(/radio-listen wire)
          ?=(%fact -.sign)
          =(%radio-action p.cage.sign)
          =(src.bowl (need tune.state))
      ==
    :: ~&  >  [%on-agent %tenna %b]
    (on-agent:def wire sign)
  :: ~&  >  [%on-agent %tenna %c]
  :_  this
  :~
    :: fwd to client (frontend) subscription
    (fact:io cage.sign ~[/radio-listen/client])
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %radio-action
    ?.  =(src.bowl our.bowl)
      `this
    =/  act  !<(action:store vase)
    :: ~&  >>  [%on-poke-tenna -.act]
    ?-  -.act
      :: ::
          %power  `this
      :: ::
          %spin   :_  this  (fwd act)
          %talk   :_  this  (fwd act)
          %view   :_  this  (fwd act)
          %chat   :_  this  (fwd act)
      :: ::
      :: ::
      :: ::
          %tune
      =/  wire  /radio-listen
      =/  leave-cards=(list card)
        ?~  tune  ~
        :~
        [%pass wire %agent [u.tune %tower] %leave ~]
        ==
      =.  tune.state
          [~ tune.act]
      =/  cards=(list card)
        :: ~&  >  [%tenna-watching-tower tune.act]
        :~
          [%pass wire %agent [tune.act %tower] %watch wire]
        ==
      :_  this
      ?~  leave-cards
        cards
      (weld leave-cards cards)
    ==
  ==
++  on-watch
  |=  =path
  :: ~&  >  [%on-watch %tenna path]
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%radio-listen %client ~]
    `this
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  test  0
++  fwd
  |=  [act=action:store]
  :~
    %+  poke:pass:agentio
      [(need tune.state) %tower]
      :-  %radio-action
      !>  act
  ==
-- 

