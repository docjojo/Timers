//
// https://github.com/docjojo/timers/
// Timers v1.0b | 231115
// Timers v1.01b | 231115 | Renamed from _timers to Timers and turned into function

// Timers javascript library to list all timers (timeouts/intervals) (c) 2023 by Chris Ahrweiler
// this will replace the build in  window.setTimeout/windows.setInterval functions to keep track of all calls
//

var Timers = (function()
{
  this._originalSetTimeout = window.setTimeout;
  this._originalClearTimeout = window.clearTimeout;
  this._originalSetInterval = window.setInterval;
  this._originalClearInterval = window.clearInterval;
  this.arr=[];
  this.start=(new Date()).getTime();
  
  window.clearTimeout = function() 
  { 
    if (arguments[0]===undefined) { console.log('%cTimers error: clearTimeout ID is undefined.','color: red'); return; }
    remove(arguments[0]); _originalClearTimeout(id); 
  }
  window.setTimeout = function() { let tmp={ id: _originalSetTimeout.apply(null, arguments) }; add(tmp,'timeout',arguments); return tmp; }
  window.clearInterval = function() 
  { 
    if (arguments[0]===undefined) { console.log('%cTimers error: clearInterval ID is undefined.','color: red'); return; }
    remove(arguments[0]); _originalClearInterval(arguments[0]);
  }
  window.setInterval = function() { let tmp={ id: _originalSetInterval.apply(null, arguments) }; add(tmp,'interval',arguments); return tmp; }

  function now() { return (new Date()).getTime()-this.start; }
  function remove(id) { let i=0; arr.forEach((t) => { if (t.id===id) { arr.splice(i,1); return; }; i++; }); }
  function add(tmp,type,args) 
  { 
    if (args.length<=1 || args[1]===0) { return; }
    const n=now(); 
    arr.push({type:type,id:tmp.id,delay:args[1],function:args[0].name?args[0].name:args[0].toString(),start:n,stop:n+args[1],remain:'',recycle:'·/·'});
  }
  
  return {
   listInterval : function(delay) { return setInterval(() => { Timers.list(); }, delay); },
   list : function ()
    {
      const n=now(), clock='🕓 '; 
      console.log('timers.js List | Start: 0 | Now: '+n);
      let diff;
      arr.forEach((t) => 
      { 
        diff=Math.abs(n-t.stop);
        if (t.type==="timeout") 
        {
          if (n<=t.stop) t.remain=clock+Math.abs(diff);
          else
          {
            if (n>t.stop+15000) remove(t.id);
            else t.remain='🔴';
          } 
        }
        else { t.remain=clock+(diff % t.delay); t.recycle='♻️ '+Math.ceil(diff/t.delay); }
      })
      console.table(arr,['id','type','delay','function','start','stop','remain','recycle']);
    }
 };
})();
