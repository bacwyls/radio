/-  store=radio, gore=greg
/+  rib=radio
/+  default-agent, verb, dbug, agentio
=,  format
::
|%
+$  versioned-state
  $%  state-0
      state-1
      state-2
  ==
+$  state-0  $:
  %0
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/XGC80iRS7tw'
  spin-time=_~2022.10.3..20.40.15..7021
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
  banned=(set ship)
  ==
+$  state-1  $:
  %1 :: nothing changed from 0, just mishandled 0 so needed a nuke. see onload
  :: tower-1:store
  talk=_'welcome to urbit radio'
  spin=_'https://youtu.be/XGC80iRS7tw' :: classical 
  :: spin=_'https://youtu.be/ubFq-wV3Eic' :: tv static
  ::
  ::  set to a time near the present
  ::  *time is too long ago and causes
  ::  the frontend syncing to bug out
  spin-time=_~2022.10.3..20.40.15..7021
  :: view=_'' :: https://0x0.st/oS_V.png  :: alpha marble texture
  online=_&
  public=_|
  viewers=(map ship time)
  chatlog=(list chat:store)
  banned=(set ship)
  ==
+$  state-2  $:
  %2
  tower-2:store
  ==
+$  card     card:agent:gall
--
%+  verb  &
%-  agent:dbug
=|  state-2
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
      ::  https://github.com/urbit/urbit/issues/6025
    %poke-ack
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
  `this
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  :: special case for state-0 because
  :: I changed the state without
  :: writing a proper on-load
  ?.  ?=(^ +.old-state)  !!
  ?:  =(%0 +<.old-state)
    :: one last hard nuke for state-0
    `this
  ::
  :: regular support for further upgrades
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0
      `this
    %1
    :: isonline
    :: permissions
    =.  talk  talk.old
    =.  url.spin  spin.old
    =.  start-time.spin  spin-time.old
    :: description
    =.  viewers   viewers.old
    =.  banned    banned.old
    :: promoted
    =.  chatlog   chatlog.old
    `this
    %2  `this(state old)
  ==
++  on-leave
  |=  [=path]
  ?:  =(path /greg/local)
    :: potentially fixes #16 host-kicked bug?
    `this
  :: ~&  >>>  ['tower on-leave' src.bowl path]
  :: so this is just unreliable as f
  :: `this
  =.  viewers
    (~(del by viewers) src.bowl)
  =/  ships=(set ship)
    ~(key by viewers)
  :_  this
  (transmit [%viewers ships])
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
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
  :: ~&  >>  [%tower %poke src.bowl act]
    :: ~&  >>  [%on-poke-tower act]
    ?-  -.act
      :: ::
          %tune        `this
          %viewers     `this
          %chatlog     `this
          :: %initialize  `this
      :: ::
          %permissions
      ::
      ?.  =(src.bowl our.bowl)
        !!
      =.  permissions
          p.act
      :_  this
      (transmit act)
      :: ::
          %online
      ?.  =(src.bowl our.bowl)
        !!
      =/  kik=(list card)
        :: going online or going offline
        :: kick everyone
        ?.  =(is-online.state online.act)
          :~
            (kick:io ~[/global /personal])
          ==
        ~
      =.  viewers
        ?.  =(is-online.state online.act)
          *(map ship time)
        viewers
      =.  chatlog
        *(list chat:store)
      =.  is-online.state
          is-online
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
      %description
      ?.  permitted:hc
        :: permission denied
        `this
      =.  description.act
          :: enfore maximum description
          (crip (scag 64 (trip description.act)))
      =.  description.state
          description.act
      :_  this
      (transmit act)
      :: ::
          %spin
      ?.  permitted:hc
        :: permission denied
        `this
      ?:  (gth (lent (trip url.act)) 999)
        :: no stupidly long urls
        `this
      =.  url.spin.state
          url.act
      ::
      =.  start-time.spin.state
          time.act
      :_  this
      (transmit act)
      :: ::

          %chat
      :: ?.  permitted:hc  !!
      ?.  is-online  !!
      ::
      :: no spoofing
      =.  from.act  src.bowl
      =.  time.act  now.bowl
      :: enforce max length
      =.  message.act
          %-  crip
          (scag 2.000 (trip message.act))
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
      :: ~&  >>>  ['kicking stale' ship]
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
      ::
      :: if you want to spoof your viewer count,
      :: you can take this =. out
      ::  but you will be banned from the discovery pool :)
      =.  viewers.tow
        ~(wyt by viewers)
      ::
      =/  maybe-transmit-description=(list card)
        ?:  =(description description.tow)
          ~
        (transmit [%description description.tow])
      =.  description
        description.tow
      :_  this
      %+  weld
        (poke-greg:hc [%put tow])
        maybe-transmit-description
      :: ::
        %remove
      :_  this
      (poke-greg:hc ent)
        %request
      :_  this
      (poke-greg:hc ent)
      :: ::
        %response
      :: assert that its from greg
      ?.  =(src.bowl greg-ship:hc)
        :: ~&  >>>  [%tower %evil %greg %from src.bowl]
        `this
      :: ~&  >>>  [%tower %good %greg %from src.bowl ent]
      :_  this
      :~
        (fact:io greg-event+!>(ent) ~[/greg/local])
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
    ?:  =(%unban -.adi)
      `this
    :: %ban
    =.  viewers
        (~(del by viewers) ship.adi)
    :_  this
    :~
      (kick-only:io ship.adi ~[/personal /global])
      (transmit-card [%viewers ~(key by viewers)])
    ==
  ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  (is-banned:rib bowl banned)
    :: ~&  >>>  [%tower %watch-from-banned src.bowl]
    :_  this
    :~  (kick-only:io src.bowl ~[/personal /global])
    ==
  ?.  is-online
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
        ::   ::
        ::   :: (later)
        ::   hmmm, I tried adding an %initialize radio-action, with the full tower state inside.
        ::   I got some very buggy behavior that I was totally unable to track down for 8 hours.
        ::      I verified that I was sending out a fact %initialize with all of the correct data,
        ::      but somehow, on the other end, some fields were bunted.
        ::      I dug a few layers deep into gall to try to find the issue, but no dice.
        ::   giving up, returning to tradition. just sending a flurry of initial facts instead of one chunk of state.
        ::   still want to fix this eventually but it will probably have to come with a near full rewrite of radio.
        ::
        (init-fact [%spin spin])
        (init-fact [%permissions permissions])
        (init-fact [%tune `our.bowl])
        (init-fact [%viewers ships])
        (init-fact [%chatlog (flop chatlog)])
        (init-fact [%description description])
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
  :: dj permissions
  ^-  ?
  ?:  =(src.bowl our.bowl)
    & :: admin
  ::
  ?.  is-online
    | :: tower must be online
  ::
  ?.  (~(has by viewers) src.bowl)
    | :: src must be in viewers
  ::
  =(permissions %open)
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
  :: ~&  >>>  ['tower removing stale viewers' stale]
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
++  greg-ship  ~nodmyn-dosrux
++  poke-greg
  |=  [ent=event:gore]
  :~
    %+  poke:pass:agentio
      [greg-ship %greg]
      :-  %greg-event
      !>  ent
  ==
-- 
