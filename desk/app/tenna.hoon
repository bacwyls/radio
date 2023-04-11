/-  store=radio
/+  radio, vita-client
/+  default-agent, dbug, verb, agentio
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
=|  state-0
=*  state  -
^-  agent:gall
%+  verb  |
%-  agent:dbug
%-  %-  agent:vita-client
      [& ~nodmyn-dosrux]
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
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  `this
++  on-save
  ^-  vase
  !>(state)
++  on-init
  ^-  (quip card _this)
  :: =.  tune
  :: [~ our.bowl]  :: DEFAULT PROVIDER
  `this
++  on-leave
  |=  [=path]
  :: ~&  >>>  [%tenna %on-leave src.bowl]
  `this
  ::
  ::  actually... this breaks everything
  ::
  :: :_  this
  :: ::
  :: :: this is another layer of protection to clear out stale viewers
  :: :: poke yourself to tune out
  :: :~
  ::   %+  poke:pass:agentio
  ::     [our.bowl %tenna]
  ::     :-  %radio-action
  ::     !>  [%tune ~]
  :: ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  :: ~&  >>  [%on-agent %tenna wire -.sign]
  ?~  tune.state  `this
  ?.  =(src.bowl (need tune.state))
    `this
  :: ?+    wire  (on-agent:def wire sign)
  ::   [%expected %wire ~]
    ?+    -.sign  (on-agent:def wire sign)
        %watch-ack
      =.  wack  &
      `this
        %kick
      ?.  =(wire global)
        `this
      :_  this
      :~
      (poke-self:pass:io tuneout)
      ==
        %fact
      ?+    p.cage.sign  (on-agent:def wire sign)
          %radio-action
        :_  this
        :~
          :: fwd to client (frontend) subscription
          (fact:io cage.sign ~[/frontend])
        ==
      ==
    :: ==
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
          %online   `this
          %public   `this
          %viewers  `this  :: TODO ugly
          %chatlog  `this  :: TODO ugly
      :: ::
          %presence
                  :_  this  (fwd act)
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
      ::
      =/  watt
        (watch new-tune)
      =/  love
        (leave old-tune)
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
    :_  this
    :~  (active:vita-client bowl)
    ==
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
  ?~  new-tune
    :~
      (fact:agentio tuneout ~[/frontend])
    ==
  :~
  [%pass global %agent [u.new-tune provider] %watch global]
  [%pass personal %agent [u.new-tune provider] %watch personal]
  ==
++  fwd
  |=  [act=action:store]
  ?~  tune.state  ~
  :~
    %+  poke:pass:agentio
      [(need tune.state) provider]
      :-  %radio-action
      !>  act
  ==
++  tuneout
  radio-action+!>([%tune ~])
-- 

