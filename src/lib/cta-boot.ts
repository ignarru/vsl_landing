/**
 * Script que se inyecta INLINE en el `<head>` (ver app/layout.tsx).
 *
 * ═══ POR QUÉ EXISTE ═══════════════════════════════════════════════════════════════════════
 * La landing es `output: "export"`: el HTML que sirve Cloudflare trae los CTAs con el href
 * PELADO (`https://cal.com/ignacio.arruvito/iabyia`, sin utm ni lp_sid). Los parámetros se los
 * pone React recién al hidratar (page.tsx). Un clic en esa ventana —o con el bundle bloqueado /
 * fallando— se iba a cal.com sin NADA y sin dejar registro del clic (el listener delegado de
 * track.ts tampoco estaba montado todavía): la reunión llegaba al dashboard sin atribución y sin
 * puente, y la visita ni figuraba en lp_sesiones.
 *
 * Caso real: las reuniones del 06/08 y 07/08/2026 llegaron con lpSid, utmSource, utmMedium y
 * videoId TODOS en undefined, y no aparecían en /landing. Histórico: 10 de 90 llamadas.
 *
 * Este script corre al parsear el `<head>`, antes de cualquier clic humano posible, y:
 *   1. resuelve la atribución + el sid,
 *   2. deja la URL final en `window.__lpCalUrl` (page.tsx la usa; buildCalUrl queda de respaldo),
 *   3. pinta los href de los `[data-cta]` en DOMContentLoaded,
 *   4. y —la red de seguridad— los reescribe EN EL INSTANTE DEL CLIC, en fase de captura.
 *
 * ⚠️ ESPEJO DE `cal-link.ts` Y `track.ts`. Las reglas están duplicadas a propósito (acá no se
 * puede importar nada: tiene que ser una string inline, sin bundle). Si cambiás la atribución en
 * cal-link.ts o las señales de privacidad en track.ts, cambialas TAMBIÉN acá:
 *   · sanitizeUtm  → alfanumérico + `-` `_`, minúsculas, 40 chars
 *   · video_id     → sólo si utm_source=youtube Y utm_medium=video Y 11 chars válidos
 *   · utm_content  → sólo cuando NO es video de YouTube (ahí el id ya viaja como video_id)
 *   · sin UTMs     → visita directa, no se inventa fuente (commit 7a0e1ca)
 *   · no medir     → DNT / GPC / `?nt=1` / marca `iabyia_no_track` (storage bloqueado NO cuenta)
 *   · claves       → sessionStorage `iabyia_lp_sid`, localStorage `iabyia_no_track`
 * ═════════════════════════════════════════════════════════════════════════════════════════
 *
 * Todo va dentro de try/catch: este script NUNCA puede romper la página que vende.
 */
export const CTA_BOOT = `(function(){try{
var W=window,D=document,CAL="https://cal.com/ignacio.arruvito/iabyia";
function s(v){if(!v)return "";v=(""+v).toLowerCase().replace(/[^a-z0-9_-]/g,"").slice(0,40);return v}
var q=new URLSearchParams(W.location.search);
var src=s(q.get("utm_source")),med=s(q.get("utm_medium")),cnt=q.get("utm_content");
var yt=src==="youtube"&&med==="video";
var vid=(yt&&cnt&&/^[A-Za-z0-9_-]{11}$/.test(cnt))?cnt:"";
var con=yt?"":s(cnt);
var off=false;
try{if(navigator.doNotTrack==="1"||W.doNotTrack==="1"||navigator.globalPrivacyControl===true)off=true}catch(e){}
try{if(q.get("nt")==="1"){off=true;try{localStorage.setItem("iabyia_no_track","1")}catch(e){}}}catch(e){}
if(!off){try{off=localStorage.getItem("iabyia_no_track")==="1"}catch(e){}}
var sid="";
if(!off){
try{sid=sessionStorage.getItem("iabyia_lp_sid")||""}catch(e){}
if(!sid){try{sid=crypto.randomUUID()}catch(e){}
if(!sid)sid="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0;return (c==="x"?r:(r&3)|8).toString(16)});
try{sessionStorage.setItem("iabyia_lp_sid",sid)}catch(e){}}
W.__lpSid=sid}
var p=new URLSearchParams();
if(vid)p.set("video_id",vid);
if(src)p.set("utm_source",src);
if(med)p.set("utm_medium",med);
if(con)p.set("utm_content",con);
if(sid)p.set("lp_sid",sid);
var qs=p.toString(),url=qs?CAL+"?"+qs:CAL;
W.__lpCalUrl=url;
if(url===CAL)return;
function fix(a){try{if(a&&a.getAttribute("href")===CAL)a.setAttribute("href",url)}catch(e){}}
D.addEventListener("click",function(e){try{var t=e.target;fix(t&&t.closest?t.closest("a[data-cta]"):null)}catch(e2){}},true);
function pintar(){try{var a=D.querySelectorAll("a[data-cta]");for(var i=0;i<a.length;i++)fix(a[i])}catch(e){}}
if(D.readyState==="loading")D.addEventListener("DOMContentLoaded",pintar);else pintar();
}catch(e){}})();`;
