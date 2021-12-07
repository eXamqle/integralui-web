/*
  filename: react.integralui.splitter.js
  version : 21.4.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import React,{Component}from"react";import"../components/integralui.splitter.js";var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1;r.configurable=!0;if("value"in r)r.writable=!0;Object.defineProperty(t,r.key,r)}}return function(e,i,r){if(i)t(e.prototype,i);if(r)t(e,r);return e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&("object"===typeof e||"function"===typeof e)?e:t}function _inherits(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});if(e)Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e}var IntegralUISplitterComponent=function(t){_inherits(e,Component);function e(t){_classCallCheck(this,e);var i=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));i.ctrlRef=React.createRef();return i}_createClass(e,[{key:"_isCtrlDefined",value:function(){return this.ctrlRef&&this.ctrlRef.current?!0:!1}},{key:"componentDidMount",value:function(){var t=this;this._initProps();if(this._isCtrlDefined()){if(this.props.enabledChanged)this.ctrlRef.current.addEventListener("enabledChanged",function(e){return t.props.enabledChanged(e)});if(this.props.sizeChanged)this.ctrlRef.current.addEventListener("sizeChanged",function(e){return t.props.sizeChanged(e)});if(this.props.splitterMoved)this.ctrlRef.current.addEventListener("splitterMoved",function(e){return t.props.splitterMoved(e)});if(this.props.splitterMoving)this.ctrlRef.current.addEventListener("splitterMoving",function(e){return t.props.splitterMoving(e)});if(this.props.stateChanged)this.ctrlRef.current.addEventListener("stateChanged",function(e){return t.props.stateChanged(e)})}}},{key:"componentWillUnmount",value:function(){if(this._isCtrlDefined()){if(this.props.enabledChanged)this.ctrlRef.current.removeEventListener("enabledChanged",this.props.enabledChanged);if(this.props.sizeChanged)this.ctrlRef.current.removeEventListener("sizeChanged",this.props.sizeChanged);if(this.props.splitterMoved)this.ctrlRef.current.removeEventListener("splitterMoved",this.props.splitterMoved);if(this.props.splitterMoving)this.ctrlRef.current.removeEventListener("splitterMoving",this.props.splitterMoving);if(this.props.stateChanged)this.ctrlRef.current.removeEventListener("stateChanged",this.props.stateChanged)}}},{key:"componentDidUpdate",value:function(t){this._updateData(t)}},{key:"_initProps",value:function(){if(this._isCtrlDefined()){if(this._isDefined(this.props.allowAnimation))this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this._isDefined(this.props.controlStyle))this.ctrlRef.current.controlStyle=this.props.controlStyle;if(this._isDefined(this.props.customStyle))this.ctrlRef.current.customStyle=this.props.customStyle;if(this._isDefined(this.props.data))this.ctrlRef.current.data=this.props.data;if(this._isDefined(this.props.enabled))this.ctrlRef.current.enabled=this.props.enabled;if(this._isDefined(this.props.name))this.ctrlRef.current.name=this.props.name;if(this._isDefined(this.props.orientation))this.ctrlRef.current.orientation=this.props.orientation;if(this._isDefined(this.props.panel1))this.ctrlRef.current.panel1=this.props.panel1;if(this._isDefined(this.props.panel2))this.ctrlRef.current.panel2=this.props.panel2;if(this._isDefined(this.props.resourcePath))this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this._isDefined(this.props.size))this.ctrlRef.current.size=this.props.size;if(this._isDefined(this.props.splitterDistance))this.ctrlRef.current.splitterDistance=this.props.splitterDistance;if(this._isDefined(this.props.state))this.ctrlRef.current.state=this.props.state;if(this._isDefined(this.props.theme))this.ctrlRef.current.theme=this.props.theme}}},{key:"_isDefined",value:function(t){return void 0!==t?!0:!1}},{key:"_updateData",value:function(t){if(this._isCtrlDefined()){if(this.props.allowAnimation!==t.allowAnimation)this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this.props.controlStyle!==t.controlStyle)this.ctrlRef.current.controlStyle=this.props.controlStyle;if(this.props.customStyle!==t.customStyle)this.ctrlRef.current.customStyle=this.props.customStyle;if(this.props.data!==t.data)this.ctrlRef.current.data=this.props.data;if(this.props.enabled!==t.enabled)this.ctrlRef.current.enabled=this.props.enabled;if(this.props.name!==t.name)this.ctrlRef.current.name=this.props.name;if(this.props.orientation!==t.orientation)this.ctrlRef.current.orientation=this.props.orientation;if(this.props.panel1!==t.panel1)this.ctrlRef.current.panel1=this.props.panel1;if(this.props.panel2!==t.panel2)this.ctrlRef.current.panel2=this.props.panel2;if(this.props.resourcePath!==t.resourcePath)this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this.props.size!==t.size)this.ctrlRef.current.size=this.props.size;if(this.props.splitterDistance!==t.splitterDistance)this.ctrlRef.current.splitterDistance=this.props.splitterDistance;if(this.props.state!==t.state)this.ctrlRef.current.state=this.props.state;if(this.props.theme!==t.theme)this.ctrlRef.current.theme=this.props.theme}}},{key:"setStyle",value:function(t){if(this._isCtrlDefined())this.ctrlRef.current.setStyle(t)}},{key:"refresh",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.refresh()}},{key:"updateLayout",value:function(){if(this._isCtrlDefined())this.ctrlRef.current.updateLayout()}},{key:"render",value:function(){return React.createElement("iui-splitter",{id:this.props.id,ref:this.ctrlRef},this.props.children)}}]);return e}();export default IntegralUISplitterComponent;