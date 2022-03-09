/*
  filename: integralui.autocomplete.js
  version : 22.1.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import IntegralUIDataService from"../services/integralui.data.service.js";import IntegralUIFilterService from"../services/integralui.filter.service.js";import{IntegralUISortOrder,IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import IntegralUIDropDown from"./integralui.dropdown.js";import"./integralui.list.js";import{iuiAutoCompleteDefaultStyle}from"../styles/default/integralui.autocomplete.style.js";import{iuiAutoCompleteOfficeStyle}from"../styles/themes/office/integralui.autocomplete.office.js";import{iuiAutoCompleteDarkStyle}from"../styles/color-schemes/dark/integralui.autocomplete.dark.js";import{iuiAutoCompleteLightStyle}from"../styles/color-schemes/light/integralui.autocomplete.light.js";class IntegralUIAutoComplete extends IntegralUIBase{_init(){super._init();this._dataService=new IntegralUIDataService();this._filterService=new IntegralUIFilterService();this._currentFields={};this._currentList=[];this._currentMaxDropDownItems=5;this._currentPlaceHolder="Placeholder text";this._currentSelection=null;this._currentText="";this._dataList=[];this._cmpRef=null;this._currentDropDownSize={width:0,height:0};this._dropList=null;this._isDropDownVisible=!1;this._filterParams=null;this._isFocused=!1;this._keepActive=!1;this._currentSorting=this._sortComparer=null;this._currentControlStyleSettings=iuiAutoCompleteDefaultStyle;this._generalClassName="iui-autocomplete";this._updateData();this._updateDataFields();this._updateCurrentList();this._initStyle()}connectedCallback(){}disconnectedCallback(){this._removeDropDown()}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{dataFields:{type:Object,attribute:"data-fields"},dropDownSize:{type:Object,attribute:"dropdown-size"},list:{type:Array},maxDropDownItems:{type:Number,attribute:"max-dropdown-items",reflect:!0},placeHolder:{type:String,attribute:"place-holder",reflect:!0},text:{type:String,reflect:!0}}}get dataFields(){return this._currentFields}set dataFields(e){const t=this._currentFields;this._updateDataFields(e);this.requestUpdate("dataFields",t)}get dropDownSize(){return this._currentDropDownSize}set dropDownSize(e){if(e){let t=!1;const i=this._currentDropDownSize;if(void 0!==e.width&&this._currentDropDownSize.width!==e.width){this._currentDropDownSize.width=e.width;t=!0}if(void 0!==e.height&&this._currentDropDownSize.height!==e.height){this._currentDropDownSize.height=e.height;t=!0}if(t){this.updateLayout();this.requestUpdate("dropDownSize",i)}}}get list(){return this._dataList}set list(e){const t=this._dataList;this._dataList=e;this._updateData();this.requestUpdate("list",t)}get maxDropDownItems(){return this._currentMaxDropDownItems}set maxDropDownItems(e){if(this._currentMaxDropDownItems!==e){const t=this._currentMaxDropDownItems;this._currentMaxDropDownItems=e;this.requestUpdate("maxDropDownItems",t)}}get placeHolder(){return this._currentPlaceHolder}set placeHolder(e){if(this._currentPlaceHolder!==e){const t=this._currentPlaceHolder;this._currentPlaceHolder=e;this.requestUpdate("placeHolder",t)}}get text(){return this._currentText}set text(e){if(this._currentText!==e){const t=this._currentText;this._currentText=e;this.requestUpdate("text",t)}}_updateDataFields(e){if(e)this._currentFields={icon:e.icon?e.icon:"icon",id:e.id?e.id:"id",style:e.style?e.style:"style",text:e.text?e.text:"text",visible:e.visible?e.visible:"visible",value:e.value?e.value:"value"};else this._currentFields={icon:"icon",id:"id",style:"style",text:"text",visible:"visible",value:"value"};if(this._dataService)this._dataService.updateDataFields(this._currentFields)}_addItemToCurrentList(e){e.type="item";if(!e[this._currentFields.id])e[this._currentFields.id]=this._commonService.getUniqueId();if(this._isItemAllowed(e))this._currentList.push(e)}_updateCurrentList(){let e=this;e._currentList.length=0;let t=e._dataService.getList();if(t){e._applySorting(t);for(let i=0;i<t.length;i++)e._addItemToCurrentList(t[i])}}_updateData(){this._dataService.init([{data:this._dataList}])}_addDropDown(){if(!this._cmpRef){this._removeDropDown();this._cmpRef=document.createElement("iui-dropdown",{is:IntegralUIDropDown});document.body.appendChild(this._cmpRef);if(this._cmpRef){this._cmpRef.allowAnimation=this.allowAnimation;this._cmpRef.colorScheme=this._currentColorScheme;this._cmpRef.contentTemplate=this._getContentTemplate();this._cmpRef.customStyle=this.customStyle;this._cmpRef.dataFields=this._currentFields;this._cmpRef.resourcePath=this.resourcePath;this._cmpRef.size=this._getDropDownSize();this._cmpRef.theme=this._currentTheme;let e=this._commonService.getPageRect(this._elemRef),t=this._commonService.getShiftPos();this._cmpRef.position={top:e.bottom+t.y,left:e.left+t.x};this._removeCtrl=this._removeCtrl.bind(this);this._cmpRef.addEventListener("closed",this._removeCtrl)}}}_closeDropDown(){if(this._dropList)this._dropList.allowUpdate=!1;if(this._cmpRef)this._cmpRef.close();this._keepActive=!1;this._isDropDownVisible=!1}_dropDownBlur(e){this._closeDropDown()}_itemSelected(e){if(this._dropList)this._dropList.clearSelection();this._closeDropDown();if(e.detail.item){this._currentSelection=e.detail.item;this._currentText=this._currentSelection?this._currentSelection[this._currentFields.text]:""}this.update();this._inputElem.focus()}_listSizeChanged(e){if(this._cmpRef)this._cmpRef.size={height:e.detail.size.height+4}}_removeCtrl(e){this._removeDropDown()}_removeDropDown(){if(this._cmpRef){this._cmpRef.removeEventListener("closed",this._removeCtrl);this._cmpRef.parentNode.removeChild(this._cmpRef)}this._cmpRef=null;this._isDropDownVisible=!1;if(this._dropList)this._dropList.allowUpdate=!0}_showDropDown(){let e=this;e._addDropDown();if(e._cmpRef){e._cmpRef.open();setTimeout(function(){if(e._cmpRef){e._dropList=e._cmpRef.getContent();if(e._dropList);}e._isDropDownVisible=e._cmpRef?!0:!1},100)}}_callValueChanged(){let e={data:this._currentSelection,text:this._currentText,value:this._currentText};this._invokeEvent("valueChanged",e)}_ctrlKeyDown(e){let t=this;if(t._dropList)t._dropList.selectedItem=null;switch(e.keyCode){case 13:t._closeDropDown();break;case 27:t.data=t._originalData;t._closeDropDown();break;case 34:t.keepActive=!0;t._processDownKey(t._currentMaxDropDownItems);break;case 40:e.preventDefault();t.keepActive=!0;t._processDownKey();break;default:let i=setTimeout(function(){t._applyFilter();t._updateCurrentList();if(t._isDropDownVisible&&t._dropList)if(t._currentList.length>0){t._dropList.items=t._currentList;t._dropList.updateLayout()}else t._closeDropDown();else if(t._currentList.length>0)t._showDropDown();else t._closeDropDown();clearTimeout(i)},1)}}_ctrlLostFocus(){let e=this;setTimeout(function(){if(e._isDropDownVisible&&!e._keepActive)e._closeDropDown();else if(e._isDropDownVisible&&e._keepActive&&e._dropList&&!e._dropList.isActive())e._closeDropDown()},1)}_processDownKey(e){e=e||1;this._keepActive=!0;if(!this._isDropDownVisible){this._applyFilter();this._updateCurrentList();if(this._currentList.length>0)this._showDropDown()}else if(this._dropList){this._dropList.focus();this._dropList.selectedItem=e>0&&e<=this._dropList.items.length?this._dropList.items[e-1]:this._dropList.items[this._dropList.items.length-1]}}_textChanged(e){this._currentText=e.target.value;this._callValueChanged()}_applyFilter(){if(this._currentText&&""!==this._currentText)this._filterParams={caseSensitive:!1,conditions:{value:this._currentText,operation:"->"}};else this.resetFilter()}_getFilterTree(e){return e?this._filterService.createTree(e.conditions,e.formula):null}resetFilter(){this._filterParams={}}filter(e){this._filterParams=e}_isItemAllowed(e){if(!1===e[this._currentFields.visible])return!1;let t=!0;if(e&&this._filterParams){let i=e[this._currentFields.value];i=i?i:e[this._currentFields.text];if(this._filterParams.callback)t=this._filterParams.callback(i,e);else t=this._filterService.match(i,this._filterParams.conditions,this._filterParams.formula,this._getFilterTree(this._filterParams),this._filterParams.caseSensitive)}return t}_selectContent(e){if(e.target&&e.target.value);}_getDropDownSize(){return{width:0!==this._currentDropDownSize.width&&this._currentDropDownSize.width>this._elemRef.offsetWidth?this._currentDropDownSize.width:this._elemRef.offsetWidth,height:0!==this._currentDropDownSize.height?this._currentDropDownSize.height:100}}_applySorting(e){let t=this;if(e)if(t.sortComparer)e.sort(t.sortComparer);else if(t._isSortingAllowed())e.sort(function(e,i){let r=null,s=null;if(!(r=e[t._currentFields.value]))r=e[t._currentFields.text];if(t._commonService.isObject(r))r=r.value?r.value:r.text;if(!(s=i[t._currentFields.value]))s=i[t._currentFields.text];if(t._commonService.isObject(s))s=s.value?s.value:s.text;r=void 0!==r?r:null;s=void 0!==s?s:null;switch(t._currentSorting){case IntegralUISortOrder.Ascending:if(r<s)return-1;else if(r>s)return 1;break;case IntegralUISortOrder.Descending:if(r>s)return-1;else if(r<s)return 1;break;default:return 0}return 0})}_isSortingAllowed(){return this._currentSorting===IntegralUISortOrder.Ascending||this._currentSorting===IntegralUISortOrder.Descending}sort(e,t){this._currentSorting=e;this._sortComparer=t?t:null}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiAutoCompleteDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiAutoCompleteLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiAutoCompleteOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}_getContentTemplate(){let e=this._getDropDownSize();e.width-=4;e.height-=4;if(this._currentMaxDropDownItems>0)e={width:this._getDropDownSize().width-4};return html`<iui-list .colorScheme="${this._currentColorScheme}" .customStyle="${this.customStyle}" .dataFields="${this._currentFields}" .items="${this._currentList}" .maxVisibleItems="${this._currentMaxDropDownItems}" .size="${e}" .theme="${this.theme}" @blur="${e=>this._dropDownBlur(e)}" @itemClick="${e=>this._itemSelected(e)}" @itemTouch="${e=>this._itemSelected(e)}" @selectionChanged="${e=>this._itemSelected(e)}" @sizeChanged="${e=>this._listSizeChanged(e)}"></iui-list>`}firstUpdated(e){this._updateReferences();this.updateLayout()}refresh(){this._updateControlClass();this.update();this._updateReferences()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="autocomplete" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())}>                 <input id="content" type="search" placeholder="${this._currentPlaceHolder}" .value="${this._currentText}" @input="${e=>this._textChanged(e)}" @keydown="${e=>this._ctrlKeyDown(e)}" @focus="${e=>this._selectContent(e)}" @blur="${e=>this._ctrlLostFocus()}" />             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiAutoCompleteDefaultStyle.cssText,"../../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=autocomplete]");this._inputElem=this.shadowRoot.querySelector("#content")}}window.customElements.define("iui-autocomplete",IntegralUIAutoComplete);export default IntegralUIAutoComplete;