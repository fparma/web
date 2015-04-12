!function(e){"function"==typeof define&&define.amd?define("picker",["angular"],e):this.Picker=e(angular)}(function(e){function t(e,r,i,o){function u(){return t._.node("div",t._.node("div",t._.node("div",t._.node("div",w.component.nodes(m.open),v.box),v.wrap),v.frame),v.holder)}function a(){g.data(r,w),g.addClass(v.input),g[0].value=g.attr("data-value")?w.get("select",d.format):e.value,angular.element(document.querySelectorAll("#"+m.id)).on("focus",p),angular.element(document.querySelectorAll("#"+m.id)).on("click",p),d.editable||angular.element(document.querySelectorAll("#"+m.id)).on("keydown",function(e){var t=e.keyCode,n=/^(8|46)$/.test(t);return 27==t?(w.close(),!1):void ((32==t||n||!m.open&&w.component.key[t])&&(e.preventDefault(),e.stopPropagation(),n?w.clear().close():w.open()))}),n(e,{haspopup:!0,expanded:!1,readonly:!1,owns:e.id+"_root"+(w._hidden?" "+w._hidden.id:"")})}function l(){function r(){angular.element(w.$root[0].querySelectorAll("[data-pick], [data-nav], [data-clear]")).on("click",function(){var n=angular.element(this),i=n.hasClass(v.navDisabled)||n.hasClass(v.disabled),s=document.activeElement;s=s&&(s.type||s.href)&&s,(i||s&&!w.$root[0].contains(s))&&e.focus(),n.attr("data-nav")&&!i?(w.set("highlight",w.component.item.highlight,{nav:parseInt(n.attr("data-nav"))}),r()):t._.isInteger(parseInt(n.attr("data-pick")))&&!i?(w.set("select",parseInt(n.attr("data-pick"))).close(!0),r()):n.attr("data-clear")&&(w.clear().close(!0),r())})}w.$root.on("focusin",function(e){w.$root.removeClass(v.focused),n(w.$root[0],"selected",!1),e.stopPropagation()}),w.$root.on("mousedown click",function(t){var n=t.target;n!=w.$root.children()[0]&&(t.stopPropagation(),"mousedown"==t.type&&"input"!==angular.element(n)[0].tagName&&"OPTION"!=n.nodeName&&(t.preventDefault(),e.focus()))}),r(),n(w.$root[0],"hidden",!0)}function h(){var t=["string"==typeof d.hiddenPrefix?d.hiddenPrefix:"","string"==typeof d.hiddenSuffix?d.hiddenSuffix:"_submit"];w._hidden=angular.element('<input type=hidden name="'+t[0]+e.name+t[1]+'"id="'+t[0]+e.id+t[1]+'"'+(g.attr("data-value")||e.value?' value="'+w.get("select",d.formatSubmit)+'"':"")+">")[0],g.on("change."+m.id,function(){w._hidden.value=e.value?w.get("select",d.formatSubmit):""}).after(w._hidden)}function p(e){e.stopPropagation(),"focus"==e.type&&(w.$root.addClass(v.focused),n(w.$root[0],"selected",!0)),w.open()}if(!e)return t;var d;i?(d=i.defaults,angular.extend(d,o)):d=o||{};var v=t.klasses();angular.extend(v,d.klass);var m={id:e.id||"P"+Math.abs(~~(Math.random()*new Date))},g=angular.element(e),y=function(){return this.start()},w=y.prototype={constructor:y,$node:g,start:function(){return m&&m.start?w:(m.methods={},m.start=!0,m.open=!1,m.type=e.type,e.autofocus=e==document.activeElement,e.type="text",e.readOnly=!d.editable,e.id=e.id||m.id,w.component=new i(w,d),w.$root=angular.element(t._.node("div",u(),v.picker,'id="'+e.id+'_root"')),l(),d.formatSubmit&&h(),a(),d.container?angular.element(d.container).append(w.$root):g.after(w.$root),w.on({start:w.component.onStart,render:w.component.onRender,stop:w.component.onStop,open:w.component.onOpen,close:w.component.onClose,set:w.component.onSet}).on({start:d.onStart,render:d.onRender,stop:d.onStop,open:d.onOpen,close:d.onClose,set:d.onSet}),e.autofocus&&w.open(),w.trigger("start").trigger("render"))},render:function(e){return e?w.$root.html(u()):angular.element(w.$root[0].querySelectorAll("."+v.box)).html(w.component.nodes(m.open)),w.trigger("render")},stop:function(){return m.start?(w.close(),w._hidden&&w._hidden.parentNode.removeChild(w._hidden),w.$root.remove(),g.removeClass(v.input).removeData(r),setTimeout(function(){g.off("."+m.id)},0),e.type=m.type,e.readOnly=!1,w.trigger("stop"),m.methods={},m.start=!1,w):w},open:function(r){return m.open?w:(g.addClass(v.active),n(e,"expanded",!0),w.$root.addClass(v.opened),n(w.$root[0],"hidden",!1),r!==!1&&(m.open=!0,g.triggerHandler("focus"),angular.element(document.querySelectorAll("#"+m.id)).on("click focusin",function(t){var n=t.target;n!=e&&n!=document&&3!=t.which&&w.close(n===w.$root.children()[0])}),angular.element(document.querySelectorAll("#"+m.id)).on("keydown",function(n){return;var r=n.keyCode,i=w.component.key[r],s=n.target;27==r?w.close(!0):s!=e||!i&&13!=r?w.$root[0].contains(s)&&13==r&&(n.preventDefault(),s.click()):(n.preventDefault(),i?t._.trigger(w.component.key.go,w,[t._.trigger(i)]):angular.element(w.$root[0].querySelectorAll("."+v.highlighted)).hasClass(v.disabled)||w.set("select",w.component.item.highlight).close())})),w.trigger("open"))},close:function(t){return t&&(g.off("focus."+m.id),g.triggerHandler("focus"),setTimeout(function(){angular.element(document.querySelectorAll("#"+m.id)).on("focus",p)},0)),g.removeClass(v.active),n(e,"expanded",!1),w.$root.removeClass(v.opened+" "+v.focused),n(w.$root[0],"hidden",!0),n(w.$root[0],"selected",!1),m.open?(setTimeout(function(){m.open=!1},1e3),s.off("."+m.id),w.trigger("close")):w},clear:function(){return w.set("clear")},set:function(e,t,n){var r,i,s=angular.isObject(e),o=s?e:{};if(n=s&&angular.isObject(t)?t:n||{},e){s||(o[e]=t);for(r in o)i=o[r],r in w.component.item&&w.component.set(r,i,n),("select"==r||"clear"==r)&&(g[0].value="clear"==r?"":w.get(r,d.format),g.triggerHandler("change"));w.render()}return n.muted?w:w.trigger("set",o)},get:function(n,r){return n=n||"value",null!=m[n]?m[n]:"value"==n?e.value:n in w.component.item?"string"==typeof r?t._.trigger(w.component.formats.toString,w.component,[r,w.component.get(n)]):w.component.get(n):void 0},on:function(e,t){var n,r,i=angular.isObject(e),s=i?e:{};if(e){i||(s[e]=t);for(n in s)r=s[n],m.methods[n]=m.methods[n]||[],m.methods[n].push(r)}return w},off:function(){var e,t,n=arguments;for(e=0,namesCount=n.length;namesCount>e;e+=1)t=n[e],t in m.methods&&delete m.methods[t];return w},trigger:function(e,n){var r=m.methods[e];return r&&r.map(function(e){t._.trigger(e,w,[n])}),w}};return new y}function n(e,t,n){if(angular.isObject(t))for(var i in t)r(e,i,t[i]);else r(e,t,n)}function r(e,t,n){angular.element(e).attr(("role"==t?"":"aria-")+t,n)}function i(e,t){angular.isObject(e)||(e={attribute:t}),t="";for(var n in e){var r=("role"==n?"":"aria-")+n,i=e[n];t+=null==i?"":r+'="'+e[n]+'"'}return t}var s=angular.element(document);return t.klasses=function(e){return e=e||"picker",{picker:e,opened:e+"--opened",focused:e+"--focused",input:e+"__input",active:e+"__input--active",holder:e+"__holder",frame:e+"__frame",wrap:e+"__wrap",box:e+"__box"}},t._={group:function(e){for(var n,r="",i=t._.trigger(e.min,e);i<=t._.trigger(e.max,e,[i]);i+=e.i)n=t._.trigger(e.item,e,[i]),r+=t._.node(e.node,n[0],n[1],n[2]);return r},node:function(t,n,r,i){return n?(n=e.isArray(n)?n.join(""):n,r=r?' class="'+r+'"':"",i=i?" "+i:"","<"+t+r+i+">"+n+"</"+t+">"):""},lead:function(e){return(10>e?"0":"")+e},trigger:function(e,t,n){return"function"==typeof e?e.apply(t,n||[]):e},digits:function(e){return/\d/.test(e[1])?2:1},isDate:function(e){return{}.toString.call(e).indexOf("Date")>-1&&this.isInteger(e.getDate())},isInteger:function(e){return{}.toString.call(e).indexOf("Number")>-1&&e%1===0},ariaAttr:i},t.extend=function(e,n){angular.element.prototype[e]=function(r,i){var s=this.data(e);if("picker"==r)return s;if(s&&"string"==typeof r)return t._.trigger(s[r],s,[i]),this;for(var o=0;o<this.length;o++){var u=angular.element(this[o]);u.data(e)||new t(u[0],e,n,r)}},angular.element.prototype[e].defaults=n.defaults},t});!function(e){"function"==typeof define&&define.amd?define(["picker","angular"],e):e(Picker,angular)}(function(e,t){function n(e,n){var r=this,i=e.$node[0].value,s=e.$node.attr("data-value"),o=s||i,u=s?n.formatSubmit:n.format,a=function(){return"rtl"===getComputedStyle(e.$root[0]).direction};r.settings=n,r.$node=e.$node,r.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},r.item={},r.item.disable=(n.disable||[]).slice(0),r.item.enable=-function(e){return e[0]===!0?e.shift():-1}(r.item.disable),r.set("min",n.min).set("max",n.max).set("now"),o?r.set("select",o,{format:u,fromValue:!!i}):r.set("select",null).set("highlight",r.item.now),e.on("render",function(){t.element(e.$root[0].querySelectorAll("."+n.klass.selectMonth)).on("change",function(){var r=this.value;r&&(e.set("highlight",[e.get("view").year,r,e.get("highlight").date]),t.element(e.$root[0].querySelectorAll("."+n.klass.selectMonth)).triggerHandler("focus"))}),t.element(e.$root[0].querySelectorAll("."+n.klass.selectYear)).on("change",function(){var r=this.value;r&&(e.set("highlight",[r,e.get("view").month,e.get("highlight").date]),t.element(e.$root[0].querySelectorAll("."+n.klass.selectYear)).triggerHandler("focus"))})}).on("open",function(){t.element(e.$root[0].querySelectorAll("button, select")).attr("disabled",!1)}).on("close",function(){t.element(e.$root[0].querySelectorAll("button, select")).attr("disabled",!0)})}var r=7,i=6,s=e._;n.prototype.set=function(e,t,n){var r=this,i=r.item;return null===t?(i[e]=t,r):(i["enable"==e?"disable":"flip"==e?"enable":e]=r.queue[e].split(" ").map(function(i){return t=r[i](e,t,n)}).pop(),"select"==e?r.set("highlight",i.select,n):"highlight"==e?r.set("view",i.highlight,n):e.match(/^(flip|min|max|disable|enable)$/)&&(i.select&&r.disabled(i.select)&&r.set("select",i.select,n),i.highlight&&r.disabled(i.highlight)&&r.set("highlight",i.highlight,n)),r)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,r){var i,o=this;return n=void 0===n?e:n,n==-1/0||1/0==n?i=n:t.isObject(n)&&s.isInteger(n.pick)?n=n.obj:t.isArray(n)?(n=new Date(n[0],n[1],n[2]),n=s.isDate(n)?n:o.create().obj):n=s.isInteger(n)||s.isDate(n)?o.normalize(new Date(n),r):o.now(e,n,r),{year:i||n.getFullYear(),month:i||n.getMonth(),date:i||n.getDate(),day:i||n.getDay(),obj:i||n,pick:i||n.getTime()}},n.prototype.createRange=function(e,n){var r=this,i=function(e){return e===!0||t.isArray(e)||s.isDate(e)?r.create(e):e};return s.isInteger(e)||(e=i(e)),s.isInteger(n)||(n=i(n)),s.isInteger(e)&&t.isObject(n)?e=[n.year,n.month,n.date+e]:s.isInteger(n)&&t.isObject(e)&&(n=[e.year,e.month,e.date+n]),{from:i(e),to:i(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t,n){return t=new Date,n&&n.rel&&t.setDate(t.getDate()+n.rel),this.normalize(t,n)},n.prototype.navigate=function(e,n,r){var i,s,o,u,a=t.isArray(n),f=t.isObject(n),l=this.item.view;if(a||f){for(f?(s=n.year,o=n.month,u=n.date):(s=+n[0],o=+n[1],u=+n[2]),r&&r.nav&&l&&l.month!==o&&(s=l.year,o=l.month),i=new Date(s,o+(r&&r.nav?r.nav:0),1),s=i.getFullYear(),o=i.getMonth();(new Date(s,o,u)).getMonth()!==o;)u-=1;n=[s,o,u]}return n},n.prototype.normalize=function(e){return e.setHours(0,0,0,0),e},n.prototype.measure=function(e,t){var n=this;return t?s.isInteger(t)&&(t=n.now(e,t,{rel:t})):t="min"==e?-1/0:1/0,t},n.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},n.prototype.validate=function(e,n,r){var i,o,u,a,l=this,c=n,h=r&&r.interval?r.interval:1,p=-1===l.item.enable,d=l.item.min,v=l.item.max,m=p&&l.item.disable.filter(function(e){if(t.isArray(e)){var r=l.create(e).pick;r<n.pick?i=!0:r>n.pick&&(o=!0)}return s.isInteger(e)}).length;if((!r||!r.nav)&&(!p&&l.disabled(n)||p&&l.disabled(n)&&(m||i||o)||!p&&(n.pick<=d.pick||n.pick>=v.pick)))for(p&&!m&&(!o&&h>0||!i&&0>h)&&(h*=-1);l.disabled(n)&&(Math.abs(h)>1&&(n.month<c.month||n.month>c.month)&&(n=c,h=h>0?1:-1),n.pick<=d.pick?(u=!0,h=1,n=l.create([d.year,d.month,d.date-1])):n.pick>=v.pick&&(a=!0,h=-1,n=l.create([v.year,v.month,v.date+1])),!u||!a);)n=l.create([n.year,n.month,n.date+h]);return n},n.prototype.disabled=function(e){var n=this,r=n.item.disable.filter(function(r){return s.isInteger(r)?e.day===(n.settings.firstDay?r:r-1)%7:t.isArray(r)||s.isDate(r)?e.pick===n.create(r).pick:t.isObject(r)?n.withinRange(r,e):void 0});return r=r.length&&!r.filter(function(e){return t.isArray(e)&&"inverted"==e[3]||t.isObject(e)&&e.inverted}).length,-1===n.item.enable?!r:r||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.parse=function(e,n,r){var i,o=this,u={};return!n||s.isInteger(n)||t.isArray(n)||s.isDate(n)||t.isObject(n)&&s.isInteger(n.pick)?n:(r&&r.format||(r=r||{},r.format=o.settings.format),i="string"!=typeof n||r.fromValue?0:1,o.formats.toArray(r.format).map(function(e){var t=o.formats[e],r=t?s.trigger(t,o,[n,u]):e.replace(/^!/,"").length;t&&(u[e]=n.substr(0,r)),n=n.substr(r)}),[u.yyyy||u.yy,+(u.mm||u.m)-i,u.dd||u.d])},n.prototype.formats=function(){function e(e,t,n){var r=e.match(/\w+/)[0];return n.mm||n.m||(n.m=t.indexOf(r)),r.length}function t(e){return e.match(/\w+/)[0].length}return{d:function(e,t){return e?s.digits(e):t.date},dd:function(e,t){return e?2:s.lead(t.date)},ddd:function(e,n){return e?t(e):this.settings.weekdaysShort[n.day]},dddd:function(e,n){return e?t(e):this.settings.weekdaysFull[n.day]},m:function(e,t){return e?s.digits(e):t.month+1},mm:function(e,t){return e?2:s.lead(t.month+1)},mmm:function(t,n){var r=this.settings.monthsShort;return t?e(t,r,n):r[n.month]},mmmm:function(t,n){var r=this.settings.monthsFull;return t?e(t,r,n):r[n.month]},yy:function(e,t){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return s.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}}}(),n.prototype.isDateExact=function(e,n){var r=this;return s.isInteger(e)&&s.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(s.isDate(e)||t.isArray(e))&&(s.isDate(n)||t.isArray(n))?r.create(e).pick===r.create(n).pick:t.isObject(e)&&t.isObject(n)?r.isDateExact(e.from,n.from)&&r.isDateExact(e.to,n.to):!1},n.prototype.isDateOverlap=function(e,n){var r=this;return s.isInteger(e)&&(s.isDate(n)||t.isArray(n))?e===r.create(n).day+1:s.isInteger(n)&&(s.isDate(e)||t.isArray(e))?n===r.create(e).day+1:t.isObject(e)&&t.isObject(n)?r.overlapRanges(e,n):!1},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},n.prototype.deactivate=function(e,n){var r=this,i=r.item.disable.slice(0);return"flip"==n?r.flipEnable():n===!1?(r.flipEnable(1),i=[]):n===!0?(r.flipEnable(-1),i=[]):n.map(function(e){for(var n,o=0;o<i.length;o+=1)if(r.isDateExact(e,i[o])){n=!0;break}n||(s.isInteger(e)||s.isDate(e)||t.isArray(e)||t.isObject(e)&&e.from&&e.to)&&i.push(e)}),i},n.prototype.activate=function(e,n){var r=this,i=r.item.disable,o=i.length;return"flip"==n?r.flipEnable():n===!0?(r.flipEnable(1),i=[]):n===!1?(r.flipEnable(-1),i=[]):n.map(function(e){var n,u,a,l;for(a=0;o>a;a+=1){if(u=i[a],r.isDateExact(u,e)){n=i[a]=null,l=!0;break}if(r.isDateOverlap(u,e)){t.isObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[3]||n.push("inverted")):s.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(a=0;o>a;a+=1)if(r.isDateExact(i[a],e)){i[a]=null;break}if(l)for(a=0;o>a;a+=1)if(r.isDateOverlap(i[a],e)){i[a]=null;break}n&&i.push(n)}),i.filter(function(e){return null!=e})},n.prototype.nodes=function(e){var t=this,n=t.settings,o=t.item,u=o.now,a=o.select,l=o.highlight,c=o.view,h=o.disable,p=o.min,v=o.max,m=function(e){return n.firstDay&&e.push(e.shift()),s.node("thead",s.node("tr",s.group({min:0,max:r-1,i:1,node:"th",item:function(t){return[e[t],n.klass.weekdays]}})))}((n.showWeekdaysFull?n.weekdaysFull:n.weekdaysShort).slice(0)),g=function(e){return s.node("div"," ",n.klass["nav"+(e?"Next":"Prev")]+(e&&c.year>=v.year&&c.month>=v.month||!e&&c.year<=p.year&&c.month<=p.month?" "+n.klass.navDisabled:""),"data-nav="+(e||-1))},y=function(t){return n.selectMonths?s.node("select",s.group({min:0,max:11,i:1,node:"option",item:function(e){return[t[e],0,"value="+e+(c.month==e?" selected":"")+(c.year==p.year&&e<p.month||c.year==v.year&&e>v.month?" disabled":"")]}}),n.klass.selectMonth,e?"":"disabled"):s.node("div",t[c.month],n.klass.month)},b=function(){var t=c.year,r=n.selectYears===!0?5:~~(n.selectYears/2);if(r){var i=p.year,o=v.year,u=t-r,a=t+r;if(i>u&&(a+=i-u,u=i),a>o){var l=u-i,h=a-o;u-=l>h?h:l,a=o}return s.node("select",s.group({min:u,max:a,i:1,node:"option",item:function(e){return[e,0,"value="+e+(t==e?" selected":"")]}}),n.klass.selectYear,e?"":"disabled")}return s.node("div",t,n.klass.year)};return s.node("div",g()+g(1)+y(n.showMonthsShort?n.monthsShort:n.monthsFull)+b(),n.klass.header)+s.node("table",m+s.node("tbody",s.group({min:0,max:i-1,i:1,node:"tr",item:function(e){var i=n.firstDay&&0===t.create([c.year,c.month,1]).day?-7:0;return[s.group({min:r*e-c.day+i+1,max:function(){return this.min+r-1},i:1,node:"td",item:function(e){e=t.create([c.year,c.month,e+(n.firstDay?1:0)]);var r=a&&a.pick==e.pick,i=l&&l.pick==e.pick,o=h&&t.disabled(e)||e.pick<p.pick||e.pick>v.pick;return[s.node("div",e.date,function(t){return t.push(c.month==e.month?n.klass.infocus:n.klass.outfocus),u.pick==e.pick&&t.push(n.klass.now),r&&t.push(n.klass.selected),i&&t.push(n.klass.highlighted),o&&t.push(n.klass.disabled),t.join(" ")}([n.klass.day]),"data-pick="+e.pick+" "+s.ariaAttr({role:"button",controls:t.$node[0].id,checked:r&&t.$node[0].value===s.trigger(t.formats.toString,t,[n.format,e])?!0:null,activedescendant:i?!0:null,disabled:o?!0:null}))]}})]}})),n.klass.table)+s.node("div",s.node("button",n.today,n.klass.buttonToday,"type=button data-pick="+u.pick+(e?"":" disabled"))+s.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disabled")),n.klass.footer)},n.defaults=function(e){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:e+"table",header:e+"header",navPrev:e+"nav--prev",navNext:e+"nav--next",navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month",selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled",selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear",buttonToday:e+"button--today"}}}(e.klasses().picker+"__"),e.extend("pickadate",n)});!function(e){"function"==typeof define&&define.amd?define(["picker","angular"],e):e(Picker,angular)}(function(e,t){function n(e,t){var n=this,r=e.$node[0].value,i=e.$node.data("value"),s=i||r,o=i?t.formatSubmit:t.format;n.settings=t,n.$node=e.$node,n.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse create validate",view:"parse create validate",disable:"deactivate",enable:"activate"},n.item={},n.item.interval=t.interval||30,n.item.disable=(t.disable||[]).slice(0),n.item.enable=-function(e){return e[0]===!0?e.shift():-1}(n.item.disable),n.set("min",t.min).set("max",t.max).set("now"),s?n.set("select",s,{format:o,fromValue:!!r}):n.set("select",null).set("highlight",n.item.now),n.key={40:1,38:-1,39:1,37:-1,go:function(e){n.set("highlight",n.item.highlight.pick+e*n.item.interval,{interval:e*n.item.interval}),this.render()}},e.on("render",function(){var n=e.$root.children(),r=n.find("."+t.klass.viewset);r.length&&(n[0].scrollTop=~~r.position().top-2*r[0].clientHeight)}).on("open",function(){e.$root.find("button").attr("disable",!1)}).on("close",function(){e.$root.find("button").attr("disable",!0)})}var r=24,i=60,s=12,o=r*i,u=e._;n.prototype.set=function(e,t,n){var r=this,i=r.item;return null===t?(i[e]=t,r):(i["enable"==e?"disable":"flip"==e?"enable":e]=r.queue[e].split(" ").map(function(i){return t=r[i](e,t,n)}).pop(),"select"==e?r.set("highlight",i.select,n):"highlight"==e?r.set("view",i.highlight,n):"interval"==e?r.set("min",i.min,n).set("max",i.max,n):e.match(/^(flip|min|max|disable|enable)$/)&&("min"==e&&r.set("max",i.max,n),i.select&&r.disabled(i.select)&&r.set("select",i.select,n),i.highlight&&r.disabled(i.highlight)&&r.set("highlight",i.highlight,n)),r)},n.prototype.get=function(e){return this.item[e]},n.prototype.create=function(e,n,s){var a=this;return n=void 0===n?e:n,u.isDate(n)&&(n=[n.getHours(),n.getMinutes()]),t.isObject(n)&&u.isInteger(n.pick)?n=n.pick:t.isArray(n)?n=+n[0]*i+ +n[1]:u.isInteger(n)||(n=a.now(e,n,s)),"max"==e&&n<a.item.min.pick&&(n+=o),"min"!=e&&"max"!=e&&(n-a.item.min.pick)%a.item.interval!==0&&(n+=a.item.interval),n=a.normalize(e,n,s),{hour:~~(r+n/i)%r,mins:(i+n%i)%i,time:(o+n)%o,pick:n}},n.prototype.createRange=function(e,n){var r=this,i=function(e){return e===!0||t.isArray(e)||u.isDate(e)?r.create(e):e};return u.isInteger(e)||(e=i(e)),u.isInteger(n)||(n=i(n)),u.isInteger(e)&&t.isObject(n)?e=[n.hour,n.mins+e*r.settings.interval]:u.isInteger(n)&&t.isObject(e)&&(n=[e.hour,e.mins+n*r.settings.interval]),{from:i(e),to:i(n)}},n.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},n.prototype.overlapRanges=function(e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},n.prototype.now=function(e,t){var n,r=this.item.interval,s=new Date,o=s.getHours()*i+s.getMinutes(),a=u.isInteger(t);return o-=o%r,n=0>t&&-r>=r*t+o,o+="min"==e&&n?0:r,a&&(o+=r*(n&&"max"!=e?t+1:t)),o},n.prototype.normalize=function(e,t){var n=this.item.interval,r=this.item.min&&this.item.min.pick||0;return t-="min"==e?0:(t-r)%n},n.prototype.measure=function(e,n,s){var o=this;return n?n===!0||u.isInteger(n)?n=o.now(e,n,s):t.isObject(n)&&u.isInteger(n.pick)&&(n=o.normalize(e,n.pick,s)):n="min"==e?[0,0]:[r-1,i-1],n},n.prototype.validate=function(e,t,n){var r=this,i=n&&n.interval?n.interval:r.item.interval;return r.disabled(t)&&(t=r.shift(t,i)),t=r.scope(t),r.disabled(t)&&(t=r.shift(t,-1*i)),t},n.prototype.disabled=function(e){var n=this,r=n.item.disable.filter(function(r){return u.isInteger(r)?e.hour==r:t.isArray(r)||u.isDate(r)?e.pick==n.create(r).pick:t.isObject(r)?n.withinRange(r,e):void 0});return r=r.length&&!r.filter(function(e){return t.isArray(e)&&"inverted"==e[2]||t.isObject(e)&&e.inverted}).length,-1===n.item.enable?!r:r||e.pick<n.item.min.pick||e.pick>n.item.max.pick},n.prototype.shift=function(e,t){var n=this,r=n.item.min.pick,i=n.item.max.pick;for(t=t||n.item.interval;n.disabled(e)&&(e=n.create(e.pick+=t),!(e.pick<=r||e.pick>=i)););return e},n.prototype.scope=function(e){var t=this.item.min.pick,n=this.item.max.pick;return this.create(e.pick>n?n:e.pick<t?t:e)},n.prototype.parse=function(e,n,r){var s,o,a,f,l,c=this,p={};if(!n||u.isInteger(n)||t.isArray(n)||u.isDate(n)||t.isObject(n)&&u.isInteger(n.pick))return n;r&&r.format||(r=r||{},r.format=c.settings.format),c.formats.toArray(r.format).map(function(e){var t,r=c.formats[e],i=r?u.trigger(r,c,[n,p]):e.replace(/^!/,"").length;r&&(t=n.substr(0,i),p[e]=t.match(/^\d+$/)?+t:t),n=n.substr(i)});for(f in p)l=p[f],u.isInteger(l)?f.match(/^(h|hh)$/i)?(s=l,("h"==f||"hh"==f)&&(s%=12)):"i"==f&&(o=l):f.match(/^a$/i)&&l.match(/^p/i)&&("h"in p||"hh"in p)&&(a=!0);return(a?s+12:s)*i+o},n.prototype.formats={h:function(e,t){return e?u.digits(e):t.hour%s||s},hh:function(e,t){return e?2:u.lead(t.hour%s||s)},H:function(e,t){return e?u.digits(e):""+t.hour%24},HH:function(e,t){return e?u.digits(e):u.lead(t.hour%24)},i:function(e,t){return e?2:u.lead(t.mins)},a:function(e,t){return e?4:o/2>t.time%o?"a.m.":"p.m."},A:function(e,t){return e?2:o/2>t.time%o?"AM":"PM"},toArray:function(e){return e.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(e,t){var n=this;return n.formats.toArray(e).map(function(e){return u.trigger(n.formats[e],n,[0,t])||e.replace(/^!/,"")}).join("")}},n.prototype.isTimeExact=function(e,n){var r=this;return u.isInteger(e)&&u.isInteger(n)||"boolean"==typeof e&&"boolean"==typeof n?e===n:(u.isDate(e)||t.isArray(e))&&(u.isDate(n)||t.isArray(n))?r.create(e).pick===r.create(n).pick:t.isObject(e)&&t.isObject(n)?r.isTimeExact(e.from,n.from)&&r.isTimeExact(e.to,n.to):!1},n.prototype.isTimeOverlap=function(e,n){var r=this;return u.isInteger(e)&&(u.isDate(n)||t.isArray(n))?e===r.create(n).hour:u.isInteger(n)&&(u.isDate(e)||t.isArray(e))?n===r.create(e).hour:t.isObject(e)&&t.isObject(n)?r.overlapRanges(e,n):!1},n.prototype.flipEnable=function(e){var t=this.item;t.enable=e||(-1==t.enable?1:-1)},n.prototype.deactivate=function(e,n){var r=this,i=r.item.disable.slice(0);return"flip"==n?r.flipEnable():n===!1?(r.flipEnable(1),i=[]):n===!0?(r.flipEnable(-1),i=[]):n.map(function(e){for(var n,s=0;s<i.length;s+=1)if(r.isTimeExact(e,i[s])){n=!0;break}n||(u.isInteger(e)||u.isDate(e)||t.isArray(e)||t.isObject(e)&&e.from&&e.to)&&i.push(e)}),i},n.prototype.activate=function(e,n){var r=this,i=r.item.disable,s=i.length;return"flip"==n?r.flipEnable():n===!0?(r.flipEnable(1),i=[]):n===!1?(r.flipEnable(-1),i=[]):n.map(function(e){var n,o,a,l;for(a=0;s>a;a+=1){if(o=i[a],r.isTimeExact(o,e)){n=i[a]=null,l=!0;break}if(r.isTimeOverlap(o,e)){t.isObject(e)?(e.inverted=!0,n=e):t.isArray(e)?(n=e,n[2]||n.push("inverted")):u.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),e.getDate(),"inverted"]);break}}if(n)for(a=0;s>a;a+=1)if(r.isTimeExact(i[a],e)){i[a]=null;break}if(l)for(a=0;s>a;a+=1)if(r.isTimeOverlap(i[a],e)){i[a]=null;break}n&&i.push(n)}),i.filter(function(e){return null!=e})},n.prototype.i=function(e,t){return u.isInteger(t)&&t>0?t:this.item.interval},n.prototype.nodes=function(e){var t=this,n=t.settings,r=t.item.select,i=t.item.highlight,s=t.item.view,o=t.item.disable;return u.node("ul",u.group({min:t.item.min.pick,max:t.item.max.pick,i:t.item.interval,node:"li",item:function(e){e=t.create(e);var a=e.pick,l=r&&r.pick==a,p=i&&i.pick==a,v=o&&t.disabled(e);return[u.trigger(t.formats.toString,t,[u.trigger(n.formatLabel,t,[e])||n.format,e]),function(e){return l&&e.push(n.klass.selected),p&&e.push(n.klass.highlighted),s&&s.pick==a&&e.push(n.klass.viewset),v&&e.push(n.klass.disabled),e.join(" ")}([n.klass.listItem]),"data-pick="+e.pick+" "+u.ariaAttr({role:"button",controls:t.$node[0].id,checked:l&&t.$node.val()===u.trigger(t.formats.toString,t,[n.format,e])?!0:null,activedescendant:p?!0:null,disabled:v?!0:null})]}})+u.node("li",u.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?"":" disable"))),n.klass.list)},n.defaults=function(e){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:e+" "+e+"--time",holder:e+"__holder",list:e+"__list",listItem:e+"__list-item",disabled:e+"__list-item--disabled",selected:e+"__list-item--selected",highlighted:e+"__list-item--highlighted",viewset:e+"__list-item--viewset",now:e+"__list-item--now",buttonClear:e+"__button--clear"}}}(e.klasses().picker),e.extend("pickatime",n)});[].map||(Array.prototype.map=function(e,t){for(var n=this,r=n.length,i=new Array(r),s=0;r>s;s++)s in n&&(i[s]=e.call(t,n[s],s,n));return i}),[].filter||(Array.prototype.filter=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var r=[],i=arguments[1],s=0;n>s;s++)if(s in t){var o=t[s];e.call(i,o,s,t)&&r.push(o)}return r}),[].indexOf||(Array.prototype.indexOf=function(e){if(null==this)throw new TypeError;var t=Object(this),n=t.length>>>0;if(0===n)return-1;var r=0;if(arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:0!==r&&1/0!=r&&r!=-1/0&&(r=(r>0||-1)*Math.floor(Math.abs(r)))),r>=n)return-1;for(var i=r>=0?r:Math.max(n-Math.abs(r),0);n>i;i++)if(i in t&&t[i]===e)return i;return-1});var nativeSplit=String.prototype.split,compliantExecNpcg=void 0===/()??/.exec("")[1];String.prototype.split=function(e,t){var n=this;if("[object RegExp]"!==Object.prototype.toString.call(e))return nativeSplit.call(n,e,t);var r,i,s,o,u=[],a=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),f=0;for(e=new RegExp(e.source,a+"g"),n+="",compliantExecNpcg||(r=new RegExp("^"+e.source+"$(?!\\s)",a)),t=void 0===t?-1>>>0:t>>>0;(i=e.exec(n))&&(s=i.index+i[0].length,!(s>f&&(u.push(n.slice(f,i.index)),!compliantExecNpcg&&i.length>1&&i[0].replace(r,function(){for(var e=1;e<arguments.length-2;e++)void 0===arguments[e]&&(i[e]=void 0)}),i.length>1&&i.index<n.length&&Array.prototype.push.apply(u,i.slice(1)),o=i[0].length,f=s,u.length>=t)));)e.lastIndex===i.index&&e.lastIndex++;return f===n.length?(o||!e.test(""))&&u.push(""):u.push(n.slice(f)),u.length>t?u.slice(0,t):u};angular.module("angular-datepicker",[]).directive("pickADate",function(){return{restrict:"A",scope:{pickADate:"=",pickADateOptions:"="},link:function(e,t){function n(n){if("function"==typeof s&&s.apply(this,arguments),!e.$$phase&&!e.$root.$$phase){var r=t.pickadate("picker").get("select");e.$apply(function(){return n.hasOwnProperty("clear")?void (e.pickADate=null):(e.pickADate&&"string"!=typeof e.pickADate||(e.pickADate=new Date(0)),e.pickADate.setYear(r.obj.getYear()+1900),e.pickADate.setMonth(r.obj.getMonth()),void e.pickADate.setDate(r.obj.getDate()))})}}function r(){if("function"==typeof o&&o.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var e=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",e),setTimeout(function(){window.removeEventListener("native.keyboardshow",e)},500)}}var i=e.pickADateOptions||{},s=i.onSet,o=i.onClose;t.pickadate(angular.extend(i,{onSet:n,onClose:r,container:document.body})),setTimeout(function(){e.pickADate&&t.pickadate("picker").set("select",e.pickADate)},1e3)}}}).directive("pickATime",function(){return{restrict:"A",scope:{pickATime:"=",pickATimeOptions:"="},link:function(e,t){function n(n){if("function"==typeof s&&s.apply(this,arguments),!e.$$phase&&!e.$root.$$phase){var r=t.pickatime("picker").get("select");e.$apply(function(){return n.hasOwnProperty("clear")?void (e.pickATime=null):(e.pickATime&&"string"!=typeof e.pickATime||(e.pickATime=new Date),e.pickATime.setHours(r.hour),e.pickATime.setMinutes(r.mins),e.pickATime.setSeconds(0),void e.pickATime.setMilliseconds(0))})}}function r(){if("function"==typeof o&&o.apply(this,arguments),"undefined"!=typeof cordova&&cordova.plugins&&cordova.plugins.Keyboard){var e=function(){cordova.plugins.Keyboard.close(),window.removeEventListener("native.keyboardshow",this)};window.addEventListener("native.keyboardshow",e),setTimeout(function(){window.removeEventListener("native.keyboardshow",e)},500)}}var i=e.pickATimeOptions||{},s=i.onSet,o=i.onClose;t.pickatime(angular.extend(i,{onSet:n,onClose:r,container:document.body})),setTimeout(function(){e.pickATime&&t.pickatime("picker").set("select",e.pickATime)},1e3)}}});