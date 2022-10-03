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
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  =.  tune
  [~ our.bowl]  :: DEFAULT PROVIDER
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
  :: TODO secure? retarded?
  ^-  (quip card _this)
  ?.  ?&  ?=(%fact -.sign)
          =(%radio-action p.cage.sign)
          =(src.bowl (need tune.state))
      ==
    (on-agent:def wire sign)
  :_  this
  :~
    :: fwd to client (frontend) subscription
    (fact:io cage.sign ~[/frontend])
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
    ?-  -.act
      :: ::
          %online  `this
          %public  `this
      :: ::
          %spin   :_  this  (fwd act)
          %talk   :_  this  (fwd act)
          %view   :_  this  (fwd act)
          %chat   :_  this  (fwd act)
      :: ::
      :: ::
      :: ::
          %tune
      :: leave the old, watch the new
      :: (or dont leave =(old ~))
      :: (or dont watch =(old new))
      :: (or just leave =(new ~))
      =*  new-tune  tune.act
      =/  old-tune  tune
      ::
      =.  tune  new-tune
      ::
      =/  watt
        (watch new-tune)
      =/  love
        (leave old-tune)
      ::
      ::
      :_  this
      ?:  =(old-tune new-tune)
        ~
      :: watch new AND/OR leave old
      (weld love watt)
    :: ::
    ==
  ==
++  on-watch
  |=  =path
  ::
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%frontend ~]
    `this
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  provider  %tower
++  personal
  [%personal ~]
++  global
  [%global ~]
++  leave
  |=  old-tune=(unit ship)
  ^-  (list card)
  ?~  old-tune  ~
  :~
  [%pass global %agent [u.old-tune provider] %leave ~]
  ==
++  watch
  |=  new-tune=(unit ship)
  ^-  (list card)
  ?~  new-tune  ~
  :~
  [%pass personal %agent [u.new-tune provider] %watch personal]
  [%pass global %agent [u.new-tune provider] %watch global]
  ==
++  fwd
  |=  [act=action:store]
  :~
    %+  poke:pass:agentio
      [(need tune.state) provider]
      :-  %radio-action
      !>  act
  ==
-- 

