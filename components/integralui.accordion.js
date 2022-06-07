/*
  filename: integralui.accordion.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import IntegralUIDataService from"../services/integralui.data.service.js";import{IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import{iuiAccordionDefaultStyle}from"../styles/default/integralui.accordion.style.js";import{iuiAccordionOfficeStyle}from"../styles/themes/office/integralui.accordion.office.js";import{iuiAccordionDarkStyle}from"../styles/color-schemes/dark/integralui.accordion.dark.js";import{iuiAccordionLightStyle}from"../styles/color-schemes/light/integralui.accordion.light.js";class IntegralUIAccordion extends IntegralUIBase{_init(){super._init();this._dataService=new IntegralUIDataService;this._dataGroups=[];this._groupList=[];this._numGroups=0;this._currentSelection=null;this._currentSelectedIndex=-1;this._selectedComponent=null;this._prevComponent=null;this._removeIndex=-1;this._toggleTimer=null;this._currentResourcePath="../icons";this._currentControlStyleSettings=iuiAccordionDefaultStyle;this._generalClassName="iui-accordion";this._initStyle()}connectedCallback(){}disconnectedCallback(){if(this.toggleTimer)clearInterval(this.toggleTimer);this._rt()}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},item:{general:{disabled:this._itemClassName+"-disabled",focused:this._itemClassName+"-focused",normal:this._itemClassName,hovered:this._itemClassName+"-hovered",selected:this._itemClassName+"-selected"},content:{disabled:this._itemContentClassName+"-disabled",focused:this._itemContentClassName+"-focused",normal:this._itemContentClassName,hovered:this._itemContentClassName+"-hovered",selected:this._itemContentClassName+"-selected"}}};this._updateStyle(this.controlStyle);this._updateControlClass();this._updateColorSchemeSettings(this._currentColorScheme);this.refresh()}static get properties(){return{groups:{type:Array},selectedGroup:{type:Object,attribute:"selected-group"},selectedIndex:{type:Number,attribute:"selected-index"}}}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s)}get groups(){return this._dataGroups}set groups(e){const t=this._dataGroups;this._dataGroups=e;this._updateData();this.requestUpdate("groups",t)}get selectedGroup(){return this._currentSelection}set selectedGroup(e){if(this._currentSelection!==e){const t=this._currentSelection;this._currentSelection=e;this.selectGroup(e);this.requestUpdate("selectedGroup",t)}}get selectedIndex(){return this._currentSelectedIndex}set selectedIndex(e){if(this._currentSelectedIndex!==e){const t=this._currentSelectedIndex;this._currentSelectedIndex=e;this._selectComponentByIndex(e);this.requestUpdate("selectedIndex",t)}}addGroup(e){this._callEventAdd("add",e)}clearGroups(){this._dataService.clear();this._invokeEvent("clear")}insertGroupAt(e,t){this.callEventAdd("at",e,t)}insertGroupBefore(e,t){this.callEventAdd("ref",e,-1,t)}insertGroupAfter(e,t){this.callEventAdd("ref",e,-1,t,!0)}removeGroup(e){this.callEventRemove(e)}removeGroupAt(e){if(this.groups&&e>=0&&e<this.groups.length)this._callEventRemove(this.groups[e])}_callEventAdd(e,t,s,n,i){let o={cancel:!1,group:t};this._invokeEvent("groupAdding",o);if(!0!==o.cancel){switch(e){case"at":this._dataService.insert(t,s);break;case"ref":this._dataService.insertByRef(t,n,i);break;default:this._dataService.insert(t)}this._invokeEvent("groupAdded",{group:t});this._refreshGroupParent();if(!this._selectedComponent)this._selectComponentByIndex(0)}}_callEventRemove(e){let t={cancel:!1,group:e};this._invokeEvent("groupRemoving",t);if(!0!==t.cancel){this.removeIndex=this.groups?this.groups.indexOf(e):-1;this._dataService.removeAt(e);this._invokeEvent("groupRemoved",{group:e});this._refreshGroupParent()}}_updateData(){this._dataService.init([{data:this.groups}])}collapse(e){let t=this.getComponentFromGroup(e);if(t)t.expanded=!1}expand(e){let t=this.getComponentFromGroup(e);if(t)t.expanded=!0}_closeGroups(e){this._groupList.forEach(function(t){if(t!==e){t.selected=!1;t.collapse()}})}_collapseComponent(e){if(!e)return;let t=this,s=setTimeout(function(){let n=0,i=e.getContentHeight();if(t.allowAnimation){let s=setInterval(function(){if(i>0){i=(i-=n=0===n?1:n+2)>0?i:0;e.setContentHeight(i+"px")}else{e.setContentHeight("0");e.expanded=!1;t.invokeCtrlEvent("AFTER_COLLAPSE",e);clearInterval(s)}},25)}else{e.setContentHeight("0");e.expanded=!1;t.invokeCtrlEvent("AFTER_COLLAPSE",e)}clearInterval(s)},100)}_toggleGroups(){let e=this;if(e._toggleTimer){e._endToggle();clearInterval(e._toggleTimer)}if(e._selectedComponent)e._toggleTimer=setTimeout(function(){let t=0,s=0,n=0,i=e._selectedComponent.getContentHeight(),o=0;if(e._selectedComponent.expanded){if(e._prevComponent)t=e._prevComponent.getContentHeight();e._selectedComponent.setContentDisplay("block");if(e.allowAnimation){let r=setInterval(function(){if(s<i){t=(t-=n=0===n?1:n+2)>0?t:0;o=.75*(s+=n)/i;e._selectedComponent.setOpacity(o);e._selectedComponent.setContentHeight(s+"px");if(e._prevComponent)e._prevComponent.setContentHeight(t+"px")}else{o=1;e._endToggle();if(e._prevComponent)e._prevComponent.setContentDisplay("none");clearInterval(r)}},15)}else{o=1;e._endToggle()}}else{e._selectedComponent.setContentDisplay("none");e._selectedComponent.setContentHeight("0");if(e._prevComponent)e._prevComponent.setContentHeight("auto")}clearTimeout(e._toggleTimer);e._toggleTimer=null},100)}_endToggle(){this._selectedComponent.setOpacity(1);this._selectedComponent.setContentHeight("auto");if(this._prevComponent){this._prevComponent.setContentHeight("0");this._prevComponent.expanded=!1;this.invokeCtrlEvent("AFTER_COLLAPSE",this._prevComponent)}this.invokeCtrlEvent("AFTER_EXPAND",this._selectedComponent)}_getGroupCurrentIndex(e){return e&&this._groupList?this._groupList.indexOf(e):-1}_getGroupDataIndex(e){if(e){let t=this._getGroupCurrentIndex(e);if(this.groups&&t>=0&&t<this.groups.length)return t}return-1}_getGroupData(e){return this.groups&&e>=0&&e<this.groups.length?this.groups[e]:null}_getGroupIndex(e){return e&&this.groups?this.groups.indexOf(e):-1}_getComponentData(e){if(e)if(e.data)return e.data;else{let t=this._getGroupDataIndex(e);if(this.groups&&t>=0&&t<this.groups.length)return this.groups[t]}return null}_getComponentFromGroup(e){let t=null;if(e)for(let s=0;s<this._groupList.length;s++)if(this._groupList[s].data&&this._groupList[s].data===e){t=this._groupList[s];break}return t}invokeCtrlEvent(e,t,s){let n=!0;if(this._isEnabled){let s=this._getComponentData(t),i={cancel:!1,group:s};switch(e){case"AFTER_COLLAPSE":this._invokeEvent("afterCollapse",{group:s});break;case"AFTER_EXPAND":this._invokeEvent("afterExpand",{group:s});this._closeGroups(t);break;case"AFTER_SELECT":this._invokeEvent("afterSelect",{group:s});break;case"BEFORE_COLLAPSE":this._invokeEvent("beforeCollapse",i);n=!i.cancel;break;case"BEFORE_EXPAND":this._invokeEvent("beforeExpand",i);n=!i.cancel;break;case"BEFORE_SELECT":this._invokeEvent("beforeSelect",i);n=!i.cancel;break;default:n=!0}}return n}invokeCtrlMethod(e,t){let s=!0;if(this._isEnabled)switch(e){case"COLLAPSE_GROUP":this._collapseComponent(t);break;case"SELECT_GROUP":if(this.invokeCtrlEvent("BEFORE_SELECT",t))if(s=this._selectComponent(t))this.invokeCtrlEvent("AFTER_SELECT",t);break;case"TOGGLE_GROUPS":this._selectComponent(t);this._toggleGroups();s=!1;break;default:s=!0}return s}_isIndexInRange(e){return this._groupList?e>=0&&e<this._groupList.length:!1}updateLayout(){this._ut();if(!this._tCmp)this._at()}clearSelection(){this._clearCmpSelection()}_clearCmpSelection(e){this._groupList.forEach(function(t){if(t!==e){t.selected=!1;t.expanded=!1}});if(!e)this._selectedComponent=null;if(this._prevComponent&&!this._prevComponent.expanded)this._prevComponent=null}_selectComponent(e){let t=this;if(e&&e!==t._selectedComponent){let s=t._getGroupCurrentIndex(e);t._currentSelectedIndex=s;if(t._groups&&s>=0&&s<t._groups.length)t._currentSelection=t._groups[s];t._prevComponent=t._selectedComponent;t._selectedComponent=e;t._clearCmpSelection(e);e.selected=!0;e.expanded=!0;this._invokeEvent("selectionChanged",{index:s,group:t._getGroupData(t._getGroupDataIndex(e))});return!0}return!1}_selectComponentByIndex(e){let t=this,s=setTimeout(function(){if(t._isIndexInRange(e))t._selectComponent(t._groupList[e]);clearTimeout(s)},100)}selectGroup(e){if(this.groups){this.currentSelectedIndex=this.groups.indexOf(e);this._selectComponentByIndex(this.currentSelectedIndex)}}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this.performUpdate()}_groupExpanding(e){e.cancel=!0;this.invokeCtrlMethod("TOGGLE_GROUPS",this._getComponentFromGroup(e.detail.group))}_groupExpanded(e){}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiAccordionDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiAccordionLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiAccordionOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=accordion]");this.updateLayout();this._refreshGroupParent()}_refreshGroupParent(){let e=this;setTimeout(function(){let t=e.shadowRoot.querySelector("slot").assignedNodes();e._groupList=t.filter(e=>"iui-groupbox"===e.nodeName.toLowerCase());e._groupList.forEach(t=>t.setParent(e))},100)}render(){return html`             <style> 				${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle} 			</style>             <div data-ctrl="accordion" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())}>                 <div>                     <slot @slotchange="${e=>this._slotChange(e)}"></slot>                 </div>             </div>         `}_slotChange(e){this.updateLayout();this._refreshGroupParent()}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiAccordionDefaultStyle.cssText,"../../icons",e)}}window.customElements.define("iui-accordion",IntegralUIAccordion);export default IntegralUIAccordion;