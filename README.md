# _timers

[https://github.com/docjojo/_timers/](https://github.com/docjojo/_timers/)

_timers javascript library to list all timers (timeouts/intervals) (c) 2023 by Chris Ahrweiler

## usage

Place the script in your head tag 

```
<head>
  <script src="./_timers.js"></script>
</head>
```

This will replace the build in functions window.setTimeout and windows.setInterval with new functions of the same name.
There is no need to change code to timers, so ```setTimeout(()=> { console.log('test'; })``` stays the same, but now, _timers keeps track of those calls.

Call ```_timersList()``` in your script or the browser console to show a table of all timers registered since the start of your code.
_timers has a build in auto-cleanup function for outdated and cleared timers.

Optional:
Call ```_timersListInterval(delay)``` to set interval with delay in milliseconds on calling ```_timersList(delay)```.
Example ```const _timersTest = _timersListInterval(30000);```

END
