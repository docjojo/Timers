# Timers

[https://github.com/docjojo/_timers/](https://github.com/docjojo/_timers/)

Timers javascript library to list all timers (timeouts/intervals) (c) 2023 by Chris Ahrweiler

## Version
Timers v1.0b | 231115
Timers v1.01b | 231115 | Renamed from _timers to Timers and turned into function

## usage

Place the script in your head tag 

```
<head>
  <script src="./timers.min.js"></script>
</head>
```

This will replace the build in functions window.setTimeout and windows.setInterval with new functions of the same name.
There is no need to change code to timers, so ```setTimeout(()=> { console.log('test'; })``` stays the same, but now, _timers keeps track of those calls.

Call ```Timers.list()``` in your script or the browser console to show a table of all timers registered since the start of your code.
Timers has a build in auto-cleanup function for outdated and cleared timers.

Optional:
Call ```Timers.listInterval(delay)``` to set interval with delay in milliseconds on calling ```Timers.list()```.
Example ```const timersTest = Timers.listInterval(30000);```

END
