/*
  filename: integralui.numeric.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBaseValue from"./integralui.base.value.js";import{IntegralUIAlignment,IntegralUIColorScheme,IntegralUINumericDisplayMode,IntegralUISpeedMode,IntegralUITheme}from"./integralui.enums.js";import{iuiNumericDefaultStyle}from"../styles/default/integralui.numeric.style.js";import{iuiNumericOfficeStyle}from"../styles/themes/office/integralui.numeric.office.js";import{iuiNumericDarkStyle}from"../styles/color-schemes/dark/integralui.numeric.dark.js";import{iuiNumericLightStyle}from"../styles/color-schemes/light/integralui.numeric.light.js";class IntegralUINumeric extends IntegralUIBaseValue{_init(){super._init();this._ctrlMaxValue=100;this._ctrlMinValue=0;this._currentStep=1;this._currentAccelerator=0;this._currentDecimals=0;this._currentValue=0;this._startValue=0;this._valueTimer=null;this._valueCount=0;this._isChangeActive=!1;this._stopTimer=!0;this._contentSize={width:0,height:0};this._ctrlValueWidth=0;this._currentButtonAlign=IntegralUIAlignment.Right;this._leftRightMarginTop=0;this._topBotomMarginLeft=0;this._currentDisplayMode=IntegralUINumericDisplayMode.InBound;this._currentMouseWheelSpeed=IntegralUISpeedMode.Normal;this._currentControlStyleSettings=iuiNumericDefaultStyle;this._generalClassName="iui-numeric";this._contentClassName=this._generalClassName+"-content";this._initStyle()}connectedCallback(){this._windowMouseUp=this._windowMouseUp.bind(this);window.addEventListener("mouseup",this._windowMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this._windowMouseUp);if(this._valueTimer)clearInterval(this._valueTimer)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{accelerator:{type:Number,reflect:!0},decimals:{type:Number,reflect:!0},displayMode:{attribute:"display-mode",converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"leftright":return IntegralUINumericDisplayMode.LeftRight;case"updown":return IntegralUINumericDisplayMode.UpDown;default:return IntegralUINumericDisplayMode.InBound}},toAttribute:e=>{switch(e){case IntegralUINumericDisplayMode.LeftRight:return"LeftRight";case IntegralUINumericDisplayMode.UpDown:return"UpDown";default:return"InBound"}}},reflect:!0},max:{type:Number,reflect:!0},min:{type:Number,reflect:!0},mouseWheelSpeed:{attribute:"mousewheel-speed",converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"veryslow":return IntegralUISpeedMode.VerySlow;case"slow":return IntegralUISpeedMode.Slow;case"fast":return IntegralUISpeedMode.Fast;case"veryfast":return IntegralUISpeedMode.VeryFast;default:return IntegralUISpeedMode.Normal}},toAttribute:e=>{switch(e){case IntegralUISpeedMode.VerySlow:return"VerySlow";case IntegralUISpeedMode.Slow:return"Slow";case IntegralUISpeedMode.Fast:return"Fast";case IntegralUISpeedMode.VeryFast:return"VeryFast";default:return"Normal"}}},reflect:!0},step:{type:Number,reflect:!0}}}get accelerator(){return this._currentAccelerator}set accelerator(e){if(void 0!==e&&this._currentAccelerator!==e){const t=this._currentAccelerator;this._currentAccelerator=e;this.requestUpdate("accelerator",t)}}get buttonAlign(){return this._currentButtonAlign}set buttonAlign(e){if(void 0!==e&&this._currentButtonAlign!==e){const t=this._currentButtonAlign;this._currentButtonAlign=e;this.requestUpdate("buttonAlign",t)}}get decimals(){return this._currentDecimals}set decimals(e){if(void 0!==e&&this._currentDecimals!==e){const t=this._currentDecimals;this._currentDecimals=e;this.requestUpdate("accelerator",t)}}get displayMode(){return this._currentDisplayMode}set displayMode(e){if(void 0!==e&&this._currentDisplayMode!==e){const t=this._currentDisplayMode;this._currentDisplayMode=e;this.updateLayout();this.requestUpdate("displayMode",t)}}get max(){return this._ctrlMaxValue}set max(e){if(void 0!==e&&this._ctrlMaxValue!==e){const t=this._ctrlMaxValue;this._ctrlMaxValue=e;this.requestUpdate("max",t)}}get min(){return this._ctrlMinValue}set min(e){if(void 0!==e&&this._ctrlMinValue!==e){const t=this._ctrlMinValue;this._ctrlMinValue=e;this.requestUpdate("min",t)}}get mouseWheelSpeed(){return this._currentMouseWheelSpeed}set mouseWheelSpeed(e){if(void 0!==e&&this._currentMouseWheelSpeed!==e){const t=this._currentMouseWheelSpeed;this._currentMouseWheelSpeed=e;this.requestUpdate("mouseWheelSpeed",t)}}get step(){return this._currentStep}set step(e){if(void 0!==e&&this._currentStep!==e){const t=this._currentStep;this._currentStep=e;this.requestUpdate("step",t)}}get value(){return this._currentDecimals>0?parseFloat(this._currentValue):parseInt(this._currentValue)}set value(e){if(void 0!==e){e=this._currentDecimals>0?e:Math.floor(e);if((e=Math.max(this._ctrlMinValue,Math.min(this._ctrlMaxValue,e)))!==this._currentValue&&e>=this._ctrlMinValue&&e<=this._ctrlMaxValue){const t=this._currentValue;this._currentValue=this._currentDecimals>0?parseFloat(parseFloat(e).toFixed(this._currentDecimals)):e;this.update();this._invokeEvent("valueChanged",{value:this._currentValue});this.requestUpdate("value",t)}}}updateLayout(){let e=this;e.update();e._updateReferences();let t=setTimeout(function(){let i=e._commonService.getPadding(e._elemRef);e._clientRect={width:e._elemRef.clientWidth-(i.left+i.right),height:e._elemRef.clientHeight-(i.top+i.bottom)};e._contentSize={width:e._currentValue<100?Math.floor(e._clientRect.width*e._currentValue/100):e._clientRect.width,height:e._clientRect.height};let s=e._commonService.getBorderWidth(e._valueElem),r=e._commonService.getMargin(e._valueElem),l=e._commonService.getPadding(e._valueElem);switch(e._currentDisplayMode){case IntegralUINumericDisplayMode.LeftRight:if(e._leftrightButtonsElem){e._ctrlValueWidth=e._clientRect.width-(s.left+s.right+r.left+r.right+l.left+l.right+2*e._leftrightButtonsElem.offsetWidth);if(e._valueElem)e._leftRightMarginTop=(e._valueElem.offsetHeight-e._leftrightButtonsElem.offsetHeight)/2}break;case IntegralUINumericDisplayMode.UpDown:if(e._upDownButtonsChildElem&&e._valueElem)e._topBotomMarginLeft=(e._valueElem.offsetWidth-e._upDownButtonsChildElem.offsetWidth)/2;break;default:if(e._inboundButtonsElem)e._ctrlValueWidth=e._clientRect.width-(s.left+s.right+r.left+r.right+l.left+l.right+e._inboundButtonsElem.offsetWidth+1)}e.update();clearTimeout(t)},1)}_changeValueTimerElapsed(e){if(0===this._valueCount)this._valueCount=1;this._valueCount+=this._currentAccelerator*this._currentStep;this._stopTimer=!1;this._changeValue(e);if(this._stopTimer){clearInterval(this._valueTimer);this._isChangeActive=!1}}_changeValue(e){if(e)if(this.value+this._valueCount<this._ctrlMaxValue)this.value+=this._valueCount;else{this._stopTimer=!0;this.value=this._ctrlMaxValue}else if(this.value-this._valueCount>0)this.value-=this._valueCount;else{this._stopTimer=!0;this.value=this._ctrlMinValue}}decreaseValue(){this.value-=this._currentStep}increaseValue(){this.value+=this._currentStep}_inputChange(e){this.value=e.target.value;e.stopPropagation()}_startChange(e){let t=this;if(t._valueTimer)clearInterval(this._valueTimer);t._isChangeActive=!0;t._valueCount=0;t._startValue=this._currentValue;t._valueTimer=setInterval(function(){t._changeValueTimerElapsed(e)},100)}_stopChange(){if(this._valueTimer)clearInterval(this._valueTimer);this._isChangeActive=!1;this._startValue=this._currentValue}_ctrlMouseWheel(e){if(this._isEnabled){e.preventDefault();let t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),i=5;switch(this._currentMouseWheelSpeed){case IntegralUISpeedMode.VerySlow:i=1;break;case IntegralUISpeedMode.Slow:i=2;break;case IntegralUISpeedMode.Fast:i=10;break;case IntegralUISpeedMode.VeryFast:i=100;break;default:i=5}let s=this._currentStep*i;this.value+=s*t;e.stopPropagation()}}_onMouseDown(e,t){this._startChange(t)}_onMouseUp(e){this._stopChange()}_windowMouseUp(e){this._stopChange()}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiNumericDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiNumericLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiNumericOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="numeric" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} draggable="true" @dragstart="${e=>this._preventDragStart(e)}" @DOMMouseScroll="${e=>this._ctrlMouseWheel(e)}" @mousewheel="${e=>this._ctrlMouseWheel(e)}">                 ${this._currentDisplayMode===IntegralUINumericDisplayMode.InBound?html`<div id="inbound-buttons" class="iui-numeric-inbound-buttons" style=${styleMap({float:this._currentButtonAlign===IntegralUIAlignment.Left?"left":"right"})}>                                 <div class="iui-numeric-inbound-btn" @click="${()=>this.increaseValue()}" @mousedown="${e=>this._onMouseDown(e,!0)}" @mouseup="${e=>this._onMouseUp(e)}">                                     <span class="iui-numeric-inbound-button-up"></span>                                 </div>                                 <div class="iui-numeric-inbound-btn" style=${styleMap({marginRight:this._currentButtonAlign===IntegralUIAlignment.Left?"1px":0})} @click="${()=>this.decreaseValue()}" @mousedown="${e=>this._onMouseDown(e)}" @mouseup="${e=>this._onMouseUp(e)}">                                     <span class="iui-numeric-inbound-button-down"></span>                                 </div>                             </div>                             <div id="ctrl-value" class="iui-numeric-inbound-value" style=${styleMap({float:this._currentButtonAlign===IntegralUIAlignment.Left?"left":"right",width:this._ctrlValueWidth+"px"})}>                                 <input                                      .disabled="${!this.enabled}"                                      type="number"                                      .min="${this._ctrlMinValue}"                                     .max="${this._ctrlMaxValue}"                                     .value="${this._currentValue}"                                     @change="${e=>this._inputChange(e)}"                                 />                             </div>`:html``}                 ${this._currentDisplayMode===IntegralUINumericDisplayMode.LeftRight?html`<div id="leftright-buttons" class="iui-numeric-leftright-buttons" style=${styleMap({float:"left",marginTop:this._leftRightMarginTop+"px"})} @click="${e=>this.decreaseValue()}" @mousedown="${e=>this._onMouseDown(e)}" @mouseup="${e=>this._onMouseUp(e)}">                                 <span class="iui-numeric-leftright-decrease"></span>                             </div>                             <div id="ctrl-value" class="iui-numeric-leftright-value" style=${styleMap({width:this._ctrlValueWidth+"px"})}>                                 <input                                      .disabled="${!this.enabled}"                                      type="number"                                      .min="${this._ctrlMinValue}"                                     .max="${this._ctrlMaxValue}"                                     .value="${this._currentValue}"                                     @change="${e=>this._inputChange(e)}"                                 />                             </div>                             <div class="iui-numeric-leftright-buttons" style=${styleMap({float:"right",marginTop:this._leftRightMarginTop+"px"})} @click="${e=>this.increaseValue()}" @mousedown="${e=>this._onMouseDown(e,!0)}" @mouseup="${e=>this._onMouseUp(e)}">                                 <span class="iui-numeric-leftright-increase"></span>                             </div>`:html``}                 ${this._currentDisplayMode===IntegralUINumericDisplayMode.UpDown?html`<div id="updown-buttons" class="iui-numeric-updown-buttons" @click="${()=>this.increaseValue()}" @mousedown="${e=>this._onMouseDown(e,!0)}" @mouseup="${e=>this._onMouseUp(e)}">                                 <span id="updown-buttons-child" class="iui-numeric-updown-increase" style=${styleMap({marginLeft:this._topBotomMarginLeft+"px"})}></span>                             </div>                             <div id="ctrl-value" class="iui-numeric-updown-value">                                 <input                                      .disabled="${!this.enabled}"                                      type="number"                                      .min="${this._ctrlMinValue}"                                     .max="${this._ctrlMaxValue}"                                     .value="${this._currentValue}"                                     @change="${e=>this._inputChange(e)}"                                 />                             </div>                             <div class="iui-numeric-updown-buttons" @click="${()=>this.decreaseValue()}" @mousedown="${e=>this._onMouseDown(e)}" @mouseup="${e=>this._onMouseUp(e)}">                                 <span class="iui-numeric-updown-decrease" style=${styleMap({marginLeft:this._topBotomMarginLeft+"px"})}></span>                             </div>`:html``}             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiNumericDefaultStyle.cssText,"../../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=numeric]");this._valueElem=this.shadowRoot.querySelector("#ctrl-value");this._inboundButtonsElem=this.shadowRoot.querySelector("#inbound-buttons");this._leftrightButtonsElem=this.shadowRoot.querySelector("#leftright-buttons");this._upDownButtonsElem=this.shadowRoot.querySelector("#updown-buttons");this._upDownButtonsChildElem=this.shadowRoot.querySelector("#updown-buttons-child")}}window.customElements.define("iui-numeric",IntegralUINumeric);export default IntegralUINumeric;