/*
  filename: react.integralui.slidebar.js
  version : 21.1.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import React,{Component}from"react";import"../components/integralui.slidebar.js";var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1;r.configurable=!0;if("value"in r)r.writable=!0;Object.defineProperty(t,r.key,r)}}return function(e,i,r){if(i)t(e.prototype,i);if(r)t(e,r);return e}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&("object"===typeof e||"function"===typeof e)?e:t}function _inherits(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}});if(e)Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e}var IntegralUISlideBarComponent=function(t){_inherits(e,Component);function e(t){_classCallCheck(this,e);var i=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));i.ctrlRef=React.createRef();return i}_createClass(e,[{key:"componentDidMount",value:function(){var t=this;this._initProps();if(this.ctrlRef&&this.ctrlRef.current){if(this.props.enabledChanged)this.ctrlRef.current.addEventListener("enabledChanged",function(e){return t.props.enabledChanged(e)});if(this.props.sizeChanged)this.ctrlRef.current.addEventListener("sizeChanged",function(e){return t.props.sizeChanged(e)});if(this.props.slideChanged)this.ctrlRef.current.addEventListener("slideChanged",function(e){return t.props.slideChanged(e)});if(this.props.stateChanged)this.ctrlRef.current.addEventListener("stateChanged",function(e){return t.props.stateChanged(e)})}}},{key:"componentWillUnmount",value:function(){if(this.ctrlRef&&this.ctrlRef.current){if(this.props.enabledChanged)this.ctrlRef.current.removeEventListener("enabledChanged",this.props.enabledChanged);if(this.props.sizeChanged)this.ctrlRef.current.removeEventListener("sizeChanged",this.props.sizeChanged);if(this.props.slideChanged)this.ctrlRef.current.removeEventListener("slideChanged",this.props.slideChanged);if(this.props.stateChanged)this.ctrlRef.current.removeEventListener("stateChanged",this.props.stateChanged)}}},{key:"componentDidUpdate",value:function(t){this._updateData(t)}},{key:"_initProps",value:function(){if(this.ctrlRef&&this.ctrlRef.current){if(this._isDefined(this.props.allowAnimation))this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this._isDefined(this.props.animationPause))this.ctrlRef.current.animationPause=this.props.animationPause;if(this._isDefined(this.props.animationSpeed))this.ctrlRef.current.animationSpeed=this.props.animationSpeed;if(this._isDefined(this.props.controlStyle))this.ctrlRef.current.controlStyle=this.props.controlStyle;if(this._isDefined(this.props.customStyle))this.ctrlRef.current.customStyle=this.props.customStyle;if(this._isDefined(this.props.data))this.ctrlRef.current.data=this.props.data;if(this._isDefined(this.props.enabled))this.ctrlRef.current.enabled=this.props.enabled;if(this._isDefined(this.props.name))this.ctrlRef.current.name=this.props.name;if(this._isDefined(this.props.navigationButtons))this.ctrlRef.current.navigationButtons=this.props.navigationButtons;if(this._isDefined(this.props.resourcePath))this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this._isDefined(this.props.size))this.ctrlRef.current.size=this.props.size;if(this._isDefined(this.props.selectedIndex))this.ctrlRef.current.selectedIndex=this.props.selectedIndex;if(this._isDefined(this.props.state))this.ctrlRef.current.state=this.props.state;if(this._isDefined(this.props.theme))this.ctrlRef.current.theme=this.props.theme}}},{key:"_isDefined",value:function(t){return void 0!==t?!0:!1}},{key:"_updateData",value:function(t){if(this.ctrlRef&&this.ctrlRef.current){if(this.props.allowAnimation!==t.allowAnimation)this.ctrlRef.current.allowAnimation=this.props.allowAnimation;if(this.props.animationPause!==t.animationPause)this.ctrlRef.current.animationPause=this.props.animationPause;if(this.props.animationSpeed!==t.animationSpeed)this.ctrlRef.current.animationSpeed=this.props.animationSpeed;if(this.props.controlStyle!==t.controlStyle)this.ctrlRef.current.controlStyle=this.props.controlStyle;if(this.props.customStyle!==t.customStyle)this.ctrlRef.current.customStyle=this.props.customStyle;if(this.props.data!==t.data)this.ctrlRef.current.data=this.props.data;if(this.props.enabled!==t.enabled)this.ctrlRef.current.enabled=this.props.enabled;if(this.props.name!==t.name)this.ctrlRef.current.name=this.props.name;if(this.props.navigationButtons!==t.navigationButtons)this.ctrlRef.current.navigationButtons=this.props.navigationButtons;if(this.props.resourcePath!==t.resourcePath)this.ctrlRef.current.resourcePath=this.props.resourcePath;if(this.props.selectedIndex!==t.selectedIndex)this.ctrlRef.current.selectedIndex=this.props.selectedIndex;if(this.props.size!==t.size)this.ctrlRef.current.size=this.props.size;if(this.props.state!==t.state)this.ctrlRef.current.state=this.props.state;if(this.props.theme!==t.theme)this.ctrlRef.current.theme=this.props.theme}}},{key:"startAnimation",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.startAnimation()}},{key:"stopAnimation",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.stopAnimation()}},{key:"prevSlide",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.prevSlide()}},{key:"nextSlide",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.nextSlide()}},{key:"refresh",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.refresh()}},{key:"updateLayout",value:function(){if(this.ctrlRef&&this.ctrlRef.current)this.ctrlRef.current.updateLayout()}},{key:"render",value:function(){return React.createElement("iui-slidebar",{id:this.props.id,ref:this.ctrlRef},this.props.children)}}]);return e}();export default IntegralUISlideBarComponent;