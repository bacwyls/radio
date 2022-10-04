/-  store=radio
/+  radio
/+  default-agent, dbug, agentio
=,  format
:: ::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:
  %0
  tune=(unit ship)
  wack=_|
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
++  on-load  on-load:def
++  on-agent
  |=  [=wire =sign:agent:gall]
  :: TODO secure? retarded?
  ^-  (quip card _this)
  ?:  ?&  =(%watch-ack -.sign)
      ==
    =.  wack  &
    `this
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
    :: ~&  >  [%tenna %on-poke act]
    ?-  -.act
      :: ::
          %online  `this
          %public  `this
          %viewers  `this  :: TODO ugly
      :: ::
          %spin   :_  this  (fwd act)
          %talk   :_  this  (fwd act)
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
      :: ?:  =(old-tune new-tune)
      ::   `this
     :: 
     :: dont love if not wack
     :: dont leave if never got the watch ack
     ::  handles alien and unbooted providers
     ::  circumvents ames cork crash
      =.  love
          ?:  wack
            love
          ~
      ::
      =.  wack  |
      :: watch new AND/OR leave old
::      ~&  >>>  [%watt watt]
::      ~&  >>>  [%love love]
      :_  this
      (weld love watt)
    :: ::
    ==
  ==
++  on-watch
  |=  =path
  ::
  :: ~&  >  [%tenna %on-watch path]
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
  [%pass personal %agent [u.old-tune provider] %leave ~]
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

