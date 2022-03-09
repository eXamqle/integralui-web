/*
  filename: integralui.listgroup.js
  version : 22.1.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIDataService from"../services/integralui.data.service.js";import IntegralUIGroupBox from"./integralui.groupbox.js";import"./integralui.header.js";import{IntegralUIObjectState,IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import{iuiHeaderDefaultStyle}from"../styles/default/integralui.header.style.js";import{iuiListGroupDefaultStyle}from"../styles/default/integralui.listgroup.style.js";import{iuiListGroupOfficeStyle}from"../styles/themes/office/integralui.listgroup.office.js";import{iuiListGroupDarkStyle}from"../styles/color-schemes/dark/integralui.listgroup.dark.js";import{iuiListGroupLightStyle}from"../styles/color-schemes/light/integralui.listgroup.light.js";class IntegralUIListGroup extends IntegralUIGroupBox{_init(){super._init();this._dataService=new IntegralUIDataService();this._dataItems=[];this._itemList=[];this._contentDisplay="none";this._currentControlStyleSettings=iuiListGroupDefaultStyle;this._initStyle()}connectedCallback(){}disconnectedCallback(){}_initContent(){let e=this,t=setTimeout(function(){if(e._contentSlotElem)e._maxBlockHeight=e._contentElem.offsetHeight;clearTimeout(t)},100)}_initStyle(){this._generalClassName="iui-listgroup";this._headerClassName=this._generalClassName+"-header";this._headerExpandBoxClassName=this._headerClassName+"-expand-box";this._contentClassName=this._generalClassName+"-content";this._itemClassName=this._generalClassName+"-item";this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},header:{general:{disabled:this._headerClassName+"-disabled",focused:this._headerClassName+"-focused",normal:this._headerClassName,hovered:this._headerClassName+"-hovered",selected:this._headerClassName+"-selected"},expandBox:this._headerExpandBoxClassName},content:{general:this._contentClassName,expanded:this._contentClassName+"-expand",collapsed:this._contentClassName+"-collapse"},item:{general:{disabled:this._itemClassName+"-disabled",focused:this._itemClassName+"-focused",normal:this._itemClassName,hovered:this._itemClassName+"-hovered",selected:this._itemClassName+"-selected"}}};this._updateColorSchemeSettings(this._currentColorScheme);this.refresh()}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s)}static get properties(){return{items:{type:Array}}}get items(){return this._dataItems}set items(e){const t=this._dataItems;this._dataItems=e;this._updateData();this.requestUpdate("items",t)}_updateData(){this._dataService.init([{data:this.items}])}_onHeaderClick(e){let t=this;if(t._isEnabled&&1===e.detail.which){t.selected=!0;if(!t._supressCallback&&t._parentCtrl&&t._parentCtrl.invokeCtrlMethod)t._parentCtrl.invokeCtrlMethod("SELECT_GROUP",t);if(!t._supressCallback&&!t.expanded)t.expanded=!0;t._isClicked=!0;t._clickPos=t._commonService.getClientPos(e,t._headerElem);let s=setTimeout(function(){t._isClicked=!1;clearTimeout(s)},500)}}_onHeaderExpand(e){this._supressCallback=!0;this.expanded=!this.expanded;e.detail.stopPropagation()}_toggleContent(){let e=this,t=0,s=0;this._contentOpacity=1;if(e.expanded){e._contentDisplay="block";if(e.allowAnimation){let i=setInterval(function(){if(t<e._maxBlockHeight){t+=s=0===s?1:s+2;e._contentHeight=t+"px";e.update()}else{e._contentHeight="auto";e._expandState="none";e._callAfterEvent(!0,e._supressCallback);e._supressCallback=!1;e._updateParent();e.update();clearInterval(i)}},15)}else{e._contentHeight="auto";e._expandState="none";e._callAfterEvent(!0,e._supressCallback);e._supressCallback=!1;e._updateParent();e.update()}}else{e._maxBlockHeight=e._contentElem.offsetHeight;t=e._maxBlockHeight;if(e.allowAnimation){let i=setInterval(function(){if(t>0){t-=s=0===s?1:s+2;e._contentHeight=t+"px";e.update()}else{e._contentDisplay="none";e._contentHeight="0";e._expandState="none";e._callAfterEvent();e._supressCallback=!1;e._updateParent();e.update();clearInterval(i)}},15)}else{e._contentDisplay="none";e._contentHeight="0";e._expandState="none";e._callAfterEvent();e._supressCallback=!1;e._updateParent();e.update()}}}invokeCtrlMethod(e,t){let s=!0;if(this._isEnabled)switch(e){case"ITEM_SELECT":if(t){this.clearSelection();t.state|=IntegralUIObjectState.Selected;this.selected=!0;if(!this._supressCallback&&this._parentCtrl&&this._parentCtrl.invokeCtrlMethod)this._parentCtrl.invokeCtrlMethod("SELECT_GROUP",this);this._invokeEvent("afterSelect",{group:this._data,item:this._getComponentData(t)})}break;default:s=!0}return s}_getComponentData(e){if(e)if(e.data)return e.data;else{let t=this._getItemDataIndex(e);if(this.items&&t>=0&&t<this.items.length)return this.items[t]}return null}_getItemCurrentIndex(e){return e&&this._itemList?this._itemList.indexOf(e):-1}_getItemDataIndex(e){if(e){let t=this._getItemCurrentIndex(e);if(this.items&&t>=0&&t<this.items.length)return t}return-1}clearSelection(e){this._itemList.forEach(function(t){if(t!==e)t.state&=~IntegralUIObjectState.Selected})}_getControlStyle(){let e={};if(this._ctrlSize.width>0)e.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)e.height=this._ctrlSize.height+"px";return e}_getItemGeneralStyle(e){if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this._itemClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this._itemClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this._itemClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this._itemClassName),selected:this._commonService.isFieldAvailable(e.selected,this._itemClassName+"-selected")};else return{disabled:this._defaultStyle.item.general.disabled,focused:this._defaultStyle.item.general.focused,hovered:this._defaultStyle.item.general.hovered,normal:this._defaultStyle.item.general.normal,selected:this._defaultStyle.item.general.selected}}_getItemStyle(e){return{general:this._getItemGeneralStyle(e.general)}}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general),header:this._getHeaderStyle(e.header),content:this._getContentStyle(e.content),item:this._getItemStyle(e.item)};else this._options.currentStyle={general:{disabled:this._defaultStyle.general.disabled,focused:this._defaultStyle.general.focused,hovered:this._defaultStyle.general.hovered,normal:this._defaultStyle.general.normal,selected:this._defaultStyle.general.selected},header:{general:{disabled:this._defaultStyle.header.general.disabled,focused:this._defaultStyle.header.general.focused,hovered:this._defaultStyle.header.general.hovered,normal:this._defaultStyle.header.general.normal,selected:this._defaultStyle.header.general.selected},expandBox:this._defaultStyle.header.expandBox},content:{general:this._defaultStyle.content.general,expanded:this._defaultStyle.content.expanded,collapsed:this._defaultStyle.content.collapsed},item:{general:{disabled:this._defaultStyle.item.general.disabled,focused:this._defaultStyle.item.general.focused,hovered:this._defaultStyle.item.general.hovered,normal:this._defaultStyle.item.general.normal,selected:this._defaultStyle.item.general.selected}}}}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiListGroupDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiListGroupLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiListGroupOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this._initContent();this.updateLayout()}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this._updateContentClass();this._updateHeaderBlockClass();this.update();this._updateReferences()}render(){return html`             <style> 				${this._currentControlStyleSettings} 				${iuiHeaderDefaultStyle}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings} 				${this._currentCustomStyle} 			</style>             <div data-ctrl="listgroup" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())}>                 <iui-header id="group-header" .colorScheme="${this._currentColorScheme}" .controlStyle="${this._getCurrentHeaderStyle()}" .customStyle="${[this._currentControlStyleSettings,this._currentThemeSettings,this._currentColorSchemeSettings]}" .enabled="${this.enabled}" .icon="${this.icon}" .text="${this.text}" .animationType="${this.expandBoxType}" .theme="${this._currentTheme}" @mouseDown="${e=>this._onHeaderClick(e)}"  @expandClicked="${e=>this._onHeaderExpand(e)}">                     ${this.allowAnimation&&this._isClicked?html`                             <span class="iui-groupbox-header-animate-select-block" style=${styleMap({height:this._headerSize.height+"px",width:this._clickPos.x+"px"})}>                                 <span class=${classMap({"iui-groupbox-header-animate-select":this._isClicked,"iui-groupbox-header-animate-select-left":this._isClicked})} style=${styleMap({height:this._headerSize.height+"px"})}></span>                             </span>                             <span class="iui-groupbox-header-animate-select-block" style=${styleMap({left:this._clickPos.x+"px",height:this._headerSize.height+"px",width:this._headerSize.width-this._clickPos.x+"px"})}>                                 <span class=${classMap({"iui-groupbox-header-animate-select":this._isClicked,"iui-groupbox-header-animate-select-right":this._isClicked})} style=${styleMap({height:this._headerSize.height+"px"})}></span>                             </span>`:html``}                 </iui-header> 				<div id="group-content" class=${classMap(this._getContentClass())} style=${styleMap({"border-width":this.expanded?"1px":"1px",display:this._contentDisplay,height:this._contentHeight,opacity:this._contentOpacity})}>                     <slot></slot>                 </div> 		    </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiListGroupDefaultStyle.cssText,"../../icons",e)}_updateItemList(){this._itemList=this._contentSlotElem?this._contentSlotElem.filter(e=>"iui-item"===e.nodeName.toLowerCase()):[];this._itemList.forEach(e=>{e.setParent(this)})}_updateParent(){if(!this._supressCallback&&this._parentCtrl&&this._parentCtrl.updateLayout)this._parentCtrl.updateLayout()}_updateReferences(){this._contentElem=this.shadowRoot.querySelector("#group-content");this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=listgroup]");this._header=this.shadowRoot.querySelector("#group-header");let e=this;setTimeout(function(){e._contentSlotElem=e.shadowRoot.querySelector("slot").assignedNodes();e._updateItemList()},10)}}window.customElements.define("iui-listgroup",IntegralUIListGroup);export default IntegralUIListGroup;