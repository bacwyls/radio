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
