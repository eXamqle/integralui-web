/*
  filename: integralui.slider.js
  version : 21.4.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBaseValue from"./integralui.base.value.js";import{IntegralUIOrientation,IntegralUIObjectState,IntegralUITheme}from"./integralui.enums.js";import{iuiSliderDefaultStyle}from"../styles/integralui.slider.style.js";import{iuiSliderOfficeStyle}from"../themes/office/integralui.slider.office.js";import{iuiSliderMidnightStyle}from"../themes/midnight/integralui.slider.midnight.js";class IntegralUISlider extends IntegralUIBaseValue{_init(){super._init();this._ctrlMaxValue=100;this._ctrlMinValue=0;this._currentValue=0;this._isSliderChangeActive=!1;this._currentOrientation=IntegralUIOrientation.Horizontal;this._contentSize={width:0,height:0};this._handleSize={width:0,height:0};this._sliderSize={width:0,height:0};this._sliderPos=0;this._currentControlStyleSettings=iuiSliderDefaultStyle;this._sliderBackgroundClass={};this._sliderButtonClass={};this._generalClassName="iui-slider";this._contentClassName=this._generalClassName+"-content";this._sliderBackgroundClassName=this._generalClassName+"-background";this._sliderButtonClassName=this._generalClassName+"-button";this._initStyle()}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},content:{disabled:this._contentClassName+"-disabled",focused:this._contentClassName+"-focused",normal:this._contentClassName,hovered:this._contentClassName+"-hovered",selected:this._contentClassName+"-selected"},slider:{background:{disabled:this._sliderBackgroundClassName+"-disabled",focused:this._sliderBackgroundClassName+"-focused",normal:this._sliderBackgroundClassName,hovered:this._sliderBackgroundClassName+"-hovered",selected:this._sliderBackgroundClassName+"-selected"},button:{disabled:this._sliderButtonClassName+"-disabled",focused:this._sliderButtonClassName+"-focused",normal:this._sliderButtonClassName,hovered:this._sliderButtonClassName+"-hovered",selected:this._sliderButtonClassName+"-selected"}}};this.refresh()}connectedCallback(){this._windowMouseMove=this._windowMouseMove.bind(this);window.addEventListener("mousemove",this._windowMouseMove);this._windowMouseUp=this._windowMouseUp.bind(this);window.addEventListener("mouseup",this._windowMouseUp)}disconnectedCallback(){window.removeEventListener("mousemove",this._windowMouseMove);window.removeEventListener("mouseup",this._windowMouseUp)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i)}static get properties(){return{max:{type:Number,reflect:!0},min:{type:Number,reflect:!0},orientation:{converter:{fromAttribute:e=>"horizontal"===(e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()?IntegralUIOrientation.Horizontal:IntegralUIOrientation.Vertical,toAttribute:(e,t)=>e===IntegralUIOrientation.Horizontal?"Horizontal":"Vertical"},reflect:!0}}}get max(){return this._ctrlMaxValue}set max(e){if(void 0!==e){e=Math.floor(e);if(this._ctrlMaxValue!==e){const t=this._ctrlMaxValue;this._ctrlMaxValue=e;this.requestUpdate("max",t)}}}get min(){return this._ctrlMinValue}set min(e){if(void 0!==e){e=Math.floor(e);if(this._ctrlMinValue!==e){const t=this._ctrlMinValue;this._ctrlMinValue=e;this.requestUpdate("min",t)}}}get orientation(){return this._currentOrientation}set orientation(e){if(void 0!==e&&this._currentOrientation!==e){const t=this._currentOrientation;this._currentOrientation=e;this.requestUpdate("orientation",t);this.updateLayout()}}get value(){return Math.floor(this._currentValue)}set value(e){if(void 0!==e){e=Math.floor(e);if((e=Math.max(0,Math.min(this._ctrlMaxValue,e)))!==this._currentValue&&e>=this._ctrlMinValue&&e<=this._ctrlMaxValue){const t=this._currentValue;this._currentValue=e;this._invokeEvent("valueChanged",{value:this._currentValue});this.requestUpdate("value",t);this.updateLayout()}}}_getContentWidth(){return this._contentSize.width}_getSliderWidth(){return this._sliderSize.width}_ctrlKeyDown(e){if(this._isEnabled&&!this._isReadOnly){let t={cancel:!1,value:this._currentValue,event:e};this._invokeEvent("keyDown",t);switch(e.keyCode){case 37:if(!t.cancel)this.value-=1;e.stopPropagation();break;case 39:if(!t.cancel)this.value+=1;e.stopPropagation();break;default:this._defaultFunc()}}}_processUpdateLayout(){let e=this;return new Promise(t=>{let i=setTimeout(function(){let s=e._commonService.getPadding(e._elemRef);e._clientRect={width:e._elemRef.clientWidth-(s.left+s.right),height:e._elemRef.clientHeight-(s.top+s.bottom)};e._contentSize={width:e._clientRect.width-2,height:e._clientRect.height-2};e._sliderSize={width:e._clientRect.width-4,height:e._clientRect.height-4};if(e._currentOrientation===IntegralUIOrientation.Horizontal){e._contentSize.height=1;e._sliderSize.width=e._sliderSize.height/2}else{e._contentSize.width=1;e._sliderSize.height=e._sliderSize.width/2}e._handleSize={width:e._handleElem.offsetWidth,height:e._handleElem.offsetHeight};if(e._currentValue<e._ctrlMinValue||e._currentValue>e._ctrlMaxValue)e._currentValue=Math.max(e._ctrlMinValue,Math.min(e._ctrlMaxValue,e._currentValue));if(e._currentOrientation===IntegralUIOrientation.Horizontal)e._sliderPos=e._currentValue*(e._clientRect.width-e._handleSize.width)/e._ctrlMaxValue;else e._sliderPos=e._currentValue*(e._clientRect.height-e._handleSize.height)/e._ctrlMaxValue;e._updateContentClass();e._updateSliderBackgroundClass();e.update();clearTimeout(i);t()},1)})}_ctrlMouseEnter(e){this._animationState="in"}_ctrlMouseLeave(e){if(!this._isSliderChangeActive)this._animationState="out"}_ctrlMouseDown(e){if(this._isEnabled&&!this._isReadOnly&&1===e.which){this._isSliderChangeActive=!0;if(this._currentOrientation===IntegralUIOrientation.Horizontal){if(this._clientRect.width>0)this.value=this._ctrlMaxValue*e.offsetX/this._clientRect.width}else if(this._clientRect.height>0)this.value=this._ctrlMaxValue*(this._clientRect.height-e.offsetY)/this._clientRect.height;e.stopPropagation()}}_ctrlMouseMove(e){this._animationState="in"}_ctrlMouseUp(e){this._isSliderChangeActive=!1}_ctrlMouseWheel(e){if(this._isEnabled&&!this._isReadOnly){e.preventDefault();let t=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail)),i=(this._ctrlMaxValue-this._ctrlMinValue)/10;this.value+=i*t*-1;e.stopPropagation()}}_ctrlTouchEnd(e){if(this._isEnabled&&!this._isReadOnly){let t=this._commonService.getTouchData(e);if(t&&t.length>0){let i=this._commonService.getPageRect(this._elemRef),s=this._commonService.getShiftPos();if(this._currentOrientation===IntegralUIOrientation.Horizontal){if(this._clientRect.width>0)this.value=this._ctrlMaxValue*(t[0].pageX-i.left-s.x)/this._clientRect.width}else if(this._clientRect.height>0)this.value=this._ctrlMaxValue*(this._clientRect.height-(t[0].pageY-i.bottom-s.y))/this._clientRect.height;e.stopPropagation()}}}_windowMouseMove(e){if(this._isEnabled&&!this._isReadOnly&&1===e.which&&this._isSliderChangeActive){let t=this._commonService.getMousePos(e),i=this._commonService.getShiftPos();t.x-=i.x;t.y-=i.y;let s=this._commonService.getPageRect(this._elemRef),l=0;if(this._currentOrientation===IntegralUIOrientation.Horizontal){if(t.x<s.left)l=this._ctrlMinValue;else if(t.x>s.right)l=this._ctrlMaxValue;else if(this._clientRect.width>0)l=this._ctrlMaxValue*(t.x-s.left)/this._clientRect.width}else if(t.y>s.bottom)l=this._ctrlMinValue;else if(t.y<s.top)l=this._ctrlMaxValue;else if(this._clientRect.height>0)l=this._ctrlMaxValue*(s.bottom-t.y)/this._clientRect.height;this.value=l;e.stopPropagation()}}_windowMouseUp(e){this._isSliderChangeActive=!1;this._animationState="out"}_getSliderBackStyle(){let e={position:"absolute"};if(this._currentOrientation===IntegralUIOrientation.Horizontal)Object.assign(e,{left:this._sliderPos+this._handleSize.width+"px",top:this._clientRect.height/2+"px",width:this._contentSize.width-this._sliderPos-this._handleSize.width+"px"});else Object.assign(e,{left:this._clientRect.width/2+"px",bottom:this._sliderPos+this._handleSize.height+"px",height:this._contentSize.height-this._sliderPos-this._handleSize.height+"px"});return e}_getSliderBackValueStyle(){let e={position:"absolute"};if(this._currentOrientation===IntegralUIOrientation.Horizontal)Object.assign(e,{left:"0",top:this._clientRect.height/2+"px",width:this._sliderPos+"px"});else Object.assign(e,{left:this._clientRect.width/2+"px",bottom:"0",height:this._sliderPos+"px"});return e}_getSliderValueStyle(){let e={position:"absolute"};if(this._currentOrientation===IntegralUIOrientation.Horizontal)Object.assign(e,{left:this._sliderPos+"px",top:"0",width:this._sliderSize.width+"px",height:this._sliderSize.height+"px"});else Object.assign(e,{left:"0",bottom:this._sliderPos+"px",width:this._sliderSize.width+"px",height:this._sliderSize.height+"px"});return e}_updateContentClass(){this._contentClass={};if(this._currentOrientation===IntegralUIOrientation.Horizontal)this._contentClass[this._contentClassName]=!0;else this._contentClass[this._contentClassName+"-vertical"]=!0;if(this._options.currentStyle){this._contentClass[this._options.currentStyle.content.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._contentClass[this._options.currentStyle.content.disabled]=!0;else if(this.state&IntegralUIObjectState.focused)this._contentClass[this._options.currentStyle.content.focused]=!0;else if(this.state&IntegralUIObjectState.selected)this._contentClass[this._options.currentStyle.content.selected]=!0;else if(this.state&IntegralUIObjectState.hovered)this._contentClass[this._options.currentStyle.content.hovered]=!0}}_getSliderBackgroundClass(){return this._sliderBackgroundClass}_updateSliderBackgroundClass(){this._sliderBackgroundClass={};if(this._currentOrientation===IntegralUIOrientation.Horizontal)this._sliderBackgroundClass[this._sliderBackgroundClassName]=!0;else this._sliderBackgroundClass[this._sliderBackgroundClassName+"-vertical"]=!0;if(this._options.currentStyle){this._sliderBackgroundClass[this._options.currentStyle.slider.background.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._sliderBackgroundClass[this._options.currentStyle.slider.background.disabled]=!0;else if(this.state&IntegralUIObjectState.focused)this._sliderBackgroundClass[this._options.currentStyle.slider.background.focused]=!0;else if(this.state&IntegralUIObjectState.selected)this._sliderBackgroundClass[this._options.currentStyle.slider.background.selected]=!0;else if(this.state&IntegralUIObjectState.hovered)this._sliderBackgroundClass[this._options.currentStyle.slider.background.hovered]=!0}}_getSliderButtonClass(){return this._sliderButtonClass}_updateSliderButtonClass(){this._sliderButtonClass={};this._sliderButtonClass[this._sliderButtonClassName]=!0;if(this._options.currentStyle){this._sliderButtonClass[this._options.currentStyle.slider.button.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._sliderButtonClass[this._options.currentStyle.slider.button.disabled]=!0;else if(this.state&IntegralUIObjectState.focused)this._sliderButtonClass[this._options.currentStyle.slider.button.focused]=!0;else if(this.state&IntegralUIObjectState.selected)this._sliderButtonClass[this._options.currentStyle.slider.button.selected]=!0;else if(this.state&IntegralUIObjectState.hovered)this._sliderButtonClass[this._options.currentStyle.slider.button.hovered]=!0}}_getSliderBackgroundStyle(e){if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this._sliderBackgroundClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this._sliderBackgroundClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this._sliderBackgroundClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this._sliderBackgroundClassName),selected:this._commonService.isFieldAvailable(e.selected,this._sliderBackgroundClassName+"-selected")};else return{disabled:this._defaultStyle.slider.background.disabled,focused:this._defaultStyle.slider.background.focused,hovered:this._defaultStyle.slider.background.hovered,normal:this._defaultStyle.slider.background.normal,selected:this._defaultStyle.slider.background.selected}}_getSliderButtonStyle(e){if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this._sliderButtonClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this._sliderButtonClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this._sliderButtonClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this._sliderButtonClassName),selected:this._commonService.isFieldAvailable(e.selected,this._sliderButtonClassName+"-selected")};else return{disabled:this._defaultStyle.slider.button.disabled,focused:this._defaultStyle.slider.button.focused,hovered:this._defaultStyle.slider.button.hovered,normal:this._defaultStyle.slider.button.normal,selected:this._defaultStyle.slider.button.selected}}_getSliderStyle(e){if(this._commonService.isString(e))return e;else if(e)return{background:this._getSliderBackgroundStyle(e.background),button:this._getSliderButtonStyle(e.button)};else return{background:{disabled:this._defaultStyle.slider.background.disabled,focused:this._defaultStyle.slider.background.focused,hovered:this._defaultStyle.slider.background.hovered,normal:this._defaultStyle.slider.background.normal,selected:this._defaultStyle.slider.background.selected},button:{disabled:this._defaultStyle.slider.button.disabled,focused:this._defaultStyle.slider.button.focused,hovered:this._defaultStyle.slider.button.hovered,normal:this._defaultStyle.slider.button.normal,selected:this._defaultStyle.slider.button.selected}}}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general),content:this._getContentStyle(e.content),slider:this._getSliderStyle(e.slider)};else this._options.currentStyle={general:{disabled:this._defaultStyle.general.disabled,focused:this._defaultStyle.general.focused,hovered:this._defaultStyle.general.hovered,normal:this._defaultStyle.general.normal,selected:this._defaultStyle.general.selected},content:{disabled:this._defaultStyle.content.disabled,focused:this._defaultStyle.content.focused,hovered:this._defaultStyle.content.hovered,normal:this._defaultStyle.content.normal,selected:this._defaultStyle.content.selected},slider:this._getSliderStyle()}}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this._updateContentClass();this._updateSliderBackgroundClass();this._updateSliderButtonClass();this.update();this._updateReferences()}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiSliderOfficeStyle.cssText,"../icons",this._currentResourcePath);break;case IntegralUITheme.Midnight:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiSliderMidnightStyle.cssText,"../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentCustomStyle}                 ${this._currentThemeSettings}             </style>             <div data-ctrl="slider" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} draggable="true" tabindex="0" @dragstart="${e=>this._preventDragStart(e)}" @keydown="${e=>this._ctrlKeyDown(e)}" @mouseenter="${e=>this._ctrlMouseEnter(e)}" @mouseleave="${e=>this._ctrlMouseLeave(e)}" @mousedown="${e=>this._ctrlMouseDown(e)}" @mousemove="${e=>this._ctrlMouseMove(e)}" @mouseup="${e=>this._ctrlMouseUp(e)}" @DOMMouseScroll="${e=>this._ctrlMouseWheel(e)}" @mousewheel="${e=>this._ctrlMouseWheel(e)}" @touchend="${e=>this._ctrlTouchEnd(e)}">                 <div class=${classMap(this._getContentClass())} style=${styleMap(this._getSliderBackStyle())}></div>                 <div class=${classMap(this._getSliderBackgroundClass())} style=${styleMap(this._getSliderBackValueStyle())}></div>                 <div id="handle" class=${classMap(this._getSliderButtonClass())} style=${styleMap(this._getSliderValueStyle())}></div>             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiSliderDefaultStyle.cssText,"../icons",e)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=slider]");this._handleElem=this.shadowRoot.querySelector("#handle")}}window.customElements.define("iui-slider",IntegralUISlider);export default IntegralUISlider;