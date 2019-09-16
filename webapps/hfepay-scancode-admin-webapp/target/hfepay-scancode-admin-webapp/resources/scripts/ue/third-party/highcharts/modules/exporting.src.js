(function(b){var v=b.Chart,r=b.addEvent,t=b.removeEvent,q=b.createElement,s=b.discardElement,o=b.css,h=b.merge,e=b.each,w=b.extend,d=Math,n=d.max,A=document,g=window,i=b.isTouchDevice,k="M",l="L",p="div",u="hidden",m="none",f="highcharts-",y="absolute",j="px",z,a=b.Renderer.prototype.symbols,x=b.getOptions(),c;w(x.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});x.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:m,color:"#303030",fontSize:i?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};x.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:f+"contextmenu",symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:true},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};b.post=function(C,E){var B,D;D=q("form",{method:"post",action:C,enctype:"multipart/form-data"},{display:m},A.body);for(B in E){q("input",{type:u,name:B,value:E[B]},null,D)}D.submit();s(D)};w(v.prototype,{getSVG:function(H){var I=this,B,K,F,D,C,E,J,G,L=h(I.options,H);if(!A.createElementNS){A.createElementNS=function(N,M){return A.createElement(M)}}K=q(p,null,{position:y,top:"-9999em",width:I.chartWidth+j,height:I.chartHeight+j},A.body);J=I.renderTo.style.width;G=I.renderTo.style.height;C=L.exporting.sourceWidth||L.chart.width||(/px$/.test(J)&&parseInt(J,10))||600;E=L.exporting.sourceHeight||L.chart.height||(/px$/.test(G)&&parseInt(G,10))||400;w(L.chart,{animation:false,renderTo:K,forExport:true,width:C,height:E});L.exporting.enabled=false;L.series=[];e(I.series,function(M){D=h(M.options,{animation:false,showCheckbox:false,visible:M.visible});if(!D.isInternal){L.series.push(D)}});B=new b.Chart(L,I.callback);e(["xAxis","yAxis"],function(M){e(I[M],function(Q,O){var P=B[M][O],S=Q.getExtremes(),R=S.userMin,N=S.userMax;if(P&&(R!==z||N!==z)){P.setExtremes(R,N,true,false)}})});F=B.container.innerHTML;L=null;B.destroy();s(K);F=F.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g,"\u00A0").replace(/&shy;/g,"\u00AD").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(M){return M.toLowerCase()});F=F.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'");return F},exportChart:function(C,E){C=C||{};var D=this,F=D.options.exporting,B=D.getSVG(h({chart:{borderRadius:0}},F.chartOptions,E,{exporting:{sourceWidth:C.sourceWidth||F.sourceWidth,sourceHeight:C.sourceHeight||F.sourceHeight}}));C=h(D.options.exporting,C);b.post(C.url,{filename:C.filename||"chart",type:C.type,width:C.width||0,scale:C.scale||2,svg:B})},print:function(){var E=this,C=E.container,F=[],D=C.parentNode,B=A.body,G=B.childNodes;if(E.isPrinting){return}E.isPrinting=true;e(G,function(I,H){if(I.nodeType===1){F[H]=I.style.display;I.style.display=m}});B.appendChild(C);g.focus();g.print();setTimeout(function(){D.appendChild(C);e(G,function(I,H){if(I.nodeType===1){I.style.display=F[H]}});E.isPrinting=false},1000)},contextMenu:function(G,O,K,J,P,N,B){var M=this,T=M.options.navigation,F=T.menuItemStyle,R=M.chartWidth,I=M.chartHeight,U="cache-"+G,E=M[U],Q=n(P,N),D="3px 3px 10px #888",S,L,C,H;if(!E){M[U]=E=q(p,{className:G},{position:y,zIndex:1000,padding:Q+j},M.container);S=q(p,null,w({MozBoxShadow:D,WebkitBoxShadow:D,boxShadow:D},T.menuStyle),E);L=function(){o(E,{display:m});if(B){B.setState(0)}M.openMenu=false};r(E,"mouseleave",function(){C=setTimeout(L,500)});r(E,"mouseenter",function(){clearTimeout(C)});r(document,"mousedown",function(V){if(!M.pointer.inClass(V.target,G)){L()}});e(O,function(W){if(W){var V=W.separator?q("hr",null,null,S):q(p,{onmouseover:function(){o(this,T.menuItemHoverStyle)},onmouseout:function(){o(this,F)},onclick:function(){L();W.onclick.apply(M,arguments)},innerHTML:W.text||M.options.lang[W.textKey]},w({cursor:"pointer"},F),S);M.exportDivElements.push(V)}});M.exportDivElements.push(S,E);M.exportMenuWidth=E.offsetWidth;M.exportMenuHeight=E.offsetHeight}H={display:"block"};if(K+M.exportMenuWidth>R){H.right=(R-K-P-Q)+j}else{H.left=(K-Q)+j}if(J+N+M.exportMenuHeight>I&&B.alignOptions.verticalAlign!=="top"){H.bottom=(I-J-Q)+j}else{H.top=(J+N-Q)+j}o(E,H);M.openMenu=true},addButton:function(P){var J=this,I=J.renderer,C=h(J.options.navigation.buttonOptions,P),O=C.onclick,B=C.menuItems,E,F,M={stroke:C.symbolStroke,fill:C.symbolFill},D=C.symbolSize||12;if(!J.btnCount){J.btnCount=0}if(!J.exportDivElements){J.exportDivElements=[];J.exportSVGElements=[]}if(C.enabled===false){return}var H=C.theme,N=H.states,G=N&&N.hover,K=N&&N.select,L;delete H.states;if(O){L=function(){O.apply(J,arguments)}}else{if(B){L=function(){J.contextMenu(F.menuClassName,B,F.translateX,F.translateY,F.width,F.height,F);F.setState(2)}}}if(C.text&&C.symbol){H.paddingLeft=b.pick(H.paddingLeft,25)}else{if(!C.text){w(H,{width:C.width,height:C.height,padding:0})}}F=I.button(C.text,0,0,L,H,G,K).attr({title:J.options.lang[C._titleKey],"stroke-linecap":"round"});F.menuClassName=P.menuClassName||f+"menu-"+J.btnCount++;if(C.symbol){E=I.symbol(C.symbol,C.symbolX-(D/2),C.symbolY-(D/2),D,D).attr(w(M,{"stroke-width":C.symbolStrokeWidth||1,zIndex:1})).add(F)}F.add().align(w(C,{width:F.width,x:b.pick(C.x,c)}),true,"spacingBox");c+=(F.width+C.buttonSpacing)*(C.align==="right"?-1:1);J.exportSVGElements.push(F,E)},destroyExport:function(E){var C=E.target,B,D;for(B=0;B<C.exportSVGElements.length;B++){D=C.exportSVGElements[B];if(D){D.onclick=D.ontouchstart=null;C.exportSVGElements[B]=D.destroy()}}for(B=0;B<C.exportDivElements.length;B++){D=C.exportDivElements[B];t(D,"mouseleave");C.exportDivElements[B]=D.onmouseout=D.onmouseover=D.ontouchstart=D.onclick=null;s(D)}}});a.menu=function(D,F,E,C){var B=[k,D,F+2.5,l,D+E,F+2.5,k,D,F+C/2+0.5,l,D+E,F+C/2+0.5,k,D,F+C-1.5,l,D+E,F+C-1.5];return B};v.prototype.callbacks.push(function(B){var E,D=B.options.exporting,C=D.buttons;c=0;if(D.enabled!==false){for(E in C){B.addButton(C[E])}r(B,"destroy",B.destroyExport)}})}(Highcharts));