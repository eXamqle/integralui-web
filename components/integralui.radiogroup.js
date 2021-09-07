/*
  filename: integralui.radiogroup.js
  version : 21.3.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{h as html}from"../external/lit-element.js";import IntegralUIBase from"./integralui.base.js";class IntegralUIRadioGroup extends IntegralUIBase{constructor(){super();this._buttonList=[];this._selectedComponent=null;this._selectedIndex=-1;this._initStyle()}_init(){super._init();this._initStyle()}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(e,t,n){super.attributeChangedCallback(e,t,n)}static get properties(){return{}}_getComponentCurrentIndex(e){return e&&this._buttonList?this._buttonList.indexOf(e):-1}_getComponentData(e){return e&&e.data?e.data:null}invokeCtrlEvent(e,t,n){let o=!0;if(this._isEnabled){let i=this._getComponentData(t);switch(e){case"CHECKED":this._invokeEvent("buttonChecked",{checked:t.checked,index:n,button:i});break;default:o=!0}}return o}invokeCtrlMethod(e,t){let n=!0;if(this._isEnabled)switch(e){case"CHECKED":this._selectComponent(t);break;default:n=!0}return n}_processUpdateLayout(){let e=this;return new Promise(t=>{let n=e._buttonList.filter(e=>e.checked);e._selectedComponent=n.length>0?n[n.length-1]:null;e._selectedIndex=e._getComponentCurrentIndex(e._selectedComponent);e._clearCmpSelection(e._selectedComponent);t()})}clearSelection(){this._clearCmpSelection()}_clearCmpSelection(e){this._buttonList.forEach(function(t){if(t!==e)t.checked=!1});if(!e){this._selectedComponent=null;this._selectedIndex=-1}}_selectComponent(e){let t=this;if(e){let n=t._getComponentCurrentIndex(e);t._selectedIndex=n;t._selectedComponent=e;t._clearCmpSelection(e);e.checked=!0;t.invokeCtrlEvent("CHECKED",e,n);return!0}return!1}firstUpdated(e){this._updateReferences();this.updateLayout()}_refreshGroupParent(){let e=this;return new Promise(t=>{setTimeout(function(){e._contentSlotElem=e.shadowRoot.querySelector("slot").assignedNodes();e._buttonList=e._contentSlotElem.filter(e=>"iui-radiobutton"===e.nodeName.toLowerCase());e._buttonList.forEach(t=>{t.allowAnimation=e.allowAnimation;t.resourcePath=e.resourcePath;t.theme=e.theme;t.setParent(e)});t()},10)})}render(){return html`             <div>                 <slot @slotchange="${e=>this._slotChange(e)}"></slot>             </div>         `}_slotChange(e){this.updateLayout()}async updateLayout(){await this._refreshGroupParent();await this._processUpdateLayout();this.update()}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=radiogroup]")}}window.customElements.define("iui-radiogroup",IntegralUIRadioGroup);export default IntegralUIRadioGroup;