|%
::
:: ::
+$  minitower
  $:
  description=cord
  location=ship
  time=@da
  viewers=@ud
  ==
::
+$  event
  $%
    [%put =minitower]
    [%remove =ship]
    [%request ~]
    [%response minitowers=(map ship minitower)]
  ==
--
