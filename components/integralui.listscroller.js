/*
  filename: integralui.listscroller.js
  version : 21.4.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,T as TemplateResult,a as defaultTemplateProcessor,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import IntegralUIDataService from"../services/integralui.data.service.js";import{IntegralUISpeedMode,IntegralUISortOrder,IntegralUITheme}from"./integralui.enums.js";import{iuiListScrollerDefaultStyle}from"../styles/integralui.listscroller.style.js";import{iuiListScrollerOfficeStyle}from"../themes/office/integralui.listscroller.office.js";import{iuiListScrollerMidnightStyle}from"../themes/midnight/integralui.listscroller.midnight.js";class IntegralUIListScroller extends IntegralUIBase{_init(){super._init();this._dataService=new IntegralUIDataService();this._currentList=[];this._currentDataFields={canSelect:"canSelect",content:"content",contextMenu:"contextMenu",enabled:"enabled",icon:"icon",id:"id",items:"items",selected:"selected",style:"style",text:"text",tooltip:"tooltip",value:"value",visible:"visible"};this._dataItems=[];this._isChangeActive=!1;this._scrollItemList=[];this._stopTimer=!0;this._valueTimer=null;this._valueCount=0;this._hoverItem=null;this._currentFocusItem=null;this._isFocusAllowed=!1;this._isKeyboardActive=!1;this._blockSize={width:0,height:0};this._clientRect={width:0,height:0};this._contentOpacity=1;this._contentSize={width:0,height:0};this._currentIndex=0;this._prevIndex=0;this._updateTimer=null;this._clientSpace={width:0,height:0};this._contentPos={top:0,left:0};this._currentItemSize={width:48,height:48};this._leftRightMarginTop=0;this._topBotomMarginLeft=0;this._currentMouseWheelSpeed=IntegralUISpeedMode.Normal;this._currentScrollPos={x:0,y:0};this._initPos={x:0,y:0};this._maxScrollPos={x:0,y:0};this._prevScrollPos={x:0,y:0};this._scrollSize={width:0,height:0};this._currentSelection=null;this._removeIndex=-1;this._currentSorting=IntegralUISortOrder.None;this._sortComparer=null;this._generalClassName="iui-listscroller";this._itemClassName="iui-listscroller-item";this._itemContentClassName=this._itemClassName+"-content";this._refreshTimer=null;this._currentControlStyleSettings=iuiListScrollerDefaultStyle;this._updateDataFields();this._updateData();this._updateCurrentList();this._initStyle()}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},item:{general:{disabled:this._itemClassName+"-disabled",focused:this._itemClassName+"-focused",normal:this._itemClassName,hovered:this._itemClassName+"-hovered",selected:this._itemClassName+"-selected"},content:{disabled:this._itemContentClassName+"-disabled",focused:this._itemContentClassName+"-focused",normal:this._itemContentClassName,hovered:this._itemContentClassName+"-hovered",selected:this._itemContentClassName+"-selected"}}};this.refresh()}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{allowFocus:{type:Boolean,attribute:"allow-focus",reflect:!0},items:{type:Array},itemSize:{type:Object,attribute:"item-size"},mouseWheelSpeed:{attribute:"mousewheel-speed",converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"veryslow":return IntegralUISpeedMode.VerySlow;case"slow":return IntegralUISpeedMode.Slow;case"fast":return IntegralUISpeedMode.Fast;case"veryfast":return IntegralUISpeedMode.VeryFast;default:return IntegralUISpeedMode.Normal}},toAttribute:e=>{switch(e){case IntegralUISpeedMode.VerySlow:return"VerySlow";case IntegralUISpeedMode.Slow:return"Slow";case IntegralUISpeedMode.Fast:return"Fast";case IntegralUISpeedMode.VeryFast:return"VeryFast";default:return"Normal"}}},reflect:!0},selectedItem:{type:Object,attribute:"selected-item"},sorting:{converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"ascending":return IntegralUISortOrder.Ascending;case"descending":return IntegralUISortOrder.Descending;default:return IntegralUISpeedMode.None}},toAttribute:e=>{switch(e){case IntegralUISortOrder.Ascending:return"Ascending";case IntegralUISortOrder.Descending:return"Descending";default:return"None"}}},reflect:!0}}}set allowFocus(e){if(this._isFocusAllowed!==e){const t=this._isFocusAllowed;this._isFocusAllowed=e;if(!e)this._currentFocusObj=null;this.refresh();this.requestUpdate("allowFocus",t);this.updateLayout()}}get dataFields(){return this._currentDataFields}set dataFields(e){const t=this._currentDataFields;this._updateDataFields(e);this.requestUpdate("dataFields",t)}get items(){return this._dataItems}set items(e){const t=this._dataItems;this._dataItems=e;this._updateData();this.requestUpdate("items",t)}get itemSize(){return this._currentItemSize}set itemSize(e){if(e){const t=this._currentItemSize;this._currentItemSize={width:e.width>0?e.width:0,height:e.height>0?e.height:0};this.requestUpdate("itemSize",t);this.updateLayout()}}get mouseWheelSpeed(){return this._currentMouseWheelSpeed}set mouseWheelSpeed(e){if(this._currentMouseWheelSpeed!==e){const t=this._currentMouseWheelSpeed;this._currentMouseWheelSpeed=e;this.requestUpdate("mouseWheelSpeed",t)}}get selectedItem(){return this._currentSelection}set selectedItem(e){if(this._currentSelection!==e){const t=this._currentSelection;let i=this,s=setTimeout(function(){i._processSelection(e);i.requestUpdate("selectedItem",t);clearTimeout(s)},1)}}get sorting(){return this._currentSorting}set sorting(e){if(this._currentSorting!==e){const t=this.__currentSorting;this.__currentSorting=e;this.requestUpdate("sorting",t)}}addItem(e){this._callEventAdd("add",e,-1)}clearItems(){this._currentSelection=null;this._dataService.clear();this._invokeEvent("clear");this.updateLayout()}insertItemAt(e,t){this._callEventAdd("at",e,t)}insertItemBefore(e,t){this._callEventAdd("ref",e,-1,t)}insertItemAfter(e,t){this._callEventAdd("ref",e,-1,t,!0)}removeItem(e){return this._callEventRemove(e)}removeItemAt(e){return this._callEventRemove(null,e)}_callEventAdd(e,t,i,s,l){if(!0!==this._invokeEvent("itemAdding",{cancel:!1,item:t}).cancel){switch(e){case"at":this._dataService.insert(t,i);break;case"ref":this._dataService.insertByRef(t,s,l);break;default:this._dataService.insert(t,-1)}this._invokeEvent("itemAdded",{item:t})}}_callEventRemove(e,t){if(!0!==this._invokeEvent("itemRemoving",{cancel:!1,item:e}).cancel){this._removeIndex=this._dataItems?this._dataItems.indexOf(e):-1;let i=this._dataService.removeAt(e,t);if(i.result){this._invokeEvent("itemRemoved",{item:i.obj});return!0}}return!1}_addItemToCurrentList(e){e.type="item";if(!e[this._currentDataFields.id])e[this._currentDataFields.id]=this._commonService.getUniqueId();if(this._isItemAllowed(e))this._currentList.push({data:e})}_updateCurrentList(){this._currentList.length=0;let e=this._dataService.getList();if(e){this._applySorting(e);e.forEach(e=>this._addItemToCurrentList(e))}}_updateScrollItemList(){this._scrollItemList.length=0;let e={x:this._initPos.x-this._currentScrollPos.x,y:this._initPos.y-this._currentScrollPos.y};e.y=0;let t=0;for(let i=this._currentIndex;i<this._currentList.length;i++,t++){let s={data:this._currentList[i].data,index:i-this._currentIndex,position:{x:0,y:0},style:{},tabIndex:t};s.position={x:e.x,y:e.y};e.x+=this._currentItemSize.width;this._updateItemStyle(s);this._scrollItemList.push(s)}}_updateData(){this._dataService.init([{data:this._dataItems,fields:this._currentDataFields}])}_updateDataFields(e){if(e)this._currentDataFields={canSelect:e.canSelect?e.canSelect:"canSelect",content:e.content?e.content:"content",contextMenu:e.contextMenu?e.contextMenu:"contextMenu",enabled:e.enabled?e.enabled:"enabled",icon:e.icon?e.icon:"icon",iconUrl:e.iconUrl?e.iconUrl:"iconUrl",id:e.id?e.id:"id",items:e.items?e.items:"items",selected:e.selected?e.selected:"selected",style:e.style?e.style:"style",text:e.text?e.text:"text",tooltip:e.tooltip?e.tooltip:"tooltip",value:e.value?e.value:"value",visible:e.visible?e.visible:"visible"};else this._currentDataFields={canSelect:"canSelect",content:"content",contextMenu:"contextMenu",enabled:"enabled",icon:"icon",iconUrl:"iconUrl",id:"id",items:"items",selected:"selected",style:"style",text:"text",tooltip:"tooltip",value:"value",visible:"visible"};if(this._dataService)this._dataService.updateDataFields(this._currentDataFields)}cloneItem(e){return this._dataService.clone(e)}_getItemIndex(e){let t=-1;for(let i=0;i<this._currentList.length;i++)if(this._currentList[i].data===e){t=i;break}return t}_isItemAllowed(e){return!0}_isItemEnabled(e){return!0}_isItemHovered(e){return e&&e===this._hoverItem?!0:!1}_isItemSelected(e){return e&&!0===e[this._currentDataFields.selected]?!0:!1}_itemMouseEnter(e,t){if(this._isEnabled){this._hoverItem=t.data;this._updateItemStyle(t);this.update()}}_itemMouseLeave(e,t){if(this._isEnabled){this._hoverItem=null;this._updateItemStyle(t);this.update()}}_getContentSize(){return{width:0,height:0}}refresh(){this._updateControlClass();this._scrollItemList.map(e=>this._updateItemStyle(e));this.update();this._updateReferences()}_resetLayout(){if(this.updateTimer)clearTimeout(this.updateTimer);this.updateTimer=null}suspendLayout(){this.allowUpdate=!1}resumeLayout(){this.allowUpdate=!0;this.updateLayout()}async updateLayout(){await this._processUpdateLayout();this.update()}_processUpdateLayout(){let e=this;return new Promise(t=>{e._contentOpacity=0;e.update();e._updateTimer=setTimeout(function(){e._updateCurrentList();if(0===e._currentList.length)e._currentScrollPos={x:0,y:0};e._clientRect={width:e._elemRef.clientWidth,height:e._elemRef.clientHeight};e._initPos={x:(e._clientRect.width-e._currentItemSize.width)/2,y:(e._clientRect.height-e._currentItemSize.height)/2};if(e._leftrightButtonsElem)e._initPos.x-=e._leftrightButtonsElem.offsetWidth+1;else if(e._topBottomButtonsElem)e._initPos.y-=e._topBottomButtonsElem.offsetHeight+1;e._updateScrollItemList();e._contentOpacity=1;let i=setTimeout(function(){e._updateScrollSize();e._updateSelection();e.refresh();e._invokeEvent("updateComplete");clearTimeout(i);t()},1);clearTimeout(e._updateTimer)},100)})}updateView(){this._updateScrollItemList()}_ctrlMouseWheel(e){if(this._isEnabled)this._processMouseWheel(e)}_itemMouseDown(e,t){if(this._isEnabled){if(this._isFocusAllowed&&1===e.buttons)this._currentFocusItem=t.data;this._processSelection(t.data)}e.stopPropagation()}_itemMouseUp(e,t){}_itemClickEvent(e,t){if(this._isEnabled)if(1===e.which)this._invokeEvent("itemClick",{item:t.data});e.stopPropagation()}_onMouseDown(e,t){this._startChange(t)}_onMouseUp(e){this._stopChange()}_onScroll(e){if(e.target){e.target.scrollTop=0;e.target.scrollLeft=0}}_changeHorizontalScrollPos(e){this._currentScrollPos.x=Math.max(0,Math.min(e,this._maxScrollPos.x));if(this._currentScrollPos.x!==this._prevScrollPos.x){this.updateView();this._invokeEvent("scrollPosChanged",{value:this._currentScrollPos});this._prevScrollPos.x=this._currentScrollPos.x}}_changeVerticalScrollPos(e){this._currentScrollPos.y=Math.max(0,Math.min(e,this._maxScrollPos.y));if(this._currentScrollPos.y!==this._prevScrollPos.y){this.updateView();this._invokeEvent("scrollPosChanged",{value:this._currentScrollPos});this._prevScrollPos.y=this._currentScrollPos.y}}scrollPos(e){if(e){this._currentScrollPos={x:Math.max(0,Math.min(e.x,this._maxScrollPos.x)),y:Math.max(0,Math.min(e.y,this._maxScrollPos.y))};this._updateSelection();this.updateView();this._invokeEvent("scrollPosChanged",{value:this._currentScrollPos})}return{x:Math.floor(this._currentScrollPos.x),y:Math.floor(this._currentScrollPos.y)}}_processMouseWheel(e){if(this._isEnabled){e.preventDefault();this._hoverItem=null;let t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),i=1;switch(this._currentMouseWheelSpeed){case IntegralUISpeedMode.VerySlow:i=.25;break;case IntegralUISpeedMode.Slow:i=.5;break;case IntegralUISpeedMode.Fast:i=1.5;break;case IntegralUISpeedMode.VeryFast:i=3;break;default:i=1}let s=this._currentItemSize.width*i,l=this._currentScrollPos.x+s*t*-1;this._changeHorizontalScrollPos(l);this._updateSelection();this.updateView();e.stopPropagation()}}_updateScrollSize(){let e=this._commonService.getBorderWidth(this._blockElem),t=this._commonService.getMargin(this._blockElem),i=this._commonService.getPadding(this._blockElem);if(this._leftrightButtonsElem){this._contentSize={width:this._clientRect.width-(e.left+e.right+t.left+t.right+i.left+i.right+2*this._leftrightButtonsElem.offsetWidth)-2,height:this._clientRect.height};if(this._blockElem)this._leftRightMarginTop=(this._clientRect.height-this._leftrightButtonsElem.offsetHeight)/2;this._contentPos={left:this._leftrightButtonsElem.offsetWidth+1,top:0}}this._scrollSize={width:this._currentItemSize.width*(this._currentList.length-1),height:this._currentItemSize.height*(this._currentList.length-1)};this._scrollSize.width=this._scrollSize.width>0?this._scrollSize.width:0;this._scrollSize.height=this._scrollSize.height>0?this._scrollSize.height:0;this._maxScrollPos={x:this._scrollSize.width,y:this._scrollSize.height};if(this._currentScrollPos.x>this._maxScrollPos.x)this._changeHorizontalScrollPos(this._maxScrollPos.x);if(this._currentScrollPos.y>this._maxScrollPos.y)this._changeVerticalScrollPos(this._maxScrollPos.y);this._clientSpace={width:this._clientRect.width,height:this._clientRect.height}}_changeValueTimerElapsed(e){if(0===this._valueCount)this._valueCount=this._currentItemSize.width;this._stopTimer=!1;this._changeValue(e);if(this._stopTimer){clearInterval(this._valueTimer);this._isChangeActive=!1}}_changeValue(e){if(e)if(this._currentScrollPos.x+this._valueCount<this._maxScrollPos.x)this._changeHorizontalScrollPos(this._currentScrollPos.x+this._valueCount);else{this._stopTimer=!0;this._changeHorizontalScrollPos(this._maxScrollPos.x)}else if(this._currentScrollPos.x-this._valueCount>0)this._changeHorizontalScrollPos(this._currentScrollPos.x-this._valueCount);else{this._stopTimer=!0;this._changeHorizontalScrollPos(0)}this._updateSelection();this.updateView()}prevItem(){this._changeHorizontalScrollPos(this._currentScrollPos.x-this._currentItemSize.width);this._updateSelection();this.updateView()}nextItem(){this._changeHorizontalScrollPos(this._currentScrollPos.x+this._currentItemSize.width);this._updateSelection();this.updateView()}_startChange(e){let t=this;if(t._valueTimer)clearInterval(t._valueTimer);t._valueCount=0;t._isChangeActive=!0;t._valueTimer=setInterval(function(){t._changeValueTimerElapsed(e)},100)}_stopChange(){if(this._valueTimer)clearInterval(this._valueTimer);this._isChangeActive=!1}findItemById(e){return this._dataService.findObjectById(e)}findItemByText(e){return this._dataService.findObjectByText(e)}_callAfterSelectEvent(e){let t={item:e};this._invokeEvent("afterSelect",t);this._invokeEvent("selectionChanged",t)}_clearPrevSelection(){if(this._currentSelection)this._currentSelection[this._currentDataFields.selected]=!1;this._currentSelection=null}_processSelection(e){let t=!0;if(e)if(!this._isItemEnabled(e)){this._clearPrevSelection();this.refresh();this._invokeEvent("selectionChanged",{item:null})}else{let i=this._currentSelection,s=!0;if(i)s=!this._commonService.isEqual(i[this._currentDataFields.id],e[this._currentDataFields.id])||!1===i[this._currentDataFields.selected];let l={cancel:!1,item:e};this._invokeEvent("beforeSelect",l);t=!0===l.cancel?!1:!0;if(s&&!0!==l.cancel){this._clearPrevSelection();this._currentSelection=e;e[this._currentDataFields.selected]=!0;let t=this._getItemIndex(e);if(t>=0)this._changeHorizontalScrollPos(t*this._currentItemSize.width);this._callAfterSelectEvent(e);this.refresh()}}return t}_updateSelection(){let e=Math.floor(this._currentScrollPos.x/this._currentItemSize.width);if(this._commonService.isIndexInRange(e,this._currentList))this._processSelection(this._currentList[e].data)}_applySorting(e){let t=this;if(e)if(t._sortComparer)e.sort(t._sortComparer);else if(t._isSortingAllowed())e.sort(function(e,i){let s=null,l=null;if(!(s=e[t._currentDataFields.value]))s=e[t._currentDataFields.text];if(t._commonService.isObject(s))s=s.value?s.value:s.text;if(!(l=i[t._currentDataFields.value]))l=i[t._currentDataFields.text];if(t._commonService.isObject(l))l=l.value?l.value:l.text;s=void 0!==s?s:null;l=void 0!==l?l:null;switch(t._currentSorting){case IntegralUISortOrder.Ascending:if(s<l)return-1;else if(s>l)return 1;break;case IntegralUISortOrder.Descending:if(s>l)return-1;else if(s<l)return 1;break;default:return 0}return 0})}_isSortingAllowed(){return this._currentSorting===IntegralUISortOrder.Ascending||this._currentSorting===IntegralUISortOrder.Descending}sort(e,t){this._currentSorting=e;this._sortComparer=t?t:null;this.updateLayout();this._invokeEvent("sorted")}_getControlStyle(){let e={height:this._currentItemSize.height+2+"px"};if(this._ctrlSize.width>0)e.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)e.height=this._ctrlSize.height+"px";return e}_updateItemStyle(e){if(e){e.style={general:{},content:{}};e.style.general[this._itemClassName]=!0;e.style.general[this._defaultStyle.item.general.normal]=!0;e.style.content[this._itemContentClassName]=!0;e.style.content[this._defaultStyle.item.content.normal]=!0;if(!this._isItemEnabled(e.data)){e.style.general[this._defaultStyle.item.general.disabled]=!0;e.style.content[this._defaultStyle.item.content.disabled]=!0}else if(this._isItemSelected(e.data)){e.style.general[this._defaultStyle.item.general.selected]=!0;e.style.content[this._defaultStyle.item.content.selected]=!0}else if(this._isItemHovered(e.data)){e.style.general[this._defaultStyle.item.general.hovered]=!0;e.style.content[this._defaultStyle.item.content.hovered]=!0}if(e.data===this._currentFocusItem)e.style.general[this._defaultStyle.item.general.focused]=!0}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiListScrollerOfficeStyle.cssText,"../../icons",this._currentResourcePath);break;case IntegralUITheme.Midnight:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiListScrollerMidnightStyle.cssText,"../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}_getItemTemplate(e){if(this.itemTemplate){let t=this.itemTemplate(e);return new TemplateResult(t.strings,t.values,"html",defaultTemplateProcessor)}else{let t={},i=this._commonService.isString(e[this._currentDataFields.icon])?e[this._currentDataFields.icon].split(" "):[];i.map(e=>t[e]=!0);return html`                 ${i.length>0?html`<span class=${classMap(t)}></span>`:html``}                 ${e[this._currentDataFields.iconUrl]?html`<img style=${styleMap({verticalAlign:"middle"})} src="${e[this._currentDataFields.iconUrl]} />`:html``}                 <span class="iui-item-label" >${e[this._currentDataFields.text]}</span>             `}}firstUpdated(e){this._updateReferences();this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="listscroller" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} @DOMMouseScroll="${e=>this._ctrlMouseWheel(e)}" @mousewheel="${e=>this._ctrlMouseWheel(e)}" @scroll="${e=>this._onScroll(e)}">                 <div id="leftright-buttons" class="iui-listscroller-leftright-buttons" style=${styleMap({float:"left",marginTop:this._leftRightMarginTop+"px"})} @click="${e=>this.prevItem()}" @mousedown="${e=>this._onMouseDown(e)}" @mouseup="${e=>this._onMouseUp(e)}">                     <span class="iui-listscroller-leftright-decrease"></span>                 </div>                 <ul id="block" style=${styleMap({left:this._contentPos.left+"px",top:this._contentPos.top+"px",width:this._contentSize.width+"px",height:this._contentSize.height+"px",opacity:this._contentOpacity})}>                     ${this._scrollItemList.map((e,t)=>html`                         <li id="item-elem" class=${classMap(e.style.general)} style=${styleMap({position:"absolute",top:e.position.y+"px",left:e.position.x+"px",width:this._currentItemSize.width+"px",height:this._currentItemSize.height+"px"})} @click="${t=>this._itemClickEvent(t,e)}" @mousedown="${t=>this._itemMouseDown(t,e)}" @mouseup="${t=>this._itemMouseUp(t,e)}" @mouseenter="${t=>this._itemMouseEnter(t,e)}" @mouseleave="${t=>this._itemMouseLeave(t,e)}">                             <div class=${classMap(e.style.content)} tabindex="${e.tabIndex}">                                 ${this._getItemTemplate(e.data)}                             </div>                         </li>`)}                 </ul>                 <div class="iui-listscroller-leftright-buttons" style=${styleMap({float:"right",marginTop:this._leftRightMarginTop+"px"})} @click="${e=>this.nextItem()}" @mousedown="${e=>this._onMouseDown(e,!0)}" @mouseup="${e=>this._onMouseUp(e)}">                     <span class="iui-listscroller-leftright-increase"></span>                 </div>             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiListScrollerDefaultStyle.cssText,"../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=listscroller]");this._blockElem=this.shadowRoot.querySelector("#block");this._leftrightButtonsElem=this.shadowRoot.querySelector("#leftright-buttons")}}window.customElements.define("iui-listscroller",IntegralUIListScroller);export default IntegralUIListScroller;