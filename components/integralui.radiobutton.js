/*
  filename: integralui.radiobutton.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBaseValue from"./integralui.base.value.js";import{IntegralUIColorScheme,IntegralUIObjectState,IntegralUITheme}from"./integralui.enums.js";import{iuiRadioButtonDefaultStyle}from"../styles/default/integralui.radiobutton.style.js";import{iuiRadioButtonOfficeStyle}from"../styles/themes/office/integralui.radiobutton.office.js";import{iuiRadioButtonDarkStyle}from"../styles/color-schemes/dark/integralui.radiobutton.dark.js";import{iuiRadioButtonLightStyle}from"../styles/color-schemes/light/integralui.radiobutton.light.js";class IntegralUIRadioButton extends IntegralUIBaseValue{constructor(){super();this._parentCtrl=null;this._checkedValue=!1;this._buttonClass={};this._generalClassName="iui-radio-button";this._buttonClassName=this._generalClassName+"-btn";this._contentClassName=this._generalClassName+"-content";this._currentControlStyleSettings=iuiRadioButtonDefaultStyle;this._initStyle()}_init(){super._init();this._initStyle()}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},button:{general:this._buttonClassName,disabled:this._buttonClassName+"-disabled",checked:this._buttonClassName+"-checked",unchecked:this._buttonClassName+"-unchecked"},content:{disabled:this._contentClassName+"-disabled",focused:this._contentClassName+"-focused",normal:this._contentClassName,hovered:this._contentClassName+"-hovered",selected:this._contentClassName+"-selected"}};this._updateColorSchemeSettings(this._currentColorScheme);this.refresh()}connectedCallback(){}disconnectedCallback(){}setParent(e){this._parentCtrl=e}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s)}static get properties(){return{checked:{type:Boolean,reflect:!0}}}get checked(){return this._checkedValue}set checked(e){if(this._checkedValue!==e){const t=this._checkedValue;this._checkedValue=e;if(this._checkedValue)this.state|=IntegralUIObjectState.Selected;else this.state&=~IntegralUIObjectState.Selected;this.refresh();this._invokeEvent("checkedChanged",{checked:this._checkedValue});this.requestUpdate("checked",t)}}_ctrlMouseDown(e){if(this._isEnabled&&1===e.which)if(this._parentCtrl)this._parentCtrl.invokeCtrlMethod("CHECKED",this);else this.checked=void 0!==this.checked?!this.checked:!0}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this._updateButtonClass();this._updateContentClass();this.update();this._updateReferences()}_updateButtonClass(){this._buttonClass={};this._buttonClass[this._buttonClassName]=!0;if(this._options.currentStyle){this._buttonClass[this._options.currentStyle.button.general]=!0;this._buttonClass[this.checked?this._options.currentStyle.button.checked:this._options.currentStyle.button.unchecked]=!0;if(this.state&IntegralUIObjectState.Disabled)this._buttonClass[this._options.currentStyle.button.disabled]=!0}}_getButtonClass(){return this._buttonClass}_getButtonStyle(e){if(this._commonService.isString(e))return e;else if(e)return{general:this._commonService.isFieldAvailable(e.general,this._buttonClassName),disabled:this._commonService.isFieldAvailable(e.disabled,this._buttonClassName+"-disabled"),checked:this._commonService.isFieldAvailable(e.checked,this._buttonClassName+"-checked"),unchecked:this._commonService.isFieldAvailable(e.unchecked,this._buttonClassName+"-unchecked")};else return{general:this._defaultStyle.button.general,disabled:this._defaultStyle.button.disabled,checked:this._defaultStyle.button.checked,unchecked:this._defaultStyle.button.unchecked}}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general),button:this._getButtonStyle(e.button),content:this._getContentStyle(e.button)};else this._options.currentStyle={general:{disabled:this._defaultStyle.general.disabled,focused:this._defaultStyle.general.focused,hovered:this._defaultStyle.general.hovered,normal:this._defaultStyle.general.normal,selected:this._defaultStyle.general.selected},button:{general:this._defaultStyle.button.general,disabled:this._defaultStyle.button.disabled,checked:this._defaultStyle.button.checked,unchecked:this._defaultStyle.button.unchecked},content:{disabled:this._defaultStyle.content.disabled,focused:this._defaultStyle.content.focused,hovered:this._defaultStyle.content.hovered,normal:this._defaultStyle.content.normal,selected:this._defaultStyle.content.selected}}}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiRadioButtonDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiRadioButtonLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiRadioButtonOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="radiobutton" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} draggable="true" @dragstart="${e=>this._preventDragStart(e)}" @mousedown="${e=>this._ctrlMouseDown(e)}">                 <div class=${classMap(this._getButtonClass())}>                     <span></span>                 </div>                 <div class=${classMap(this._getContentClass())}>                     <slot></slot>                 </div>             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiRadioButtonDefaultStyle.cssText,"../../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=radiobutton]")}}window.customElements.define("iui-radiobutton",IntegralUIRadioButton);export default IntegralUIRadioButton;