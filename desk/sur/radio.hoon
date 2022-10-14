|%
::
:: ::
+$  chat
  $:
  message=cord
  from=ship
  time=@da
  ==
::
+$  admin
  $%
    [%ban =ship]
    [%unban =ship]
  ==
::
::
:: action or event?
:: not going to rename right now,
::  but i think event makes more sence since
::  these are all used as both 'actions' and 'updates'
::
::  actions: alter agent state
::  updates: recieve agent state change
::
::  events: both.
::   perhaps doing both with one mark is not explicit enough?
::   but i think it does a lot to keep complexity down
::
+$  action
  $%
    [%tune tune=(unit @p)]
    [%talk talk=cord]
    :: [%view view=cord]
    [%spin url=cord time=@da]
    [%chat message=cord from=ship time=@da]
    [%online online=?]
    [%public public=?]
    [%viewers viewers=(set ship)]
    [%chatlog chatlog=(list chat)]
    [%presence ~]
  ==
--
