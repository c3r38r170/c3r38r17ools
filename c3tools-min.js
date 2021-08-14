const W=window,D=document,ALL=!0,ONLY_ONE=!1;var B,Types={OTHER:-1,NUMBER:0,STRING:1,ARRAY:2,OBJECT:3,BOOLEAN:4,NULL:5};function is(e,t){if(null==e&&t==Types.NULL)return!0;let n={[Types.NUMBER]:["number",Number],[Types.STRING]:["string",String],[Types.BOOLEAN]:["boolean",Boolean]};switch(t){case 0:case 1:case 4:return n[t][0]==typeof e||e instanceof n[t][1];case 2:return Array.isArray(e);case 3:return"object"==typeof e&&!Array.isArray(e)}return t==Types.OTHER}function whatIs(e){switch(typeof e){case"number":return Types.NUMBER;case"string":return Types.STRING;case"object":switch(!0){case Array.isArray(e):return Types.ARRAY;case e instanceof String:return Types.STRING;case e instanceof Number:return Types.NUMBER;case null==e:return Types.NULL;default:return Types.OBJECT}default:return Types.OTHER}}addEventListener("DOMContentLoaded",(()=>{B=D.body}));const gEt=e=>D.getElementById(e);function SqS(e,{n:t=false,from:n=D}={}){if(e instanceof Node)return e;if(is(e,Types.STRING)){let r,s=e.slice(1);if(/[ :\[\.#,+~]/.test(s)){if(!t||1===t)return n.querySelector(e);if(!0===t)return n.querySelectorAll(e);r=n.querySelectorAll(e)}else switch(e[0]){case"#":let t=D.getElementById(s);return!!t.closest(e)&&t;case".":r=n.getElementsByClassName(s);break;case"[":let a=/^\[name="([^"]*)"\]$/.exec(e);a&&(r=D.getElementsByName(a[1]));break;case":":break;default:r=n.getElementsByTagName(e)}if(t&&1!==t){if(!0===t)return r||D.querySelectorAll(e);{if(r||(r=D.querySelectorAll(e)),t>=r.length)return r;let n=[];for(let e=0;e<t;e++)n.push(r[e]);return n}}return r?r[0]:D.querySelector(e)}return!1}function last(e){if(!is(e,Types.ARRAY))throw new Error("Tried to get last of something not an array.");return e[e.length-1]}function createElement(e,t,n){if(!e)return;let r,s;if(is(e,Types.ARRAY)&&([e,t,n]=e),is(e,Types.STRING)){if(!(e=e.trim()))return;e=D.createElement(e.toUpperCase())}if(!t||!t.nodeType&&is(t,Types.OBJECT)||(n=t,t=null),t)for(let n in t)switch(s=t[n],n){case"class":e.classList.add(s);break;case"classList":for(let t of s)e.classList.add(t);break;case"finalFun":r=s;break;case"children":addElement(e,...s);break;default:"on"==n.substring(0,2)&&is(s,Types.STRING)?s.match("[^a-zA-Z0-9_]")?e[n]=new Function(s):e[n]=W[s]:"on"!=n.substring(0,2)&&null==e[n]?e.setAttribute(n,s):is(s,Types.OBJECT)?Object.assign(e[n],s):e[n]=s;break}return n&&e.appendChild(n.nodeType?n:createElement(n)),r&&("string"==typeof r?new Function(r):r).call(e),e}function addElement(e,...t){let n=[];for(let r of t)r&&n.push(e.appendChild(r.nodeType?r:createElement(r)));return n.length>1?n:n[0]}function sendJSON(e,t,n=null){let r={credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};return fetch(e,n?Object.assign(r,n):r)}function*JSONAsURLEncodedStringIterator(e,t=null){let n=Array.isArray(e)?e.map((e=>["",e])):Object.entries(e);for(let[e,r]of n)e=t?t+"["+e+"]":e,null!=r&&"object"==typeof r?yield*JSONAsURLEncodedStringIterator(r,e):yield[e,r]}function JSONAsFormData(e){if(!is(e,Types.ARRAY)&&!is(e,Types.OBJECT))return;let t=new FormData;for(let n in e){let r=e[n];if(null==r||r instanceof File||"object"!=typeof r)t.append(n,r);else for(let e of JSONAsURLEncodedStringIterator(r,n))t.append(...e)}return t}function sendPOST(e,t,{returnType:n=null,otherOptions:r=null}={}){t instanceof FormData||(t=JSONAsFormData(t));let s={credentials:"include",method:"POST",body:t};r&&Object.assign(s,r);let a=fetch(e,s);return n?a.then((e=>e[n]())):a}function fetchConCredentials(e,t,...n){return fetch(e,Object.assign({credentials:"include"},t),...n)}