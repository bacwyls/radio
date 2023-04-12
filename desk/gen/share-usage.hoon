::  Tell app whether to share usage data with :vita
::
:: :myagent +mydesk!share-usage
::   enables sharing
:: :myagent +mydesk!share-usage &
::   enables sharing
:: :myagent +mydesk!share-usage |
::   disables sharing
::
:-  %say
|=  [* arg=?(~ [share=? ~]) ~]
:-  %vita-client
:-  %set-enabled
?^  arg
  share.arg
&