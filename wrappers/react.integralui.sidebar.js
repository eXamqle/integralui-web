/*
  filename: react.integralui.sidebar.js
  version : 21.4.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import React,{Component}from"react";import"../components/integralui.sidebar.js";var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1;s.configurable=!0;if("value"in s)s.writable=!0;Object.defineProperty(e,s.key,s)}}return function(t,i,s){if(i)e(t.prototype,i);if(s)e(t,s);return t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&("object"===typeof t||"function"===typeof t)?t:e}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var IntegralUISideBarComponent=function(e){_inherits(t,Component);function t(e){_classCallCheck(this,t);var i=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));i.ctrlRef=React.createRef();return i}_createClass(t,[{key:"_isCtrlDefined",value:function(){return this.ctrlRef&&this.ctrlRef.current?!0:!1}},{key:"componentDidMount",value:function(){var e=this;this._initProps();if(this._isCtrlDefined()){if(this.props.afterSelect)this.ctrlRef.current.addEventListener("afterSelect",function(t){return e.props.afterSelect(t)});if(this.props.beforeSelect)this.ctrlRef.current.addEventListener("beforeSelect",function(t){return e.props.beforeSelect(t)});if(this.props.change)this.ctrlRef.current.addEventListener("change",function(t){return e.props.change(t)});if(this.props.clear)this.ctrlRef.current.addEventListener("clear",function(){return e.props.clear()});if(this.props.enabledChanged)this.ctrlRef.current.addEventListener("enabledChanged",function(t){return e.props.enabledChanged(t)});if(this.props.selectionChanged)this.ctrlRef.current.addEventListener("selectionChanged",function(t){return e.props.selectionChanged(t)});if(this.props.sizeChanged)this.ctrlRef.current.addEventListener("sizeChanged",function(t){return e.props.sizeChanged(t)});if(this.props.stateChanged)this.ctrlRef.current.addEventListener("stateChanged",function(t){return e.props.stateChanged(t)})}}},{key:"_isDefined",value:function(e){return void 0!==e?!0:!1}},{key:"componentWillUnmount",value:function(){if(this._isCtrlDefined()){if(this.props.afterSelect)this.ctrlRef.current.removeEventListener("afterSelect",this.props.afterSelect);if(this.props.beforeSelect)this.ctrlRef.current.removeEventListener("beforeSelect",this.props.beforeSelect);if(this.props.change)this.ctrlRef.current.removeEventListener("change",this.props.change);if(this.props.clear)this.ctrlRef.current.removeEventListener("clear",this.props.clear);if(this.props.enabledChanged)this.ctrlRef.current.removeEventListener("enabledChanged",this.props.enabledChanged);if(this.props.selectionChanged)this.ctrlRef.current.removeEventListener("selectionChanged",this.props.selectionChanged);if(this.props.sizeChanged)this.ctrlRef.current.removeEventListener("sizeChanged",this.props.sizeChanged);if(this.props.stateChanged)this.ctrlRef.current.removeEventListener("stateChanged",this.props.stateChanged)}}},{key:"componentDidUpdate",value:function(e){this._updateData(e)}},{key:"_initProps",value:function(){if(this._isCtrlDefined()){if(this._isDefined(this.props.resourcePath))this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this._isDefined(this.props.allowAnimation))this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this._isDefined(this.props.animationSpeed))this.ctrlRef.current.animationSpeed=this.props.animationSpeed;if(this._isDefined(this.props.customStyle))this.ctrlRef.current.customStyle=this.props.customStyle;if(this._isDefined(this.props.data))this.ctrlRef.current.data=this.props.data;if(this._isDefined(this.props.displayMode))this.ctrlRef.current.displayMode=this.props.displayMode;if(this._isDefined(this.props.enabled))this.ctrlRef.current.enabled=this.props.enabled;if(this._isDefined(this.props.expanded))this.ctrlRef.current.expanded=this.props.expanded;if(this._isDefined(this.props.name))this.ctrlRef.current.name=this.props.name;if(this._isDefined(this.props.placement))this.ctrlRef.current.placement=this.props.placement;if(this._isDefined(this.props.selectedIndex))this.ctrlRef.current.selectedIndex=this.props.selectedIndex;if(this._isDefined(this.props.selectedTab))this.ctrlRef.current.selectedTab=this.props.selectedTab;if(this._isDefined(this.props.size))this.ctrlRef.current.size=this.props.size;if(this._isDefined(this.props.state))this.ctrlRef.current.state=this.props.state;if(this._isDefined(this.props.tabs))this.ctrlRef.current.tabs=this.props.tabs;if(this._isDefined(this.props.tabSpacing))this.ctrlRef.current.tabSpacing=this.props.tabSpacing;if(this._isDefined(this.props.tabTemplate))this.ctrlRef.current.tabTemplate=this.props.tabTemplate;if(this._isDefined(this.props.theme))this.ctrlRef.current.theme=this.props.theme}}},{key:"_updateData",value:function(e){if(this._isCtrlDefined()){if(this.props.resourcePath!==e.resourcePath)this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this.props.allowAnimation!==e.allowAnimation)this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this.props.animationSpeed!==e.animationSpeed)this.ctrlRef.current.animationSpeed=this.props.animationSpeed;if(this.props.customStyle!==e.customStyle)this.ctrlRef.current.customStyle=this.props.customStyle;if(this.props.data!==e.data)this.ctrlRef.current.data=this.props.data;if(this.props.displayMode!==e.displayMode)this.ctrlRef.current.displayMode=this.props.displayMode;if(this.props.enabled!==e.enabled)this.ctrlRef.current.enabled=this.props.enabled;if(this.props.expanded!==e.expanded)this.ctrlRef.current.expanded=this.props.expanded;if(this.props.name!==e.name)this.ctrlRef.current.name=this.props.name;if(this.props.placement!==e.placement)this.ctrlRef.current.placement=this.props.placement;if(this.props.selectedIndex!==e.selectedIndex)this.ctrlRef.current.selectedIndex=this.props.selectedIndex;if(this.props.selectedTab!==e.selectedTab)this.ctrlRef.current.selectedTab=this.props.selectedTab;if(this.props.size!==e.size)this.ctrlRef.current.size=this.props.size;if(this.props.state!==e.state)this.ctrlRef.current.state=this.props.state;if(this._isDefined(this.props.tabs))this.ctrlRef.current.tabs=this.props.tabs;if(this.props.tabSpacing!==e.tabSpacing)this.ctrlRef.current.tabSpacing=this.props.tabSpacing;if(this._isDefined(this.props.tabTemplate))this.ctrlRef.current.tabTemplate=this.props.tabTemplate;if(this.props.theme!==e.theme)this.ctrlRef.current.theme=this.props.theme}}},{key:"collapse",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.collapse()}},{key:"expand",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.expand()}},{key:"toggle",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.toggle()}},{key:"selectTab",value:function(e){if(this._isCtrlDefined())this.ctrlRef.current.selectTab(e)}},{key:"setStyle",value:function(e){if(this._isCtrlDefined())this.ctrlRef.current.setStyle(e)}},{key:"refresh",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.refresh()}},{key:"updateLayout",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.updateLayout()}},{key:"render",value:function(){return React.createElement("iui-sidebar",{id:this.props.id,ref:this.ctrlRef},this.props.children)}}]);return t}();export default IntegralUISideBarComponent;