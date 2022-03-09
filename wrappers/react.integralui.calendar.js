/*
  filename: react.integralui.calendar.js
  version : 22.1.0
  Copyright © 2016-2022 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import React,{Component}from"react";import"../components/integralui.calendar.js";var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var s=e[r];s.enumerable=s.enumerable||!1;s.configurable=!0;if("value"in s)s.writable=!0;Object.defineProperty(t,s.key,s)}}return function(e,r,s){if(r)t(e.prototype,r);if(s)t(e,s);return e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&("object"===typeof e||"function"===typeof e)?e:t}function _inherits(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});if(e)Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e}var IntegralUICalendarComponent=function(t){_inherits(e,Component);function e(t){_classCallCheck(this,e);var r=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));r.ctrlRef=React.createRef();return r}_createClass(e,[{key:"componentDidMount",value:function(){var t=this;this._initProps();if(this.ctrlRef&&this.ctrlRef.current){if(this.props.dateChanged)this.ctrlRef.current.addEventListener("dateChanged",function(e){return t.props.dateChanged(e)});if(this.props.enabledChanged)this.ctrlRef.current.addEventListener("enabledChanged",function(e){return t.props.enabledChanged(e)});if(this.props.sizeChanged)this.ctrlRef.current.addEventListener("sizeChanged",function(e){return t.props.sizeChanged(e)});if(this.props.stateChanged)this.ctrlRef.current.addEventListener("stateChanged",function(e){return t.props.stateChanged(e)})}}},{key:"componentWillUnmount",value:function(){if(this.ctrlRef&&this.ctrlRef.current){if(this.props.dateChanged)this.ctrlRef.current.removeEventListener("dateChanged",this.props.dateChanged);if(this.props.enabledChanged)this.ctrlRef.current.removeEventListener("enabledChanged",this.props.enabledChanged);if(this.props.sizeChanged)this.ctrlRef.current.removeEventListener("sizeChanged",this.props.sizeChanged);if(this.props.stateChanged)this.ctrlRef.current.removeEventListener("stateChanged",this.props.stateChanged)}}},{key:"componentDidUpdate",value:function(t){this._updateData(t)}},{key:"_initProps",value:function(){if(this.ctrlRef&&this.ctrlRef.current){if(this._isDefined(this.props.allowAnimation))this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this._isDefined(this.props.allowUpdate))this.ctrlRef.current.allowUpdate=this.props.allowUpdate;if(this._isDefined(this.props.colorScheme))this.ctrlRef.current.colorScheme=this.props.colorScheme;if(this._isDefined(this.props.customStyle))this.ctrlRef.current.customStyle=this.props.customStyle;if(this._isDefined(this.props.data))this.ctrlRef.current.data=this.props.data;if(this._isDefined(this.props.enabled))this.ctrlRef.current.enabled=this.props.enabled;if(this._isDefined(this.props.firstDayOfWeek))this.ctrlRef.current.firstDayOfWeek=this.props.firstDayOfWeek;if(this._isDefined(this.props.locales))this.ctrlRef.current.locales=this.props.locales;if(this._isDefined(this.props.name))this.ctrlRef.current.name=this.props.name;if(this._isDefined(this.props.resourcePath))this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this._isDefined(this.props.selectedDate))this.ctrlRef.current.selectedDate=this.props.selectedDate;if(this._isDefined(this.props.showToday))this.ctrlRef.current.showToday=this.props.showToday;if(this._isDefined(this.props.size))this.ctrlRef.current.size=this.props.size;if(this._isDefined(this.props.state))this.ctrlRef.current.state=this.props.state;if(this._isDefined(this.props.theme))this.ctrlRef.current.theme=this.props.theme;if(this._isDefined(this.props.todayDate))this.ctrlRef.current.todayDate=this.props.todayDate}}},{key:"_isDefined",value:function(t){return void 0!==t?!0:!1}},{key:"_updateData",value:function(t){if(this.ctrlRef&&this.ctrlRef.current){if(this.props.allowAnimation!==t.allowAnimation)this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this.props.allowUpdate!==t.allowUpdate)this.ctrlRef.current.allowUpdate=this.props.allowUpdate;if(this.props.colorScheme!==t.colorScheme)this.ctrlRef.current.colorScheme=this.props.colorScheme;if(this.props.customStyle!==t.customStyle)this.ctrlRef.current.customStyle=this.props.customStyle;if(this.props.data!==t.data)this.ctrlRef.current.data=this.props.data;if(this.props.enabled!==t.enabled)this.ctrlRef.current.enabled=this.props.enabled;if(this.props.firstDayOfWeek!==t.firstDayOfWeek)this.ctrlRef.current.firstDayOfWeek=this.props.firstDayOfWeek;if(this.props.locales!==t.locales)this.ctrlRef.current.locales=this.props.locales;if(this.props.name!==t.name)this.ctrlRef.current.name=this.props.name;if(this.props.resourcePath!==t.resourcePath)this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this.props.selectedDate!==t.selectedDate)this.ctrlRef.current.selectedDate=this.props.selectedDate;if(this.props.showToday!==t.showToday)this.ctrlRef.current.showToday=this.props.showToday;if(this.props.size!==t.size)this.ctrlRef.current.size=this.props.size;if(this.props.state!==t.state)this.ctrlRef.current.state=this.props.state;if(this.props.theme!==t.theme)this.ctrlRef.current.theme=this.props.theme;if(this.props.todayDate!==t.todayDate)this.ctrlRef.current.todayDate=this.props.todayDate}}},{key:"setStyle",value:function(t){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.setStyle(t)}},{key:"refresh",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.refresh()}},{key:"updateLayout",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.updateLayout()}},{key:"render",value:function(){return React.createElement("iui-calendar",{id:this.props.id,ref:this.ctrlRef},this.props.children)}}]);return e}();export default IntegralUICalendarComponent;