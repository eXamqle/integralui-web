/*
  filename: integralui.paginator.js
  version : 22.2.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import{IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import{iuiPaginatorDefaultStyle}from"../styles/default/integralui.paginator.style.js";import{iuiPaginatorOfficeStyle}from"../styles/themes/office/integralui.paginator.office.js";import{iuiPaginatorDarkStyle}from"../styles/color-schemes/dark/integralui.paginator.dark.js";import{iuiPaginatorLightStyle}from"../styles/color-schemes/light/integralui.paginator.light.js";class IntegralUIPaginator extends IntegralUIBase{_init(){super._init();this._currentPageNumber=0;this._isEnabled=!0;this._maxPageNumber=9999999;this._minPageNumber=0;this._numPages="0";this._inputWidth=30;this._prevValue=0;this._currentControlStyleSettings=iuiPaginatorDefaultStyle;this._generalClassName="iui-paginator";this._initStyle()}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a)}static get properties(){return{currentPage:{type:Number,attribute:"current-page",reflect:!0},maxPages:{type:Number,attribute:"max-pages",reflect:!0}}}get currentPage(){return this._currentPageNumber}set currentPage(e){this._prevValue=this._currentPageNumber;if(this._currentPageNumber!==e){const t=this._currentPageNumber;this._currentPageNumber=e;this._updateCurrentPage();this.requestUpdate("currentPage",t)}}get maxPages(){return this._maxPageNumber}set maxPages(e){if(this._maxPageNumber!==e){const t=this._maxPageNumber;this._maxPageNumber=e;if(e>0)this._minPageNumber=1;this.update();this.requestUpdate("maxPages",t)}}_onInputChange(e){this.currentPage=e.target.value}_updateCurrentPage(){if(0===this._currentPageNumber)this._currentPageNumber=this._maxPageNumber>0?1:this._currentPageNumber;else this._currentPageNumber=Math.max(0,Math.min(this._currentPageNumber,this._maxPageNumber));if(this._currentPageNumber!==this._prevValue)this._invokeEvent("pageChanged",{value:this._currentPageNumber});this._prevValue=this._currentPageNumber;this.update()}_processUpdateLayout(){let e=this;return new Promise(t=>{e._inputWidth=e._inputLabelElem.offsetWidth+20;t()})}firstPage(){if(this._isEnabled&&this.currentPage!==this._minPageNumber)this.currentPage=this._minPageNumber}lastPage(){if(this._isEnabled&&this.currentPage!==this._maxPageNumber)this.currentPage=this._maxPageNumber}nextPage(){if(this._isEnabled&&this.currentPage<this._maxPageNumber)this.currentPage++}prevPage(){if(this._isEnabled&&this.currentPage>this._minPageNumber)this.currentPage--}_updateColorSchemeSettings(e){this._currentColorSchemeSettings=css``;switch(e){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiPaginatorDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiPaginatorLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText=""}}_updateThemeSettings(e){this._currentThemeSettings=css``;switch(e){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiPaginatorOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText=""}}firstUpdated(e){this._updateReferences();let t=this,a=setTimeout(function(){t._updateCurrentPage();clearTimeout(a)},10);this.updateLayout()}render(){return html`             <style>                 ${this._currentControlStyleSettings}                 ${this._currentThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentCustomStyle}             </style>             <div data-ctrl="paginator" class=${classMap(this._getControlClass())}>                 <span class="iui-paginator-button iui-paginator-first" style=${styleMap({opacity:this._currentPageNumber===this._minPageNumber?.5:1})} @click="${()=>this.firstPage()}"></span>                 <span class="iui-paginator-button iui-paginator-prev" style=${styleMap({opacity:this._currentPageNumber===this._minPageNumber?.5:1})} @click="${()=>this.prevPage()}"></span>                 <input type="number" class="iui-paginator-input" style=${styleMap({width:this._inputWidth+"px"})} min="${this._minPageNumber}" max="${this._maxPageNumber}" .value="${this._currentPageNumber}" @change="${e=>this._onInputChange(e)}" />                 <span id="input-label" class="iui-paginator-label"> / ${this._maxPageNumber}</span>                 <span class="iui-paginator-button iui-paginator-next" style=${styleMap({opacity:this._currentPageNumber===this._maxPageNumber?.5:1})} @click="${()=>this.nextPage()}"></span>                 <span class="iui-paginator-button iui-paginator-last" style=${styleMap({opacity:this._currentPageNumber===this._maxPageNumber?.5:1})} @click="${()=>this.lastPage()}"></span>             </div>         `}_updateControlStyleSettings(e){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiPaginatorDefaultStyle.cssText,"../../icons",e)}async updateLayout(){await this._processUpdateLayout();this.update()}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=paginator]");this._inputLabelElem=this.shadowRoot.querySelector("#input-label")}}window.customElements.define("iui-paginator",IntegralUIPaginator);export default IntegralUIPaginator;