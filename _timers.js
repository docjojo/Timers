//
// https://github.com/docjojo/_timers/
// _timers v1.0b | 231115
// _timers javascript library to list all timers (timeouts/intervals) (c) 2023 by Chris Ahrweiler
// this will replace the build in  window.setTimeout/windows.setInterval functions to keep track of all calls
//

let _originalSetTimeout = window.setTimeout, _originalClearTimeout = window.clearTimeout;
let _originalSetInterval = window.setInterval, _originalClearInterval = window.clearInterval;
let timersArray=[]; const timersStartApp=(new Date()).getTime();

function _timerListInterval(delay) { return setInterval(() => { _timersList(); }, delay); }
function _timersNow() { return (new Date()).getTime()-timersStartApp; }
function _timersRemove(id) { timersArray.forEach((t) => { if (t.id===id) { t.del=true; return; } }); }
function _timersAdd(tmp,type,args) { const now=_timersNow(); timersArray[tmp.id]={type:type,id:tmp.id,delay:args[1],func:args[0].name?args[0].name:args[0].toString(),start:now,stop:now+args[1],active:''}; }

window.clearTimeout = function(id) { _timersRemove(id.id); _originalClearTimeout(id); }
window.setTimeout = function() { let tmp={ id: _originalSetTimeout.apply(null, arguments) }; _timersAdd(tmp,'timeout',arguments); return tmp; }
window.clearInterval = function(id) { _timersRemove(id.id); _originalClearInterval(id); }
window.setInterval = function() { let tmp={ id: _originalSetInterval.apply(null, arguments) }; _timersAdd(tmp,'interval',arguments); return tmp; }

function _timersList()
{
  const now=_timersNow(), len=timersArray.length; const clock='🕓 ';
  console.log('timersList (_timers.js) | Now: '+now);
  for (i=0;i<len;i++) { if (timersArray[i]===undefined || timersArray[i].delay===undefined || timersArray[i].del) timersArray.splice(i, 1); } 
  let diff;
  timersArray.forEach((t) => 
  { 
    diff=Math.abs(now-t.stop);
    if (t.type==="timeout") 
    {
      if (now>t.stop) { _timersRemove(t.id); t.active='❌'; }
      else t.active=clock+Math.abs(diff);
    }
    else t.active=clock+(diff % t.delay)+' | ↺ '+Math.ceil(diff/t.delay);
  })
  console.table(timersArray);
}
