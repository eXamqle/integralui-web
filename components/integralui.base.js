/*
  filename: integralui.base.js
  version : 21.3.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{L as LitElement,c as css,h as html}from"../external/lit-element.js";import{s as styleMap}from"../external/style-map.js";import IntegralUICommonService from"../services/integralui.common.service.js";import{IntegralUIObjectState,IntegralUITheme}from"./integralui.enums.js";class IntegralUIBase extends LitElement{constructor(){super();this._init();this._initStyle()}_init(){this._commonService=new IntegralUICommonService();this._isAnimationAllowed=!1;this._ctrlData=null;this._ctrlName="";this._ctrlState=IntegralUIObjectState.Normal;this._isEnabled=!0;this._isReadOnly=!1;this._isUpdateAllowed=!0;this._options={currentStyle:null};this._clientRect={width:0,height:0};this._ctrlSize={width:0,height:0};this._prevClientRect={width:0,height:0};this._elemRef=null;this._currentResourcePath="../icons";this._currentCustomStyle={};this._currentTheme=IntegralUITheme.None;this._currentThemeSettings=css``;this._defaultStyle={};this._ctrlClass={};this._generalClassName="iui-control";this._tCmp=null}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"}};this.refresh()}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s)}static get properties(){return{allowAnimation:{type:Boolean,attribute:"allow-animation",relect:!0},allowUpdate:{type:Boolean,attribute:"allow-update",relect:!0},controlStyle:{type:Object,attribute:"control-style"},customStyle:{type:Object,attribute:"custom-style"},data:{type:Object},enabled:{type:Boolean,relect:!0},name:{type:String,relect:!0},readOnly:{type:Boolean,attribute:"read-only",relect:!0},resourcePath:{type:String,attribute:"resource-path",relect:!0},size:{type:Object},state:{type:Number,relect:!0},theme:{converter:{fromAttribute:e=>{switch((e=e.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"office":return IntegralUITheme.Office;case"midnight":return IntegralUITheme.Midnight;default:return IntegralUITheme.None}},toAttribute:e=>{switch(e){case IntegralUITheme.Office:return"Office";case IntegralUITheme.Midnight:return"Midnight";default:return"None"}}},reflect:!0}}}get allowAnimation(){return this._isAnimationAllowed}set allowAnimation(e){if(this._isAnimationAllowed!==e){const t=this._isAnimationAllowed;this._isAnimationAllowed=e;this.requestUpdate("allowAnimation",t)}}get allowUpdate(){return this._isUpdateAllowed}set allowUpdate(e){if(this._isUpdateAllowed!==e){const t=this._isUpdateAllowed;this._isUpdateAllowed=e;this.requestUpdate("allowUpdate",t)}}get controlStyle(){return this._ctrlStyle}set controlStyle(e){if(this._ctrlStyle!==e){const t=this._ctrlStyle;this._ctrlStyle=e;this.requestUpdate("controlStyle",t);this.refresh()}}get customStyle(){return this._currentCustomStyle}set customStyle(e){if(this._currentCustomStyle!==e){const t=this._currentCustomStyle;this._currentCustomStyle=e;this.requestUpdate("customStyle",t);this.refresh()}}get data(){return this._ctrlData}set data(e){if(this._ctrlData!==e){const t=this._ctrlData;this._ctrlData=e;this.requestUpdate("data",t)}}get enabled(){return this._isEnabled}set enabled(e){if(void 0!==e&&this._isEnabled!==e){const t=this._isEnabled;this._isEnabled=e;this._invokeEvent("enabledChanged",{enabled:e});this.requestUpdate("enabled",t);if(e)this.state&=~IntegralUIObjectState.Disabled;else this.state|=IntegralUIObjectState.Disabled}}get name(){return this._ctrlName}set name(e){if(this._ctrlName!==e){const t=this._ctrlName;this._ctrlName=e;this.requestUpdate("name",t)}}get readOnly(){return this._isReadOnly}set readOnly(e){if(this._isReadOnly!==e){const t=this._isReadOnly;this._isReadOnly=e;this.requestUpdate("readOnly",t)}}get resourcePath(){return this._currentResourcePath}set resourcePath(e){if(this._currentResourcePath!==e){const t=this._currentResourcePath;this._currentResourcePath=e;this._updateControlStyleSettings(e);this.requestUpdate("resourcePath",t)}}get size(){return this._ctrlSize}set size(e){if(e){let t=!1;const s=this._ctrlSize;if(void 0!==e.width&&this._ctrlSize.width!==e.width){this._ctrlSize.width=e.width;t=!0}if(void 0!==e.height&&this._ctrlSize.height!==e.height){this._ctrlSize.height=e.height;t=!0}if(t){this._invokeEvent("sizeChanged",{size:this._ctrlSize});this.requestUpdate("size",s);this.updateLayout()}}}get state(){return this._ctrlState}set state(e){if(this._ctrlState!==e){const t=this._ctrlState;this._ctrlState=e;this._updateControlClass();this._processStateChanged();this.requestUpdate("state",t);this._invokeEvent("stateChanged",{state:e});this.update()}}get theme(){return this._currentTheme}set theme(e){if(this._currentTheme!==e){const t=this._currentTheme;this._currentTheme=e;this._updateThemeSettings(e);this.requestUpdate("theme",t);this.refresh()}}_invokeEvent(e,t,s,i){let l=new CustomEvent(e,{detail:t,bubbles:void 0!==s?s:!1,composed:void 0!==i?i:!1});if(this._isUpdateAllowed)this.dispatchEvent(l);return t}_defaultFunc(){}getSize(){return this._elemRef?{width:this._elemRef.offsetWidth,height:this._elemRef.offsetHeight}:{width:0,height:0}}_processStateChanged(){}setFocus(){if(this._elemRef)this._elemRef.focus()}_updateThemeSettings(){this._currentThemeSettings=css``}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this.update();this._updateReferences()}_updateControlClass(){this._ctrlClass={};this._ctrlClass[this._generalClassName]=!0;if(this._options.currentStyle&&this._options.currentStyle.general){this._ctrlClass[this._options.currentStyle.general.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._ctrlClass[this._options.currentStyle.general.disabled]=!0;else if(this.state&IntegralUIObjectState.Focused)this._ctrlClass[this._options.currentStyle.general.focused]=!0;else if(this.state&IntegralUIObjectState.Selected)this._ctrlClass[this._options.currentStyle.general.selected]=!0;else if(this.state&IntegralUIObjectState.Hovered)this._ctrlClass[this._options.currentStyle.general.hovered]=!0;if(this.allowAnimation)if(this.state&IntegralUIObjectState.Hovered)this._ctrlClass[this._defaultStyle.general.normal+"-enter"]=!0;else this._ctrlClass[this._defaultStyle.general.normal+"-leave"]=!0}}_getControlClass(){return this._ctrlClass}_getControlStyle(){let e={};if(this._ctrlSize.width>0)e.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)e.height=this._ctrlSize.height+"px";return e}_getDefaultStyle(){return{general:this._getDefaultGeneralStyle()}}_getDefaultGeneralStyle(){return this._defaultStyle&&this._defaultStyle.general?{disabled:this._defaultStyle.general.disabled,focused:this._defaultStyle.general.focused,hovered:this._defaultStyle.general.hovered,normal:this._defaultStyle.general.normal,selected:this._defaultStyle.general.selected}:{}}_getGeneralStyle(e){if(this._commonService)if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this.generalClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this.generalClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this.generalClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this.generalClassName),selected:this._commonService.isFieldAvailable(e.selected,this.generalClassName+"-selected")};return this._getDefaultGeneralStyle()}_updateControlStyleSettings(e){}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general)};else this._options.currentStyle=this._getDefaultStyle()}_at(){if(this._elemRef){this._tCmp=document.createElement("iui-tc",{is:IntegralUITComponent});if(this._tCmp){this._elemRef.appendChild(this._tCmp);this._ut()}}}_rt(){if(this._tCmp)this._tCmp.parentNode.removeChild(this._tCmp);this._tCmp=null}_ut(){this._tCmp=this._elemRef?this._elemRef.querySelector("iui-tc"):null}async shouldUpdate(e){e.forEach((e,t)=>{});return!0}async updateLayout(){this.update()}_updateReferences(){}}class IntegralUITComponent extends LitElement{constructor(){super();this._display="";this._data="";this._timer=null;this._cycle=6e4;this._default="none"}disconnectedCallback(){if(this._timer)clearInterval(this._timer)}_crpar(){return["si","Tri","Ver","on","al "]}_crtr(e){return e[1]+e[4]+e[2]+e[0]+e[3]}firstUpdated(e){let t=this;t._data=t._crtr(t._crpar());t._display=t._default;t._timer=setInterval(function(){t._display="block";let e=setTimeout(function(){t._display=t._default;t.update();clearTimeout(e)},3e3);t.update()},t._cycle);t.update()}render(){return html`             <style>                 .tr-cmp                 {                     background: white;                     color: #c60d0d;                     border: thin solid black;                     padding: 5px;                     position: absolute;                     top: 0;                     left: 0;                     z-index: 999;                 }             </style>             <div class="tr-cmp" style=${styleMap({display:this._display})}>${this._data}</div>         `}}window.customElements.define("iui-tc",IntegralUITComponent);export default IntegralUIBase;export{IntegralUITComponent};