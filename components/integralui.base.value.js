/*
  filename: integralui.base.value.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import IntegralUIBase from"./integralui.base.js";import IntegralUIObjectState from"./integralui.enums.js";class IntegralUIBaseValue extends IntegralUIBase{_init(){super._init();this._currentValue=0;this._contentClass={};this._generalClassName="iui-basevalue";this._contentClassName=this._generalClassName+"-content"}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},content:{disabled:this._contentClassName+"-disabled",focused:this._contentClassName+"-focused",normal:this._contentClassName,hovered:this._contentClassName+"-hovered",selected:this._contentClassName+"-selected"}};this._updateColorSchemeSettings(this._currentColorScheme);this.refresh()}attributeChangedCallback(e,t,s){super.attributeChangedCallback(e,t,s)}static get properties(){return{value:{type:Number,reflect:!0}}}get value(){return this._currentValue}set value(e){if(this._currentValue!==e){const t=this._currentValue;this._currentValue=e;this._invokeEvent("valueChanged",{value:this._currentValue});this.requestUpdate("value",t);this.updateLayout()}}_preventDragStart(e){e.preventDefault();e.stopPropagation()}async updateLayout(e){this._updateReferences();await this._processUpdateLayout(e);this.update()}_processUpdateLayout(e){let t=this;return new Promise(e=>{let s=setTimeout(function(){t._clientRect={width:t._elemRef?t._elemRef.clientWidth:0,height:t._elemRef?t._elemRef.clientHeight:0};clearTimeout(s);e()},1)})}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this._updateContentClass();this.update()}_getDefaultStyle(){return{general:this._getDefaultGeneralStyle(),content:this._getDefaultContentStyle()}}_getDefaultContentStyle(){return this._defaultStyle&&this._defaultStyle.content?{disabled:this._defaultStyle.content.disabled,focused:this._defaultStyle.content.focused,hovered:this._defaultStyle.content.hovered,normal:this._defaultStyle.content.normal,selected:this._defaultStyle.content.selected}:{}}_getContentClass(){return this._contentClass}_getContentStyle(e){if(this._commonService)if(this._commonService.isString(e))return e;else if(e)return{disabled:this._commonService.isFieldAvailable(e.disabled,this._contentClassName+"-disabled"),focused:this._commonService.isFieldAvailable(e.focused,this._contentClassName+"-focused"),hovered:this._commonService.isFieldAvailable(e.hovered,this._contentClassName+"-hovered"),normal:this._commonService.isFieldAvailable(e.normal,this._contentClassName),selected:this._commonService.isFieldAvailable(e.selected,this._contentClassName+"-selected")};return this._getDefaultContentStyle()}_updateContentClass(){this._contentClass={};this._contentClass[this._contentClassName]=!0;if(this._options.currentStyle&&this._options.currentStyle.content){this._contentClass[this._options.currentStyle.content.normal]=!0;if(this.state&IntegralUIObjectState.Disabled)this._contentClass[this._options.currentStyle.content.disabled]=!0;else if(this.state&IntegralUIObjectState.Focused)this._contentClass[this._options.currentStyle.content.focused]=!0;else if(this.state&IntegralUIObjectState.Selected)this._contentClass[this._options.currentStyle.content.selected]=!0;else if(this.state&IntegralUIObjectState.Hovered)this._contentClass[this._options.currentStyle.content.hovered]=!0}}_updateStyle(e){if(e)this._options.currentStyle={general:this._getGeneralStyle(e.general),content:this._getContentStyle(e.content)};else this._options.currentStyle=this._getDefaultStyle()}}export default IntegralUIBaseValue;