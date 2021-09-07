/*
  filename: integralui.button.js
  version : 21.3.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import{IntegralUIObjectState,IntegralUITheme}from"./integralui.enums.js";import"./integralui.base.js";import IntegralUIBaseValue from"./integralui.base.value.js";import{iuiButtonDefaultStyle}from"../styles/integralui.button.style.js";import{iuiButtonOfficeStyle}from"../themes/office/integralui.button.office.js";import{iuiButtonMidnightStyle}from"../themes/midnight/integralui.button.midnight.js";class IntegralUIButton extends IntegralUIBaseValue{_init(){super._init();this._parentCtrl=null;this._pressedValue=!1;this._generalClassName="iui-button";this._contentClassName=this._generalClassName+"-content";this._currentControlStyleSettings=iuiButtonDefaultStyle;this._initStyle()}connectedCallback(){}disconnectedCallback(){}setParent(t){this._parentCtrl=t}attributeChangedCallback(t,e,s){super.attributeChangedCallback(t,e,s)}static get properties(){return{pressed:{type:Boolean,reflect:!0}}}get pressed(){return this._pressedValue}set pressed(t){if(this._pressedValue!==t){const e=this._pressedValue;this._pressedValue=t;if(this._pressedValue)this.state|=IntegralUIObjectState.Selected;else this.state&=~IntegralUIObjectState.Selected;this.refresh();this._invokeEvent("pressedChanged",{pressed:this._pressedValue});this.requestUpdate("pressed",e)}}_ctrlMouseDown(t){if(this._isEnabled&&this._parentCtrl&&1===t.which)this._parentCtrl.invokeCtrlMethod("PRESS",this)}_ctrlMouseEnter(t){if(this._isEnabled)this.state|=IntegralUIObjectState.Hovered}_ctrlMouseLeave(t){if(this._isEnabled)this.state&=~IntegralUIObjectState.Hovered}_updateThemeSettings(t){this._currentThemeSettings=css``;switch(t){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiButtonOfficeStyle.cssText,"../icons",this._currentResourcePath);break;case IntegralUITheme.Midnight:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiButtonMidnightStyle.cssText,"../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}_ctrlTouchStart(t){t.preventDefault();if(this._isEnabled&&this._parentCtrl)this._parentCtrl.invokeCtrlMethod("PRESS",this)}firstUpdated(t){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=button]");this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="button" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} draggable="true" tabindex="0" @dragstart="${t=>this._preventDragStart(t)}" @mousedown="${t=>this._ctrlMouseDown(t)}" @mouseenter="${t=>this._ctrlMouseEnter(t)}" @mouseleave="${t=>this._ctrlMouseLeave(t)}" @touchstart="${t=>this._ctrlTouchStart(t)}">                 <div class=${classMap(this._getContentClass())}>                     <slot></slot>                 </div>             </div>         `}_updateControlStyleSettings(t){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiButtonDefaultStyle.cssText,"../icons",t)}}window.customElements.define("iui-button",IntegralUIButton);export default IntegralUIButton;