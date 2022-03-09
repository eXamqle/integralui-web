/*
  filename: integralui.treelist.js
  version : 22.1.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,T as TemplateResult,a as defaultTemplateProcessor,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import IntegralUIDataService from"../services/integralui.data.service.js";import{IntegralUISpeedMode,IntegralUIObjectState,IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import"./integralui.treelistitem.js";import"./integralui.scrollbar.js";import{iuiTreeListDefaultStyle}from"../styles/default/integralui.treelist.style.js";import{iuiTreeListOfficeStyle}from"../styles/themes/office/integralui.treelist.office.js";import{iuiTreeListDarkStyle}from"../styles/color-schemes/dark/integralui.treelist.dark.js";import{iuiTreeListLightStyle}from"../styles/color-schemes/light/integralui.treelist.light.js";class IntegralUITreeList extends IntegralUIBase{_init(){super._init();this._dataService=new IntegralUIDataService();this._animateItemSize={width:0,height:0};this._animSpeed=300;this._prevClickedObj=null;this._currentDataFields={};this._currentItems=[];this._currentList=[];this._currentTitle="";this._nextList=[];this._prevList=[];this._clickPos={x:0,y:0};this._headerText="";this._hoverItem=null;this._isClicked=!1;this._avgItemHeight=0;this._blockPos={top:30,left:0};this._currentIndent=15;this._leftBlockPos={top:30,left:-300};this._rightBlockPos={top:30,left:300};this._blockSize={width:9999,height:0};this._currentBlockHeight=0;this._maxBlockHeight=0;this._leftBlockOpacity=0;this._blockOpacity=1;this._rightBlockOpacity=0;this._elemSize={width:0,height:0};this._updateTimer=null;this._currentMouseWheelSpeed=IntegralUISpeedMode.Normal;this._currentScrollPos={x:0,y:0};this._maxScrollPos={x:0,y:0};this._isScrollActive=!1;this._isScrollAllowed=!0;this._isScrollTimerActive=!1;this._prevScrollPos={x:0,y:0};this._scrollAppearanceTimeout=null;this._scrollBarSize={width:0,height:0};this._scrollCount=0;this._scrollLargeChange={x:0,y:0};this._scrollSize={width:0,height:0};this._scrollTimerID=null;this._currentItemClicked=null;this._currentSelection=null;this._headerItem=null;this._selList=[];this._currentControlStyleSettings=iuiTreeListDefaultStyle;this._generalClassName="iui-treelist";this._updateDataFields();this._updateData()}connectedCallback(){}disconnectedCallback(){this._resetLayoutTimer();this._resetScrollAppearanceTimeout();this._rt()}ngAfterViewInit(){this._blockPos.top=this._headerElem.offsetHeight;this._leftBlockPos.top=this._headerElem.offsetHeight;this._rightBlockPos.top=this._headerElem.offsetHeight;this._animateItemSize={width:this._headerElem.offsetWidth,height:this._headerElem.offsetHeight};this._elemSize={width:this._elemRef.firstElementChild.clientWidth,height:this._elemRef.firstElementChild.clientHeight};this._leftBlockWidth=this._blockWidth=this._rightBlockWidth=this._elemSize.width}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{dataFields:{type:Object,attribute:"data-fields"},indent:{type:Number,reflect:!0},items:{type:Array},mouseWheelSpeed:{attribute:"mousewheel-speed",converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"veryslow":return IntegralUISpeedMode.VerySlow;case"slow":return IntegralUISpeedMode.Slow;case"fast":return IntegralUISpeedMode.Fast;case"veryfast":return IntegralUISpeedMode.VeryFast;default:return IntegralUISpeedMode.Normal}},toAttribute:e=>{switch(e){case IntegralUISpeedMode.VerySlow:return"VerySlow";case IntegralUISpeedMode.Slow:return"Slow";case IntegralUISpeedMode.Fast:return"Fast";case IntegralUISpeedMode.VeryFast:return"VeryFast";default:return"Normal"}}},reflect:!0},selectedItem:{type:Object,attribute:"selected-item"},title:{type:String,reflect:!0}}}set dataFields(e){const t=this._currentDataFields;this._updateDataFields(e);this.requestUpdate("dataFields",t)}get indent(){return this._currentIndent}set indent(e){if(this._currentIndent!==e){const t=this._currentIndent;this._currentIndent=e;this.requestUpdate("indent",t)}}get items(){return this._currentItems}set items(e){const t=this._currentItems;this._currentItems=e;this._updateData();this.requestUpdate("items",t)}get mouseWheelSpeed(){return this._currentMouseWheelSpeed}set mouseWheelSpeed(e){if(this._currentMouseWheelSpeed!==e){const t=this._currentMouseWheelSpeed;this._currentMouseWheelSpeed=e;this.requestUpdate("mouseWheelSpeed",t)}}get selectedItem(){return this._currentSelection}set selectedItem(e){let t={cancel:!1,header:this._headerItem,item:e};this._invokeEvent("beforeSelect",t);let i=e?this._isItemAllowed(e):!0;if(!0!==t.cancel&&!this.isGroupItem(e)&&this._currentSelection!==e&&i){const t=this._currentSelection;this._currentSelection=e;if(!e){this._headerItem=null;this._headerText=this.title}else if(e[this._currentDataFields.items]&&e[this._currentDataFields.items].length>0){this._headerItem=e;this._headerText=e.text}else{let t=this.getItemParent(e);for(;t&&this.isGroupItem(t);)t=this.getItemParent(t);this._headerItem=t;this._headerText=t?t.text:this.title}this.requestUpdate("selectedItem",t);this._invokeEvent("afterSelect",{header:this._headerItem,item:e});this._invokeEvent("selectionChanged");this.update()}}get title(){return this._currentTitle}set title(e){if(this._currentTitle!==e){const t=this._currentTitle;this._currentTitle=e;if(!this._headerItem)this._headerText=this._currentTitle;this.requestUpdate("title",t)}}_updateList(e,t){let i=this;e.length=0;this.update();if(t)t.forEach(function(t){i._addChildItems(e,t,0,null)})}_addChildItems(e,t,i,s,l){let r=this,a=!0;if(!t[r._currentDataFields.items])return a=r._addItemToCurrentList(e,t,i,s,l);if(r._addItemToCurrentList(e,t,i,s,l)){a=!0;if("group"===t[r._currentDataFields.type]&&r.isItemExpanded(t)){let s=t[r._currentDataFields.items];if(s)s.forEach(function(s){r._addChildItems(e,s,i+r._currentIndent,t[r._currentDataFields.id],t)})}}return a}_addItemToCurrentList(e,t,i,s,l){if(!this.isGroupItem(t)&&!this.isSeparator(t))t[this._currentDataFields.type]="item";if(!t[this._currentDataFields.id])t[this._currentDataFields.id]=this._commonService.getUniqueId();if(s)t[this._currentDataFields.pid]=s;let r=this._isItemAllowed(t);if(r)e.push({data:t,indent:i});return r}_updateData(){this._dataService.init([{data:this.items,fields:this._currentDataFields}])}_updateDataFields(e){if(e)this._currentDataFields={data:e.data?e.data:"data",enabled:e.enabled?e.enabled:"enabled",expanded:e.expanded?e.expanded:"expanded",hasChildren:e.hasChildren?e.hasChildren:"hasChildren",icon:e.icon?e.icon:"icon",id:e.id?e.id:"id",isRoot:e.isRoot?e.isRoot:"isRoot",items:e.items?e.items:"items",pid:e.pid?e.pid:"pid",selected:e.selected?e.selected:"selected",style:e.style?e.style:"style",text:e.text?e.text:"text",tooltip:e.tooltip?e.tooltip:"tooltip",type:e.type?e.type:"type",value:e.value?e.value:"value",visible:e.visible?e.visible:"visible"};else this._currentDataFields={data:"data",enabled:"enabled",expanded:"expanded",hasChildren:"hasChildren",icon:"icon",id:"id",isRoot:"isRoot",items:"items",pid:"pid",selected:"selected",style:"style",text:"text",tooltip:"tooltip",type:"type",value:"value",visible:"visible"};if(this._dataService)this._dataService.updateDataFields(this._currentDataFields)}_resetScrollAppearanceTimeout(){if(this._scrollAppearanceTimeout)clearTimeout(this._scrollAppearanceTimeout);this._scrollAppearanceTimeout=null}_updateScrollAppearance(e){let t=this;t._resetScrollAppearanceTimeout();this._scrollAppearanceTimeout=setTimeout(function(){let i=t._commonService.getShiftPos(),s=t._commonService.getMousePos(e.detail.event);s.x-=i.x;s.y-=i.y;let l=t._commonService.getPageRect(t.elemRef);if(s.x<=l.right&&s.x>=l.right-75)t._isScrollAvailable=!0;else t._isScrollAvailable=!1},100)}_ctrlMouseMove(e){if(this._isEnabled&&this._isVerScrollVisible())this._updateScrollAppearance(e);else this._isScrollAvailable=!1}_ctrlMouseLeave(e){this._resetScrollAppearanceTimeout();this._isScrollAvailable=this._isEnabled&&this._isScrollActive?!0:!1}_onItemMouseEnter(e,t){if(this._isEnabled)this._hoverItem=t}_onItemMouseLeave(e,t){this._hoverItem=null}_onItemMouseDown(e,t){this._invokeEvent("itemClick",{header:this._headerItem,item:t});this._currentItemClicked=t;if(this._isEnabled&&this._isProcessAllowed&&1===e.detail.which&&this._currentItemClicked)this._resolveItemClick()}_onHeaderMouseDown(e){if(this._headerItem&&!this._headerItem[this._currentDataFields.isRoot]){this._invokeEvent("headerClick",{header:this._headerItem});if(this._isEnabled&&this._isProcessAllowed&&1===e.which&&this._selList.length>0)this._resolveHeaderClick()}}_resolveHeaderClick(){let e=this,t=e._selList.length-1,i=e._selList[t]&&e._selList[t][e._currentDataFields.items]?e._selList[t][e._currentDataFields.items]:e.items;e._updateList(e._prevList,i);e._currentScrollPos.y=0;let s=0,l=5/e._clientRect.width,r=.5,a=1/e._clientRect.width,h=0;if(e.allowAnimation){let o=setInterval(function(){if(s<e._clientRect.width){s+=12;r-=l;h+=a;e._blockPos.left=s;e._blockOpacity=r;e._leftBlockPos.left=s-e._clientRect.width;e._leftBlockOpacity=h;e.update()}else{e.selectedItem=e._selList[t];e._currentList.length=0;e.update();e._updateList(e._currentList,i);e._selList.splice(t,1);e._blockPos.left=0;e._blockOpacity=1;e._leftBlockPos.left=-e._clientRect.width;e._leftBlockOpacity=0;e._updateScrollSize();e.update();clearInterval(o)}},10);e._isClicked=!0;let c=setTimeout(function(){e._isClicked=!1;clearTimeout(c)},500)}else{e.selectedItem=e._selList[t];e._currentList.length=0;e.update();e._updateList(e._currentList,i);e._selList.splice(t,1);e._blockPos.left=0;e._blockOpacity=1;e._leftBlockPos.left=-e._clientRect.width;e._leftBlockOpacity=0;e._updateScrollSize();e.update()}}_resolveItemClick(){let e=this,t=this._currentItemClicked;if(e.isGroupItem(t)){let i=!1!==t[e._currentDataFields.expanded]?!0:!1;t[e._currentDataFields.expanded]=!i;e._currentItemClicked=null;e.updateLayout()}else if(t[e._currentDataFields.items]&&t[e._currentDataFields.items].length>0){e._selList.push(e._headerItem);e._updateList(e._nextList,t[e._currentDataFields.items]);e._currentScrollPos.y=0;let i=12,s=0,l=5/e._clientRect.width,r=.5,a=1/e._clientRect.width,h=0;if(e.allowAnimation){let o=setInterval(function(){if(s<e._clientRect.width){s+=i;r-=l;h+=a;e._blockPos.left=-s;e._blockOpacity=r;e._rightBlockPos.left=e._clientRect.width-s;e._rightBlockOpacity=h;e.update()}else{e.selectedItem=t;e._currentList.length=0;e.update();e._updateList(e._currentList,t[e._currentDataFields.items]);e._blockPos.left=0;e._blockOpacity=1;e._rightBlockPos.left=e._clientRect.width;e._rightBlockOpacity=0;e._updateScrollSize();e.update();e._currentItemClicked=null;clearInterval(o)}},10)}else{e.selectedItem=t;e._currentList.length=0;e.update();e._updateList(e._currentList,t[e._currentDataFields.items]);e._blockPos.left=0;e._blockOpacity=1;e._rightBlockPos.left=e._clientRect.width;e._rightBlockOpacity=0;e._updateScrollSize();e.update();e._currentItemClicked=null}}else{e.selectedItem=t;e._currentItemClicked=null}}_getItemElemList(){this._itemElems=this._blockElem?this._blockElem.querySelectorAll("iui-treelistitem"):null;return this._itemElems?this._itemElems:null}getItemParent(e){return this._dataService.getParent(e)}_getItemState(e){if(e===this.selectedItem)return IntegralUIObjectState.Selected;else if(e===this._hoverItem)return IntegralUIObjectState.Hovered;return IntegralUIObjectState.Normal}isGroupItem(e){return e&&"group"===e[this._currentDataFields.type]?!0:!1}isSeparator(e){return e&&"separator"===e[this._currentDataFields.type]?!0:!1}_isItemAllowed(e){return e&&!1!==e[this._currentDataFields.visible]?!0:!1}isItemExpanded(e){return e?e[this._currentDataFields.expanded]||void 0===e[this._currentDataFields.expanded]?!0:!1:!0}_isThereChildItems(e){let t=!1;if(e)if(e[this._currentDataFields.hasChildren])t=!0;else if(e[this._currentDataFields.items]&&e[this._currentDataFields.items].length>0)t=!0;return t}resolve(e){this._isProcessAllowed=!0;if(this._commonService.isString(e))switch(e.toLowerCase()){case"headerclick":this._resolveHeaderClick();break;case"itemclick":this._resolveItemClick();break;default:this._defaultFunc()}}_resetLayoutTimer(){if(this._updateTimer)clearTimeout(this._updateTimer);this._updateTimer=null}_updateBlockSize(){this._blockPos.top=this._leftBlockPos.top=this._rightBlockPos.top=this._headerElem.offsetHeight;this._blockSize={width:this._scrollBarSize.width,height:this._currentBlockHeight};this._leftBlockPos.left=-this._blockSize.width;this._rightBlockPos.left=this._blockSize.width;this._maxBlockHeight=Math.max(this._blockSize.height,this._clientRect.height-this._headerElem.offsetHeight)}async updateLayout(){this._ut();if(!this._tCmp)this._at();this._updateReferences();await this._updateContent();await this._updateScrollSize();await this._updateScrollSize();this.update()}_updateContent(){let e=this;return new Promise(t=>{e._resetLayoutTimer();e._updateTimer=setTimeout(function(){e._clientRect={width:e._elemRef.clientWidth,height:e._elemRef.clientHeight};e._updateSelList();e._updateList(e._currentList,e._headerItem?e._headerItem[e._currentDataFields.items]:e.items);e.update();e._clientRect={width:e._elemRef.clientWidth,height:e._elemRef.clientHeight};clearTimeout(e._updateTimer);t()},1)})}_updateScrollSize(){let e=this;return new Promise(t=>{let i=setTimeout(function(){e._avgItemHeight=0;e._currentBlockHeight=0;let s=e._getItemElemList();if(s&&s.length>0){for(let t=0;t<s.length;t++)e._currentBlockHeight+=s[t].getSize().height;e._avgItemHeight=Math.floor(e._currentBlockHeight/s.length)}e._animateItemSize={width:e._headerElem.offsetWidth,height:e._headerElem.offsetHeight};e._scrollSize={width:0,height:e._currentBlockHeight+e._headerElem.offsetHeight-e._clientRect.height+2};e._scrollSize.width=e._scrollSize.width>2?e._scrollSize.width:0;e._scrollSize.height=e._scrollSize.height>2?e._scrollSize.height:0;e._maxScrollPos={x:e._scrollSize.width,y:e._scrollSize.height};if(e._currentScrollPos.y>e._maxScrollPos.y)e._changeVerticalScrollPos(e._maxScrollPos.y);e._scrollBarSize={width:e.isVerScrollVisible()?e._clientRect.width-16:e._clientRect.width,height:e.isHorScrollVisible()?e._clientRect.height-16:e._clientRect.height-4};e._scrollLargeChange={x:e._scrollBarSize.width,y:e._scrollBarSize.height};e._updateBlockSize();let l=e._commonService.getPadding(e.headerElem),r=e._commonService.getBorderWidth(e.headerElem);e._headerWidth=e._scrollBarSize.width-(l.left+l.right)-(r.left+r.right);e.update();clearTimeout(i);t()},1)})}_updateSelList(){this._selList.length=0;if(this._headerItem){this._selList.push(null);let e=this.getItemParent(this._headerItem);for(;e;){this._selList.push(e);e=this.getItemParent(e)}}}updateView(){this._blockPos.top=this._headerElem.offsetHeight-this._currentScrollPos.y;this.update()}scrollPos(e){if(e){this._currentScrollPos={x:Math.max(0,Math.min(e.x,this._maxScrollPos.x)),y:Math.max(0,Math.min(e.y,this._maxScrollPos.y))};this._invokeEvent("scrollPosChanged",{value:this._currentScrollPos})}return{x:Math.floor(this._currentScrollPos.x),y:Math.floor(this._currentScrollPos.y)}}_changeVerticalScrollPos(e){this._currentScrollPos.y=Math.max(0,Math.min(e,this._maxScrollPos.y));if(this._currentScrollPos.y!==this._prevScrollPos.y){this.updateView();this._invokeEvent("scrollPosChanged",{value:this.scrollPos()});this._prevScrollPos.y=this._currentScrollPos.y}}_processMouseWheel(e,t){if(this._isEnabled){this._hoverItem=null;let t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),i=5;switch(this.mouseWheelSpeed){case IntegralUISpeedMode.VerySlow:i=15;break;case IntegralUISpeedMode.Slow:i=9;break;case IntegralUISpeedMode.Fast:i=3;break;case IntegralUISpeedMode.VeryFast:i=1;break;default:i=5}e.preventDefault();if(this.isVerScrollVisible()){let e=Math.floor(this._clientRect.height/i);if(this.mouseWheelSpeed===IntegralUISpeedMode.VerySlow&&this._avgItemHeight>0)e=this._avgItemHeight;let s=this._currentScrollPos.y+e*t*-1;this._changeVerticalScrollPos(s)}e.stopPropagation()}}isHorScrollVisible(){return!1}isVerScrollVisible(){return this._isEnabled&&this._isScrollAllowed&&this._scrollSize.height>0?!0:!1}_onVerticalScrollStart(e){this._hoverItem=null;this._isScrollActive=!0}_onVerticalScrollEnd(e){this._isScrollActive=!1;this._updateScrollAppearance(e)}_onVerticalScrollChanged(e){this._changeVerticalScrollPos(e.detail.value)}_scrollMouseEnter(e){}findItemById(e){return this._dataService.findObjectById(e)}findItemByText(e){return this._dataService.findObjectByText(e)}_getControlStyle(){let e={};if(this._ctrlSize.width>0)e.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)e.height=this._ctrlSize.height+"px";return e}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiTreeListDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiTreeListLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiTreeListOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this.updateLayout()}_getItemTemplate(e){let t=this.itemTemplate;if(t){let i=t(e);return new TemplateResult(i.strings,i.values,"html",defaultTemplateProcessor)}else if(this.isSeparator(e))return html`<hr class="iui-treelistitem-separator" />`;else{let t=this._commonService.isString(e.icon)?e.icon.split(" "):[],i={};t.map(e=>i[e]=!0);let s="iui-treelistitem-expand-icon";s+=this.isGroupItem(e)?this.isItemExpanded(e)?" iui-treelistitem-expand-icon-collapse":" iui-treelistitem-expand-icon-expand":" iui-treelistitem-expand-icon-next";return html`                     <span class=${classMap(i)}></span>                     <span class="iui-treelistitem-label">${e.text}</span>                     ${this._isThereChildItems(e)?html`<span class="${s}"></span>`:html``}                 `}}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this.update();this._updateReferences();if(this._itemElems)this._itemElems.forEach(e=>e.refresh())}render(){return html`             <style> 				${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle} 			</style>             <div data-ctrl="treelist" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} @DOMMouseScroll="${e=>this._processMouseWheel(e)}" @mousewheel="${e=>this._processMouseWheel(e)}">                 <div id="header" class="iui-treelist-header" style=${styleMap({width:this._headerWidth+"px"})} @mousedown="${e=>this._onHeaderMouseDown(e)}">                     ${this._headerItem&&!this._headerItem[this._currentDataFields.isRoot]?html`<span class="iui-treelist-header-back-icon back"></span>`:html``}                     <span class="iui-treelist-header-title">${this._headerText}</span>                 </div>                 <div class="iui-treelist-block" style=${styleMap({width:this._blockSize.width+"px",height:this._maxBlockHeight+"px"})}">                     <ul id="leftBlock" class="iui-treelist-block" style=${styleMap({position:"absolute",top:this._leftBlockPos.top+"px",left:this._leftBlockPos.left+"px",width:this._blockSize.width+"px",height:this._maxBlockHeight+"px",opacity:this._leftBlockOpacity})}>                         ${this._prevList.map(e=>html`                             <iui-treelistitem .allowAnimation="${this.allowAnimation}" .colorScheme="${this._currentColorScheme}" .enabled="${e.data.enabled}" .text="${e.data.text}" .templateRef="${this._getItemTemplate(e.data)}" .data="${e.data}" .customStyle="${this.customStyle}" .resourcePath="${this.resourcePath}" .theme="${this.theme}" .type="${e.data.type}"></iui-treelistitem>                          `)}                     </ul>                     <ul id="contentBlock" class="iui-treelist-block" style=${styleMap({position:"absolute",top:this._blockPos.top+"px",left:this._blockPos.left+"px",width:this._blockSize.width+"px",height:this._blockSize.height+"px",opacity:this._blockOpacity})}>                         ${this._currentList.map(e=>html`                             <iui-treelistitem .allowAnimation="${this.allowAnimation}" .colorScheme="${this._currentColorScheme}" .enabled="${e.data.enabled}" .text="${e.data.text}" .templateRef="${this._getItemTemplate(e.data)}" .data="${e.data}" .indent="${e.indent}" .customStyle="${this.customStyle}" .resourcePath="${this.resourcePath}" .state="${this._getItemState(e.data)}" .theme="${this.theme}" .type="${e.data.type}" @mouseDown="${t=>this._onItemMouseDown(t,e.data)}" @mouseEnter="${t=>this._onItemMouseEnter(t,e.data)}" @mouseLeave="${t=>this._onItemMouseLeave(t,e.data)}"></iui-treelistitem>                          `)}                     </ul>                     <ul id="rightBlock" class="iui-treelist-block" style=${styleMap({position:"absolute",top:this._rightBlockPos.top+"px",left:this._rightBlockPos.left+"px",width:this._blockSize.width+"px",height:this._maxBlockHeight+"px",opacity:this._rightBlockOpacity})}>                         ${this._nextList.map(e=>html`                             <iui-treelistitem .allowAnimation="${this.allowAnimation}" .colorScheme="${this._currentColorScheme}" .enabled="${e.data.enabled}" .text="${e.data.text}" .templateRef="${this._getItemTemplate(e.data)}" .data="${e.data}" .customStyle="${this.customStyle}" .resourcePath="${this.resourcePath}" .theme="${this.theme}" .type="${e.data.type}"></iui-treelistitem>                          `)}                     </ul>                 </div>                 ${this.isVerScrollVisible()?html`<iui-scrollbar id="ver-scroll" .colorScheme="${this._currentColorScheme}" .enabled="${this.enabled}" .value="${this._currentScrollPos.y}" .max="${this._maxScrollPos.y}" .largeChange="${this._scrollLargeChange.y}" .height="${this._scrollBarSize.height}" .theme="${this._currentTheme}" @mouseenter="${e=>this._scrollMouseEnter(e)}" @valueChanged="${e=>this._onVerticalScrollChanged(e)}" @scrollStart="${e=>this._onVerticalScrollStart(e)}" @scrollEnd="${e=>this._onVerticalScrollEnd(e)}"></iui-scrollbar>`:html``}             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiTreeListDefaultStyle.cssText,"../../icons",e)}_updateReferences(){this._blockElem=this.shadowRoot.querySelector("#contentBlock");this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=treelist]");this._headerElem=this.shadowRoot.querySelector("#header");this._leftBlockElem=this.shadowRoot.querySelector("#leftBlock");this._rightBlockElem=this.shadowRoot.querySelector("#rightBlock");if(this._blockElem)this._itemElems=this._blockElem.querySelectorAll("iui-treelistitem")}}window.customElements.define("iui-treelist",IntegralUITreeList);export default IntegralUITreeList;