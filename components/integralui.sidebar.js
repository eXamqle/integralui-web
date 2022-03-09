/*
  filename: integralui.sidebar.js
  version : 22.1.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,T as TemplateResult,a as defaultTemplateProcessor,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import IntegralUIBase from"./integralui.base.js";import IntegralUIDataService from"../services/integralui.data.service.js";import{IntegralUIAnimationType,IntegralUISpeedMode,IntegralUIPlacement,IntegralUITabDisplayMode,IntegralUIObjectState,IntegralUIColorScheme,IntegralUITheme}from"./integralui.enums.js";import{iuiTabDefaultStyle}from"../styles/default/integralui.sidetab.style.js";import{iuiTabDarkStyle}from"../styles/color-schemes/dark/integralui.sidetab.dark.js";import{iuiTabOfficeStyle}from"../styles/themes/office/integralui.sidetab.office.js";import{iuiTabLightStyle}from"../styles/color-schemes/light/integralui.sidetab.light.js";import{iuiSideBarDefaultStyle}from"../styles/default/integralui.sidebar.style.js";import{iuiSideBarDarkStyle}from"../styles/color-schemes/dark/integralui.sidebar.dark.js";import{iuiSideBarOfficeStyle}from"../styles/themes/office/integralui.sidebar.office.js";import{iuiSideBarLightStyle}from"../styles/color-schemes/light/integralui.sidebar.light.js";class IntegralUISideBar extends IntegralUIBase{_init(){super._init();this._dataService=new IntegralUIDataService();this._animationTimer=null;this._currentAnimation=IntegralUIAnimationType.Fade;this._currentAnimationSpeed=IntegralUISpeedMode.Normal;this._currentTabs=[];this._dataTabs=[];this._numTabs=0;this._tabList=[];this._ctrlCursor="default";this._currentTabSpacing=0;this._isExpanded=!1;this._autoSizeValue=!1;this._blockPos={top:"0",right:"auto",bottom:"auto",left:"0"};this._contentBlockOpacity=0;this._contentBlockPos={top:0,left:0};this._contentBlockSize={width:0,height:0};this._clientRect={width:0,height:0};this._ctrlMaxSize={width:0,height:0};this._currentPlacement=IntegralUIPlacement.Left;this._currentDisplayMode=IntegralUITabDisplayMode.AutoSized;this._emptyTabSpace=0;this._orgTabHeaderSpace=[];this._reorderTabRect={left:0,top:0};this._scrollBlockSize={width:0,height:0};this._scrollButtonSize={width:0,height:0};this._selTabLinePos={top:0,left:0};this._selTabLineSize={width:0,height:0};this._tabHeaderRect=[];this._tabPos={top:0,left:0};this._tabSize={width:0,height:0};this._sidebarPos={top:"0",right:"auto",bottom:"auto",left:"0"};this._tabStripSize={width:0,height:0};this._toolbarPos={top:"0",bottom:"auto"};this._updateTimer=null;this._currentControlStyleSettings=iuiSideBarDefaultStyle;this._currentTabColorSchemeSettings=css``;this._currentTabStyleSettings=iuiTabDefaultStyle;this._currentSelection=null;this._currentSelectedIndex=-1;this._selectedComponent=null;this._prevComponent=null;this._removeIndex=-1;this._currentTabThemeSettings=css``;this._generalClassName="iui-sidebar";this._tabHeaderClassName="iui-tab-header"}connectedCallback(){}disconnectedCallback(){if(this._scrollTimer)clearInterval(this._scrollTimer);this._removeAnimationTimer();this._rt()}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i)}static get properties(){return{animation:{converter:{fromAttribute:t=>{switch((t=t.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"fade":return IntegralUIAnimationType.Fade;default:return IntegralUIAnimationType.None}},toAttribute:t=>{switch(t){case IntegralUIAnimationType.Fade:return"Fade";default:return"None"}}},reflect:!0},animationSpeed:{attribute:"animation-speed",converter:{fromAttribute:t=>{switch((t=t.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"veryslow":return IntegralUISpeedMode.VerySlow;case"slow":return IntegralUISpeedMode.Slow;case"fast":return IntegralUISpeedMode.Fast;case"veryfast":return IntegralUISpeedMode.VeryFast;default:return IntegralUISpeedMode.Normal}},toAttribute:t=>{switch(t){case IntegralUISpeedMode.VerySlow:return"VerySlow";case IntegralUISpeedMode.Slow:return"Slow";case IntegralUISpeedMode.Fast:return"Fast";case IntegralUISpeedMode.VeryFast:return"VeryFast";default:return"Normal"}}},reflect:!0},expanded:{type:Boolean},selectedIndex:{type:Number,attribute:"selected-index"},selectedTab:{type:Object,attribute:"selected-tab"},tabs:{type:Array},tabSpacing:{type:Number,attribute:"tab-spacing",reflect:!0},placement_2:{converter:{fromAttribute:t=>{switch((t=t.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()){case"bottom":return IntegralUIPlacement.Bottom;case"left":return IntegralUIPlacement.Left;case"right":return IntegralUIPlacement.Right;default:return IntegralUIPlacement.Top}},toAttribute:t=>{switch(t){case IntegralUIPlacement.Bottom:return"Bottom";case IntegralUIPlacement.Left:return"Left";case IntegralUIPlacement.Right:return"Right";default:return"Top"}}},reflect:!0}}}get animation(){return this._currentAnimation}set animation(t){if(this._currentAnimation!==t){const e=this._currentAnimation;this._currentAnimation=t;this.requestUpdate("animation",e);this.updateLayout()}}get animationSpeed(){return this._currentAnimationSpeed}set animationSpeed(t){if(this._currentAnimationSpeed!==t){const e=this._currentAnimationSpeed;this._currentAnimationSpeed=t;this.requestUpdate("animationSpeed",e)}}get displayMode(){return this._currentDisplayMode}set displayMode(t){if(this._autoSizeValue!==t){const e=this._currentDisplayMode;this._currentDisplayMode=t;this.requestUpdate("displayMode",e);this.updateLayout()}}get expanded(){return this._isExpanded}set expanded(t){if(this._isExpanded!==t){const e=this._isExpanded;let i=this,a={cancel:!1,item:this._currentSelection};i._invokeEvent("beforeExpand",a);if(!0!==a.cancel){i._isExpanded=t;i._toggleContent();i.requestUpdate("expanded",e)}}}get selectedIndex(){return this._currentSelectedIndex}set selectedIndex(t){if(this._currentSelectedIndex!==t){const e=this._currentSelectedIndex;this._currentSelectedIndex=t;this._selectComponentByIndex(t);this.requestUpdate("selectedIndex",e)}}get selectedTab(){return this._currentSelection}set selectedTab(t){if(this._currentSelection!==t){const e=this._currentSelection;this._currentSelection=t;this.selectTab(t);this.requestUpdate("selectedTab",e)}}get size(){return this._ctrlSize}set size(t){if(t){let e=!1;const i=this._ctrlSize;if(void 0!==t.width&&this._ctrlSize.width!==t.width){this._ctrlSize.width=t.width;e=!0}if(void 0!==t.height&&this._ctrlSize.height!==t.height){this._ctrlSize.height=t.height;e=!0}if(e){this._ctrlMaxSize={width:this._ctrlSize.width,height:this._ctrlSize.height};this._invokeEvent("sizeChanged",{size:this._ctrlSize});this.requestUpdate("size",i);this.updateLayout()}}}get tabSpacing(){return this._currentTabSpacing}set tabSpacing(t){if(this._currentTabSpacing!==t){const e=this._currentTabSpacing;this._currentTabSpacing=t;this.requestUpdate("tabSpacing",e)}}get placement_2(){return this._currentPlacement}set placement_2(t){if(this._currentPlacement!==t){const e=this._currentPlacement;this._currentPlacement=t;this.requestUpdate("placement",e);this.updateLayout()}}_animate(){switch(this.animation){case IntegralUIAnimationType.Fade:if(this.allowAnimation)this._fadeTabContent();break;default:this._defaultFunc()}}_fadeTabContent(){let t=this;t._removeAnimationTimer();let e=0,i=1/t._getAnimationFactor();if(t._prevComponent){t._prevComponent.updateOpacity(1);t._prevComponent.updateVisibility(!1)}if(t._selectedComponent){t._selectedComponent.updateOpacity(0);t._selectedComponent.updateVisibility(!1)}t._animationTimer=setInterval(function(){if(e<1){e+=i;if(t._prevComponent)t._prevComponent.updateOpacity(1-e);if(t._selectedComponent)t._selectedComponent.updateOpacity(e)}else{e=1;if(t._prevComponent){t._prevComponent.updateOpacity(0);t._prevComponent.updateVisibility(!0)}if(t._selectedComponent)t._selectedComponent.updateOpacity(1);t._removeAnimationTimer()}},15)}_getAnimationFactor(){let t=15;switch(this.animationSpeed){case IntegralUISpeedMode.VerySlow:t=25;break;case IntegralUISpeedMode.Slow:t=20;break;case IntegralUISpeedMode.Fast:t=10;break;case IntegralUISpeedMode.VeryFast:t=5;break;default:t=15}return t}_removeAnimationTimer(){if(this._animationTimer)clearInterval(this._animationTimer)}_updateData(){this._dataService.init([{data:this._currentTabs}])}collapse(){this.expanded=!1}expand(){this.expanded=!0}toggle(){this.expanded=!this.expanded}_toggleContent(){let t=this,e=t._isExpanded?t._tabStripSize.width+2:t._ctrlMaxSize.width,i=0;if(t._isExpanded){this._contentBlockOpacity=1;if(t._isAnimationAllowed){let a=setInterval(function(){if(e<t._ctrlMaxSize.width){e+=i=0===i?1:i+2;t._ctrlSize.width=e;t._updateContentSize();t.update();t._callSizeChanged()}else{t._ctrlSize.width=t._ctrlMaxSize.width;t._updateContentSize();t.update();t._callSizeChanged();clearInterval(a)}},15)}else{t._ctrlSize.width=t._ctrlMaxSize.width;t._updateContentSize();t.update();t._callSizeChanged()}}else if(t._isAnimationAllowed){let a=setInterval(function(){if(e>t._tabStripSize.width){e-=i=0===i?1:i+2;t._ctrlSize.width=e;t._updateContentSize();t.update();t._callSizeChanged()}else{t._contentBlockOpacity=0;t._ctrlSize.width=t._tabStripSize.width+2;t._updateContentSize();t.update();t._callSizeChanged();clearInterval(a)}},15)}else{t._contentBlockOpacity=0;t._ctrlSize.width=t._tabStripSize.width+2;t._updateContentSize();t.update();t._callSizeChanged()}}_updateContentSize(){let t=this._commonService.getBorderWidth(this._elemRef),e=this._commonService.getBorderWidth(this._contentElem);this._contentBlockSize={width:this._ctrlSize.width-this._tabStripSize.width-(t.left+t.right)-(e.left+e.right),height:this._ctrlSize.height-(t.top+t.bottom)-(e.top+e.bottom)}}_callSizeChanged(){this._invokeEvent("sizeChanged",{size:this._ctrlSize})}_getComponentData(t){if(t)if(t.data)return t.data;else{let e=this._getTabDataIndex(t);return this._currentTabs[e]}return null}_getTabCurrentIndex(t){return t&&this._tabList?this._tabList.indexOf(t):-1}_getTabDataIndex(t){if(t){let e=this._getTabCurrentIndex(t);return this._commonService.isIndexInRange(e,this._currentTabs)?e:-1}return-1}_getTabData(t){return this._currentTabs&&t>=0&&t<this._currentTabs.length?this._currentTabs[t]:null}_getTabIndex(t){return t&&this._currentTabs?this._currentTabs.indexOf(t):-1}_getTabHeaders(){this._tabHeaders=this.shadowRoot.querySelectorAll("li[data-header]");return this._tabHeaders}_resetLayout(){if(this._updateTimer)clearTimeout(this._updateTimer);this._updateTimer=null}async updateLayout(){this._ut();if(!this._tCmp)this._at();this._updateTabList();this.update();await this._updateTabLayout();await this._updateTabLayout();this.update()}_updateTabLayout(){return new Promise(t=>{let e=this;e._clientRect={width:e._elemRef.clientWidth,height:e._elemRef.clientHeight};e._tabStripSize={width:e._clientRect.width-2,height:e._clientRect.height-2};let i=e._commonService.getBorderWidth(e._tabBlock),a=e._getTabHeaders();if(a){let t={x:0,y:0},r={width:0,height:0},s={top:0,left:0},n={width:0,height:0};e._tabSize={width:0,height:0};e._tabHeaderRect.length=0;e._orgTabHeaderSpace.length=0;let l=e._commonService.getBorderWidth(e._elemRef),o=e._commonService.getBorderWidth(e._contentElem);if(a&&a.length>0){a.forEach(function(i,a){i.style.width="auto";i.style.height="auto";let s=e._commonService.getPadding(i),n=e._commonService.getBorderWidth(i);r={width:i.offsetWidth,height:i.offsetHeight};e._orgTabHeaderSpace.push({border:n,padding:s,size:r});if(e._currentPlacement===IntegralUIPlacement.Left||e._currentPlacement===IntegralUIPlacement.Right)r.width+=5;let l={top:0,left:t.x,width:r.width,height:r.height};switch(e._currentPlacement){case IntegralUIPlacement.Right:e._sidebarPos={top:-e._currentScrollPos+"px",right:"0",bottom:"auto",left:"auto"};i.style.top=t.y+"px";i.style.right="0";i.style.bottom="auto";i.style.left="auto";if(e._tabSize.width<r.width)e._tabSize.width=r.width;break;case IntegralUIPlacement.Bottom:e._sidebarPos={top:"auto",right:"auto",bottom:"0",left:-e._currentScrollPos+"px"};i.style.top="auto";i.style.right="auto";i.style.bottom="0";i.style.left=t.x+"px";if(e._tabSize.height<r.height)e._tabSize.height=r.height;break;case IntegralUIPlacement.Left:e._sidebarPos={top:-e._currentScrollPos+"px",right:"auto",bottom:"auto",left:"0"};i.style.top=t.y+"px";i.style.right="auto";i.style.bottom="auto";i.style.left="0";if(e._tabSize.width<r.width)e._tabSize.width=r.width;break;default:e._sidebarPos={top:"0",right:"auto",bottom:"auto",left:-e._currentScrollPos+"px"};i.style.top="0";i.style.right="auto";i.style.bottom="auto";i.style.left=t.x+"px";if(e._tabSize.height<r.height)e._tabSize.height=r.height}if(e._currentPlacement===IntegralUIPlacement.Left||e._currentPlacement===IntegralUIPlacement.Right)l.top=t.y;e._tabHeaderRect.push(l);let o=e.tabSpacing;t.x+=r.width+o-1;t.y+=r.height+o-1});e.tabPos={top:0,left:0};switch(e._currentPlacement){case IntegralUIPlacement.Right:e._blockPos={top:"0",right:"0",bottom:"auto",left:"auto"};e._tabStripSize.width=e._tabSize.width+i.left+i.right;e._contentBlockPos={top:0,left:0};e._contentBlockSize={width:e._elemRef.clientWidth-e._tabStripSize.width-(l.left+l.right),height:e._elemRef.clientHeight-(l.top+l.bottom)};break;case IntegralUIPlacement.Bottom:e._blockPos={top:"auto",right:"auto",bottom:"0",left:e.toolbarLeftElem?e.toolbarLeftElem.offsetWidth+"px":"0"};e._tabStripSize.height=e._tabSize.height+i.top+i.bottom;e._contentBlockPos={top:0,left:0};e._contentBlockSize={width:e._elemRef.clientWidth-(l.left+l.right),height:e._elemRef.clientHeight-e._tabStripSize.height-(l.top+l.bottom)};e._toolbarPos={top:"auto",bottom:"0"};break;case IntegralUIPlacement.Left:e._blockPos={top:"0",right:"auto",bottom:"auto",left:"0"};e._tabStripSize.width=e._tabSize.width+i.left+i.right;e._contentBlockPos={top:0,left:e._tabStripSize.width-1};e._contentBlockSize={width:e._elemRef.clientWidth-e._tabStripSize.width-(l.left+l.right),height:e._elemRef.clientHeight-(l.top+l.bottom)};break;default:e._blockPos={top:"0",right:"auto",bottom:"auto",left:e._toolbarLeftElem?e._toolbarLeftElem.offsetWidth+"px":"0"};e._tabStripSize.height=e._tabSize.height+i.top+i.bottom;e._contentBlockPos={top:e._tabStripSize.height-1,left:0};e._contentBlockSize={width:e._elemRef.clientWidth-(l.left+l.right),height:e._elemRef.clientHeight-e._tabStripSize.height-(l.top+l.bottom-1)};e._toolbarPos={top:"0",bottom:"auto"}}e._contentBlockSize.width-=o.left+o.right;e._contentBlockSize.height-=o.top+o.bottom}a.forEach(function(t,i){let a=e._commonService.getPadding(t);switch(e._currentPlacement){case IntegralUIPlacement.Right:t.style.width=e._tabSize.width-(a.left+a.right)-1+"px";s={top:e.animation===IntegralUIAnimationType.Slide?-e._clientRect.height:0,left:0};n={width:e._elemRef.clientWidth-(l.left+l.right-1)-e._tabStripSize.width-2,height:e._elemRef.clientHeight-(l.top+l.bottom)};break;case IntegralUIPlacement.Bottom:t.style.bottom=e._tabPos.top+"px";t.style.height=e._tabSize.height-(a.top+a.bottom)+"px";s={top:0,left:e.animation===IntegralUIAnimationType.Slide?-e._clientRect.width:0};n={width:e._elemRef.clientWidth-(l.left+l.right),height:e._elemRef.clientHeight-e._tabStripSize.height-(l.top+l.bottom-1)};break;case IntegralUIPlacement.Left:t.style.width=e._tabSize.width-(a.left+a.right)-1+"px";s={top:e.animation===IntegralUIAnimationType.Slide?-e._clientRect.height:0,left:0};n={width:e._elemRef.clientWidth-(l.left+l.right-1)-e._tabStripSize.width-2,height:e._elemRef.clientHeight-(l.top+l.bottom)};break;default:t.style.top=e._tabPos.top+"px";s={top:0,left:e.animation===IntegralUIAnimationType.Slide?-e._clientRect.width:0};n={width:e._elemRef.clientWidth-(l.left+l.right),height:e._elemRef.clientHeight-e._tabStripSize.height-(l.top+l.bottom-1)};if(e.autoSizeValue)n.height="auto"}});if(e._tabList&&e._tabList.length>0)e._tabList.forEach(function(t){t.animation=e.animation;t.updateLayout(s,n,e.animation===IntegralUIAnimationType.Slide?!1:!0)});if(e._selectedComponent){e._selectedComponent.updatePos({left:0,top:0});e._selectedComponent.updateOpacity(1);e._selectedComponent.updateVisibility(!1)}e._ctrlSize.width=e._isExpanded?e._ctrlMaxSize.width:e._tabStripSize.width+2}t()})}_updateTabHeaders(){let t=this,e={x:0,y:0},i={width:0,height:0};t._tabHeaderRect.length=0;let a=t._getTabHeaders();if(a&&a.length>0)a.forEach(function(a,r){i={width:a.offsetWidth,height:a.offsetHeight};let s={top:0,left:e.x,width:i.width,height:i.height};switch(t._currentPlacement){case IntegralUIPlacement.Right:a.style.top=e.y+"px";a.style.right="0";a.style.bottom="auto";a.style.left="auto";break;case IntegralUIPlacement.Bottom:a.style.top="auto";a.style.right="auto";a.style.bottom="0";a.style.left=e.x+"px";break;case IntegralUIPlacement.Left:a.style.top=e.y+"px";a.style.right="auto";a.style.bottom="auto";a.style.left="0";break;default:a.style.top="0";a.style.right="auto";a.style.bottom="auto";a.style.left=e.x+"px"}if(t._currentPlacement===IntegralUIPlacement.Left||t._currentPlacement===IntegralUIPlacement.Right)s.top=e.y;t._tabHeaderRect.push(s);let n=t.tabSpacing;e.x+=i.width+n-1;e.y+=i.height+n-1})}_tabMouseDown(t,e){if(this._isEnabled&&1===t.which)this._selectComponent(e)}_tabEnter(t,e){if(this._isEnabled&&!e.selected){e.state|=IntegralUIObjectState.Hovered;this.update()}}_tabLeave(t,e){e.state&=~IntegralUIObjectState.Hovered;this.update()}_getTabOpacity(t){if(this._tabReorderActive&&t===this._reorderTab)return 0;else return 1}_clearSelection(t){this._tabList.forEach(function(e,i){if(e!==t)e.selected=!1})}_selectComponent(t,e){let i=this;if(t&&t!==i._selectedComponent){let a=i._getTabCurrentIndex(t),r=i._getComponentData(t),s={cancel:!1,index:a,tab:r};i._invokeEvent("beforeSelect",s);if(!0!==s.cancel){i._currentSelectedIndex=a;if(i._currentTabs&&a>=0&&a<i._currentTabs.length)i._currentSelection=i._currentTabs[a];i._prevComponent=i._selectedComponent;i._selectedComponent=t;i._clearSelection(t);t.selected=!0;if(i._currentDisplayMode===IntegralUITabDisplayMode.Compressed&&this._currentPlacement!==IntegralUIPlacement.Left&&this._currentPlacement!==IntegralUIPlacement.Right){i._updateTabHeaders();setTimeout(function(){i._animate()},10)}else i._animate();if(!e){i._invokeEvent("afterSelect",{index:a,tab:r});i._invokeEvent("selectionChanged",{index:a,tab:r})}i.expanded=!0;i.update();return!0}}else i.toggle();return!1}_selectComponentByIndex(t,e){let i=this;setTimeout(function(){if(i._commonService.isIndexInRange(t,i._tabList))i._selectComponent(i._tabList[t],e)},1)}selectTab(t,e){if(this._currentTabs){if(0===this._currentTabs.length)this._updateTabList();this._currentSelectedIndex=this._currentTabs.indexOf(t);this._selectComponentByIndex(this._currentSelectedIndex,e)}}_updateSelection(){if(this._currentSelection&&this._currentTabs)this._selectComponentByIndex(this._findTabIndexByID(this._currentSelection.id));else if(this._currentSelectedIndex>=0)this._selectComponentByIndex(this._currentSelectedIndex);else this._selectComponentByIndex(0)}_findTabIndexByID(t){let e=this._currentTabs.filter(e=>e.id===t);return e.length>0?this._currentTabs.indexOf(e[0]):-1}_getScrollBlockClass(){let t={};switch(this._currentPlacement){case IntegralUIPlacement.Right:t["iui-sidebar-scroll-border-left"]=!0;break;case IntegralUIPlacement.Bottom:t["iui-sidebar-scroll-border-top"]=!0;break;case IntegralUIPlacement.Left:t["iui-sidebar-scroll-border-right"]=!0;break;default:t["iui-sidebar-scroll-border-bottom"]=!0}return t}_getControlStyle(){let t={cursor:this._ctrlCursor};if(this._ctrlSize.width>0)t.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)t.height=this._ctrlSize.height+"px";return t}_getTabHeaderClass(t,e){let i=t._getCurrentTabStyle(),a={};a[i.header.normal]=!0;if(t.state&IntegralUIObjectState.Disabled)a[i.header.disabled]=!0;else if(t.state&IntegralUIObjectState.Focused)a[i.header.focused]=!0;else if(t.state&IntegralUIObjectState.Selected){a[i.header.selected]=!0;switch(this._currentPlacement){case IntegralUIPlacement.Right:a["iui-tab-selected-right"]=!0;break;case IntegralUIPlacement.Bottom:a["iui-tab-selected-bottom"]=!0;break;case IntegralUIPlacement.Left:a["iui-tab-selected-left"]=!0;break;default:a["iui-tab-selected-top"]=!0}}else if(t.state&IntegralUIObjectState.Hovered)a[i.header.hovered]=!0;return a}_updateColorSchemeSettings(t){this._currentColorSchemeSettings=css``;this._currentTabColorSchemeSettings=css``;switch(t){case IntegralUIColorScheme.Dark:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiSideBarDarkStyle.cssText,"../../../icons",this._currentResourcePath);this._currentTabColorSchemeSettings.cssText=this._commonService.replaceAll(iuiTabDarkStyle.cssText,"../../../icons",this._currentResourcePath);break;case IntegralUIColorScheme.Light:this._currentColorSchemeSettings.cssText=this._commonService.replaceAll(iuiSideBarLightStyle.cssText,"../../../icons",this._currentResourcePath);this._currentTabColorSchemeSettings.cssText=this._commonService.replaceAll(iuiTabLightStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentColorSchemeSettings.cssText="";this._currentTabColorSchemeSettings.cssText=""}}_updateThemeSettings(t){this._currentThemeSettings=css``;this._currentTabThemeSettings=css``;switch(t){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiSideBarOfficeStyle.cssText,"../../../icons",this._currentResourcePath);this._currentTabThemeSettings.cssText=this._commonService.replaceAll(iuiTabOfficeStyle.cssText,"../../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText="";this._currentTabThemeSettings.cssText=""}}_getTabTemplate(t){let e=this.tabTemplate;if(e){let i=e(t);return new TemplateResult(i.strings,i.values,"html",defaultTemplateProcessor)}else return html` 				${t.icon?html`<span class=${classMap(this._getTabIcon(t.icon))}></span>`:html``} 			`}_tabTouchStart(t,e){if(this._isEnabled)this._selectComponent(e)}firstUpdated(t){this._updateReferences();this._refreshTabParent()}refresh(){this._updateStyle(this.controlStyle);this._updateControlClass();this.update();this._updateReferences()}_refreshTabParent(){let t=this;setTimeout(function(){t._contentSlotElem=t._contentElem.querySelector("slot").assignedNodes();t._updateTabList();t._tabList.map(e=>e.setParent(t));t.updateLayout()},10)}_getTabIcon(t){let e={};if(this._commonService.isString(t)){t.split(" ").map(t=>e[t]=!0)}return e}render(){return html`             <style> 				${this._currentControlStyleSettings} 				${this._currentTabStyleSettings}                 ${this._currentThemeSettings} 				${this._currentTabThemeSettings}                 ${this._currentColorSchemeSettings}                 ${this._currentTabColorSchemeSettings}                 ${this._currentCustomStyle}             </style> 			<div data-ctrl="sidebar" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())}> 				<div id="tab-block" class="iui-sidebar-block" style=${styleMap({top:this._blockPos.top,right:this._blockPos.right,bottom:this._blockPos.bottom,left:this._blockPos.left,width:this._tabStripSize.width+"px",height:this._tabStripSize.height+"px"})}> 					<ul style=${styleMap({top:this._sidebarPos.top,right:this._sidebarPos.right,bottom:this._sidebarPos.bottom,left:this._sidebarPos.left})}> 						${this._tabList.map(t=>html` 							<li data-header class=${classMap(this._getTabHeaderClass(t))} style=${styleMap({opacity:this._getTabOpacity(t),"z-index":t._elemOrder})} @mouseenter="${e=>this._tabEnter(e,t)}" @mouseleave="${e=>this._tabLeave(e,t)}" @mousedown="${e=>this._tabMouseDown(e,t)}" @touchstart="${e=>this._tabTouchStart(e,t)}"> 								${this._getTabTemplate(t)} 							</li> 						`)} 					</ul> 				</div> 				<div id="content" class="iui-sidebar-content" style=${styleMap({top:this._contentBlockPos.top+"px",left:this._contentBlockPos.left+"px",width:this._contentBlockSize.width+"px",height:this._contentBlockSize.height+"px",opacity:this._contentBlockOpacity})}> 					<slot @slotchange="${t=>this._slotChange(t)}"></slot> 				</div> 			</div>         `}updated(t){}_updateControlStyleSettings(t){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiSideBarDefaultStyle.cssText,"../../icons",t);this._currentTabStyleSettings=css``;this._currentTabStyleSettings.cssText=this._commonService.replaceAll(iuiTabDefaultStyle.cssText,"../../icons",t)}_updateTabList(){this._contentSlotElem=this._contentElem.querySelector("slot").assignedNodes();this._tabList=this._contentSlotElem?this._contentSlotElem.filter(t=>"iui-tab"===t.nodeName.toLowerCase()):[];this._currentTabs=this._tabList.map(t=>t.data);this._updateData()}_slotChange(t){this._updateReferences();this.updateLayout()}_updateReferences(){this._contentElem=this.shadowRoot.querySelector("#content");this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=sidebar]");this._tabBlock=this.shadowRoot.querySelector("#tab-block")}}window.customElements.define("iui-sidebar",IntegralUISideBar);export default IntegralUISideBar;