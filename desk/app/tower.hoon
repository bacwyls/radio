/-  store=radio, gore=greg
/+  rib=radio
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
  ::
  ::  set to a time near the present
  ::  *time is too long ago and causes
  ::  -the frontend syncing to bug out
  spin-time=_~2022.10.3..20.40.15..7021
  :: view=_'' :: https://0x0.st/oS_V.png  :: alpha marble texture
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
  banned=(set ship)
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
++  on-peek   on-peek:def
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.sign  (on-agent:def wire sign)
      :: had a really bad bug related to this
      :: arvo pot hole?
    %poke-ack
    :: ~&  >  [%tower %poke-ack sign]
    `this
  ==
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
++  on-load  on-load:def
:: ++  on-load
::   |=  old-state=vase
::   ^-  (quip card _this)
::   =/  old  !<(versioned-state old-state)
::   ?-  -.old
::     %0  `this(state old)
::   ==
++  on-leave
  |=  [=path]
  =.  viewers
    (~(del by viewers) src.bowl)
  =/  ships=(set ship)
    ~(key by viewers)
  :_  this
  (transmit [%viewers ships])
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  :: ~&  >>  [%tower %poke src.bowl]
  ?:  (is-banned:rib bowl banned)
    :: ~&  >>>  [%tower %poke-from-banned src.bowl]
    `this
  ?+  mark  (on-poke:def mark vase)
      %noun
    `this
    ::
    :: :: radio
      %radio-action
    =/  act  !<(action:store vase)
    :: ~&  >>  [%on-poke-tower act]
    ?-  -.act
      :: ::
          %tune     `this
          %viewers  `this
          %chatlog  `this
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
      ?~  stale  `this
      =.  viewers
        (remove-viw viewers stale)
      ::
      :_  this
      :-  (transmit-card [%viewers ~(key by viewers)])
      %+  turn  stale
      |=  =ship
      (kick-only:io ship ~[/global /personal])
    ==
    ::
    :: :: greg
      %greg-event
    =/  ent  !<(event:gore vase)
    :: ~&  >  [%tower %greg %event ent]
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
      :: assert that its from greg
      ?.  =(src.bowl greg-ship)
        :: ~&  >>>  [%tower %evil %greg %from src.bowl]
        `this
      :: ~&  >>>  [%tower %good %greg %from src.bowl ent]
      :_  this
      :~
        (fact:agentio greg-event+!>(ent) ~[/greg/local])
      ==
    ==
    ::
    :: :: radio admin
    :: banning stuff
      %radio-admin
    ?.  =(src.bowl our.bowl)
      :: only admin
      `this
    ::
    =/  adi  !<(admin:rib vase)
    ?:  =(src.bowl ship.adi)
      :: dont ban yourself lol
      `this
    =.  banned
      (set-banned:rib adi banned)
    :_  this
    :~
      (kick-only:io ship.adi ~[/personal /global])
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    :: ~&  >>>  [%tower %watch-from-banned src.bowl]
    `this
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
        ::
        :: TODO
        ::  during active use, its nice to send this data one bit at a time
        ::  but for the initial state load, it would be better to send
        ::  everything in a single fact
        ::   ::
        ::  unfortunately, this would require a refactor
        ::  or at least junk up the code in some way
        ::  i think there is much room for improvement, and a refactor for this purpose
        ::  will be in order soon
        ::
        (init-fact [%spin spin spin-time])
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
    & :: admin
  ::
  ?.  online
    | :: tower must be online
  ::
  ?.  (~(has by viewers) src.bowl)
    | :: src must be in viewers
  ::
  :: dj permissions
  public
::
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
::
:: presence heartbeat stuff
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
++  greg-ship  ~littel-bacwyl-samweg
++  poke-greg
  |=  [ent=event:gore]
  :~
    %+  poke:pass:agentio
      [greg-ship %greg]
      :-  %greg-event
      !>  ent
  ==
-- 
