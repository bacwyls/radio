/-  store=radio, gore=greg
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
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/XGC80iRS7tw' :: classical music
  :: spin=_'https://youtu.be/ubFq-wV3Eic' :: tv static
  spin-time=_~2022.10.3..20.40.15..7021
  :: view=_'' :: https://0x0.st/oS_V.png  :: alpha marble
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
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
++  on-leave
  |=  [=path]
  =.  viewers
    (~(del by viewers) src.bowl)
  =/  ships=(set ship)
    ~(key by viewers)
  :_  this
  (transmit [%viewers ships])
++  on-peek   on-peek:def
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
  ::
  :: annoyance: now.bowl here is wrong!
  :: =.  spin-time  now.bowl
  `this
:: ++  on-load  on-load:def
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: greg
      %greg-event
    =/  ent  !<(event:gore vase)
    ?-  -.ent
        %put
      ?.  =(src.bowl our.bowl)
        `this
      =/  tow=minitower:gore  +.ent
      :: set to latest viewer count
      =.  viewers.tow
        ~(wyt by viewers)
      :_  this
      (poke-greg [%put tow])
      :: ::
        %request
      :_  this
      (poke-greg ent)
      :: ::
        %response
      :_  this
      :~
        (fact:agentio greg-event+!>(ent) ~[/greg/local])
      ==
    ==
    ::
    :: :: radio
      %radio-action
    =/  act  !<(action:store vase)
    :: ~&  >>  [%on-poke-tower act]
    ?-  -.act
      :: ::
          %tune  `this
          %viewers  `this  :: TODO ugly
          %chatlog  `this  :: TODO ugly
      :: ::
          %public
      ?.  =(src.bowl our.bowl)
        !!
      =.  public.state
          public.act
      :_  this
      (transmit act)
      :: ::
          %online
      ?.  =(src.bowl our.bowl)
        !!
      =/  kik=(list card)
        :: going online or going offline
        :: kick everyone
        ?.  =(online.state online.act)
          :~
            (kick:io ~[/global /personal])
          ==
        ~
      =.  viewers
        ?.  =(online.state online.act)
          *(map ship time)
        viewers
      =.  chatlog
        *(list chat:store)
      =.  online.state
          online.act
      :_  this
      kik
      :: ::
          %talk
      ?.  permitted:hc
        :: permission denied
        `this
      =.  talk.act
          :: enfore maximum talk
          (crip (scag 64 (trip talk.act)))
      =.  talk.state
          talk.act
      :_  this
      (transmit act)
      :: ::
          %spin
      ?.  permitted:hc
        :: permission denied
        `this
      =.  spin.state
          url.act
      ::
      =.  spin-time.state
          time.act
      :_  this
      (transmit act)
      :: ::

          %chat
      :: ?.  permitted:hc  !!
      ?.  online  !!
      ::
      :: no spoofing
      =.  from.act  src.bowl
      =.  time.act  now.bowl
      ::
      =/  =chat:store  +.act
      =.  chatlog  [chat chatlog]
      =.  chatlog
        ?:  (gth (lent chatlog) 16)
          (snip chatlog)
        chatlog
      :_  this
      (transmit act)
      :: ::
          %presence
      :: ~&  >  %presence
      ?.  (~(has by viewers) src.bowl)
        `this
      ::
      =.  viewers
        (~(put by viewers) src.bowl now.bowl)
      =/  stale=(list ship)
        (get-stale viewers now.bowl)
      :: ~&  >  [%got-stale stale]
      ?~  stale  `this
      =.  viewers
        (remove-viw viewers stale)
      :: ~&  >  [%del-stale viewers]
      ::
      :_  this
      :-  (transmit-card [%viewers ~(key by viewers)])
      %+  turn  stale
      |=  =ship
      (kick-only:io ship ~[/global /personal])
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  :: ~&  >  [%on-watch %tower path]
  ?.  online
    :_  this
    :: kick everyone
    :~  (kick:io ~[/global /personal])
    ==
  ?+    path
    (on-watch:def path)
      [%greg %local ~]
    ?>  =(src.bowl our.bowl)
    `this
      [%global ~]
    :: no initial updates on the group path
    `this
      [%personal ~]
    =.  viewers
      (~(put by viewers) src.bowl now.bowl)
    =/  ships
      ~(key by viewers)
    :: ~&  >  [%tower %personal viewers]
    :_  this
      :~
        (transmit-card [%viewers ships])
        (init-fact [%spin spin spin-time])
        :: (init-fact [%talk talk])
        :: (init-fact [%view view])
        (init-fact [%public public])
        (init-fact [%tune `our.bowl])
        (init-fact [%viewers ships])
        (init-fact [%chatlog (flop chatlog)])
        ::
        (kick-only:io src.bowl ~[/personal])
      ==
  ==
--
:: ::
:: :: helper core
:: ::
|_  bowl=bowl:gall
++  permitted
  ^-  ?
  ?:  =(src.bowl our.bowl)
    &
  ?&(online public)
++  init-fact
  |=  act=action:store
  (fact:agentio radio-action+!>(act) ~[/personal])
++  transmit-card
  |=  act=action:store
  (fact:agentio radio-action+!>(act) ~[/global])
++  transmit
  |=  act=action:store
  :: ~&  >>>  [%tower-transmitting act]
  :~
    (fact:agentio radio-action+!>(act) ~[/global])
  ==
++  stale-timeout  ~m6
++  get-stale
  |=  [viw=(map ship time) now=time]
  ^-  (list ship)
  =/  vil
    ~(tap by viw)
  |-
  ?~  vil  ~
  ?:  (lth q.i.vil `@da`(sub now stale-timeout))
    :-  p.i.vil
    $(vil t.vil)
  $(vil t.vil)
++  remove-viw
  |=  [viw=(map ship time) stale=(list ship)]
  ^-  (map ship time)
  =.  viw
  |-
  ?~  stale  viw
    =.  viw
    (~(del by viw) i.stale)
    $(stale t.stale)
  viw
::
:: greg stuff
++  greg-ship  ~bep  :: TODO change to ~nodmyn-dosrux
++  poke-greg
  |=  [ent=event:gore]
  :~
    %+  poke:pass:agentio
      [greg-ship %greg]
      :-  %greg-event
      !>  ent
  ==
-- 
