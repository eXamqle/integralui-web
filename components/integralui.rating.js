/*
  filename: integralui.rating.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import{i as ifDefined}from"../external/if-defined.js";import IntegralUIBaseValue from"./integralui.base.value.js";import{IntegralUIColorScheme,IntegralUIIncrementMode,IntegralUIObjectState,IntegralUITheme}from"./integralui.enums.js";import{iuiRatingDefaultStyle}from"../styles/default/integralui.rating.style.js";import{iuiRatingOfficeStyle}from"../styles/themes/office/integralui.rating.office.js";import{iuiRatingDarkStyle}from"../styles/color-schemes/dark/integralui.rating.dark.js";import{iuiRatingLightStyle}from"../styles/color-schemes/light/integralui.rating.light.js";class IntegralUIRating extends IntegralUIBaseValue{_init(){super._init();this._ctrlMaxValue=5;this._currentDivision=1;this._currentStepSize=16;this._currentIncrement=IntegralUIIncrementMode.Free;this._currentValue=0;this._currentTabIndex=0;this._isRatingChangeActive=!1;this._contentSize={width:0,height:0};this._ratingSize={width:0,height:0};this._ratingClass=[];this._generalClassName="iui-rating";this._contentClassName=this._generalClassName+"-content";this._ratingClassName=this._generalClassName+"-value";this._currentControlStyleSettings=iuiRatingDefaultStyle}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},content:{disabled:this._contentClassName+"-disabled",focused:this._contentClassName+"-focused",normal:this._contentClassName,hovered:this._contentClassName+"-hovered",selected:this._contentClassName+"-selected"},rating:{disabled:this._ratingClassName+"-disabled",focused:this._ratingClassName+"-focused",normal:this._ratingClassName,hovered:this._ratingClassName+"-hovered",selected:this._ratingClassName+"-selected"}};this._updateColorSchemeSettings(this._currentColorScheme);this.refresh()}connectedCallback(){this._windowMouseUp=this._windowMouseUp.bind(this);window.addEventListener("mouseup",this._windowMouseUp)}disconnectedCallback(){window.removeEventListener("mouseup",this._windowMouseUp)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{division:{type:Number,reflect:!0},increment:{converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"partial":return IntegralUIIncrementMode.Partial;case"full":return IntegralUIIncrementMode.Full;default:return IntegralUIIncrementMode.Free}},toAttribute:e=>{switch(e){case IntegralUIIncrementMode.Partial:return"Partial";case IntegralUIIncrementMode.Full:return"Full";default:return"Free"}}},reflect:!0},max:{type:Number,reflect:!0},stepSize:{type:Number,attribute:"step-size",reflect:!0},tabIndex:{type:Number,attribute:"tab-index",reflect:!0}}}get division(){return this._currentDivision}set division(e){if(void 0!==e&&e>=1){let t=Math.floor(e);if(this._currentDivision!==t){const t=this._currentDivision;this._currentDivision=e;this.requestUpdate("division",t)}}}get increment(){return this._currentIncrement}set increment(e){if(void 0!==e&&this._currentIncrement!==e){const t=this._currentIncrement;this._currentIncrement=e;this.requestUpdate("increment",t)}}get max(){return this._ctrlMaxValue}set max(e){if(void 0!==e&&this._ctrlMaxValue!==e){const t=this._ctrlMaxValue;this._ctrlMaxValue=e;this.requestUpdate("max",t);this.updateLayout()}}get stepSize(){return this._currentStepSize}set stepSize(e){if(void 0!==e&&this._currentStepSize!==e){const t=this._currentStepSize;this._currentStepSize=e;this.requestUpdate("stepSize",t);this.updateLayout()}}get value(){return this._currentValue}set value(e){if(void 0!==e){let t=Math.floor(e);switch(this._currentIncrement){case IntegralUIIncrementMode.Partial:if(this._currentDivision>1){let i=this._currentDivision/4,s=this._currentDivision/2,r=Math.floor(t/this._currentDivision);if(t>r*this._currentDivision+i)e=r*this._currentDivision+s;else if(t>r*this._currentDivision+3*i)e=(r+1)*this._currentDivision;else e=r*this._currentDivision}else if(e>t+.25)e=t+.5;else if(e>t+.75)e=t+1;else e=t;break;case IntegralUIIncrementMode.Full:if(this._currentDivision>1){let i=Math.floor(t/this._currentDivision)+1;e=Math.max(t,i*this._currentDivision)}else e=e>t+.5?t+1:t;break;default:this._defaultFunc()}if((e=Math.max(0,Math.min(this._ctrlMaxValue*this._currentDivision,e)))!==this.currentValue&&e<=this._ctrlMaxValue*this._currentDivision){const t=this._currentValue;this._currentValue=e;this._invokeEvent("valueChanged",{value:this._currentValue});this.requestUpdate("value",t);this.updateLayout()}}}_getContentWidth(){return this._contentSize.width}_getRatingWidth(){return this._ratingSize.width}_ctrlKeyDown(e){if(this._isEnabled&&!this._isReadOnly){let t={cancel:!1,value:this._currentValue,event:e};this._invokeEvent("keyDown",t);switch(e.keyCode){case 37:if(!t.cancel)this.value-=1;e.stopPropagation();break;case 39:if(!t.cancel)this.value+=1;e.stopPropagation();break;default:this._defaultFunc()}}}_processUpdateLayout(){let e=this;return new Promise(t=>{if(e._elemRef){let i=e._commonService.getPadding(e._elemRef);e._clientRect={width:e._elemRef.clientWidth-(i.left+i.right),height:e._elemRef.clientHeight-(i.top+i.bottom)};e._contentSize={width:e._ctrlMaxValue*e._currentStepSize,height:e._clientRect.height};e._ratingSize={width:e._currentValue<e._ctrlMaxValue*e._currentDivision?e._currentValue*e._currentStepSize/e._currentDivision:e._contentSize.width,height:e._clientRect.height};e.update();t()}})}_ctrlMouseDown(e){if(this._isEnabled&&!this._isReadOnly&&1===e.which){this._isRatingChangeActive=!0;this.value=e.offsetX*this._currentDivision/this._currentStepSize;this.updateLayout();e.stopPropagation()}}_ctrlMouseMove(e){if(this._isEnabled&&!this._isReadOnly&&1===e.which&&this._isRatingChangeActive){this.value=e.offsetX*this._currentDivision/this._currentStepSize;this.updateLayout();e.stopPropagation()}}_ctrlMouseUp(e){this._isRatingChangeActive=!1}_ctrlMouseWheel(e){if(this._isEnabled&&!this._isReadOnly){e.preventDefault();let t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));this.value+=-1*t;e.stopPropagation()}}_ctrlTouchEnd(e){if(this._isEnabled&&!this._isReadOnly){let t=this._commonService.getTouchData(e);if(t&&t.length>0){let i=this._commonService.getPageRect(this._elemRef),s=this._commonService.getShiftPos();this.value=(t[0].pageX-i.left-s.x)*this._currentDivision/this._currentStepSize;this.updateLayout();e.stopPropagation()}}}_windowMouseUp(e){this._isRatingChangeActive=!1}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this._updateContentClass();this._updateRatingClass();this.update();this._updateReferences()}_getControlStyle(){let e={width:this._getContentWidth()+"px"};if(this._ctrlSize.width>0)e.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)e.height=this._ctrlSize.height+"px";return e}_getRatingValueClass(){return this._ratingClass}_updateRatingClass(){this._ratingClass={};this._ratingClass[this._ratingClassName]=!0;if(this._options.currentStyle){this._ratingClass[this._options.currentStyle.rating.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._ratingClass[this._options.currentStyle.rating.disabled]=!0;else if(this.state&IntegralUIObjectState.focused)this._ratingClass[this._options.currentStyle.rating.focused]=!0;else if(this.state&IntegralUIObjectState.selected)this._ratingClass[this._options.currentStyle.rating.selected]=!0;else if(this.state&IntegralUIObjectState.hovered)this._ratingClass[this._options.currentStyle.rating.hovered]=!0}}_getRatingStyle(e){if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this._ratingClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this._ratingClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this._ratingClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this._ratingClassName),selected:this._commonService.isFieldAvailable(e.selected,this._ratingClassName+"-selected")};else return{disabled:this._defaultStyle.rating.disabled,focused:this._defaultStyle.rating.focused,hovered:this._defaultStyle.rating.hovered,normal:this._defaultStyle.rating.normal,selected:this._defaultStyle.rating.selected}}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general),content:this._getContentStyle(e.content),rating:this._getRatingStyle(e.rating)};else this._options.currentStyle={general:{disabled:this._defaultStyle.general.disabled,focused:this._defaultStyle.general.focused,hovered:this._defaultStyle.general.hovered,normal:this._defaultStyle.general.normal,selected:this._defaultStyle.general.selected},content:{disabled:this._defaultStyle.content.disabled,focused:this._defaultStyle.content.focused,hovered:this._defaultStyle.content.hovered,normal:this._defaultStyle.content.normal,selected:this._defaultStyle.content.selected},rating:{disabled:this._defaultStyle.rating.disabled,focused:this._defaultStyle.rating.focused,hovered:this._defaultStyle.rating.hovered,normal:this._defaultStyle.rating.normal,selected:this._defaultStyle.rating.selected}}}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiRatingDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiRatingLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiRatingOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="rating" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} tabindex="${ifDefined(this._isKeyboardFocusAllowed?this._currentTabIndex:void 0)}" draggable="true" @dragstart="${e=>this._preventDragStart(e)}" @keydown="${e=>this._ctrlKeyDown(e)}" @mousedown="${e=>this._ctrlMouseDown(e)}" @mousemove="${e=>this._ctrlMouseMove(e)}" @mouseup="${e=>this._ctrlMouseUp(e)}" @DOMMouseScroll="${e=>this._ctrlMouseWheel(e)}" @mousewheel="${e=>this._ctrlMouseWheel(e)}" @touchend="${e=>this._ctrlTouchEnd(e)}">                 <div class=${classMap(this._getContentClass())} style=${styleMap({position:"absolute",width:this._getContentWidth()+"px"})}></div>                 <div class=${classMap(this._getRatingValueClass())} style=${styleMap({position:"absolute",width:this._getRatingWidth()+"px"})}></div>             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiRatingDefaultStyle.cssText,"../../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=rating]")}}window.customElements.define("iui-rating",IntegralUIRating);export default IntegralUIRating;