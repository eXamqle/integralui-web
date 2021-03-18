/*
  filename: integralui.treeview.js
  version : 21.1.0
  Copyright © 2016-2021 Lidor Systems. All rights reserved.

  This file is part of the "IntegralUI Web" Library. 
                                                                   
  The contents of this file are subject to the IntegralUI Web License, and may not be used except in compliance with the License.
  A copy of the License should have been installed in the product's root installation directory or it can be found at
  http://www.lidorsystems.com/products/web/studio/license-agreement.aspx.
                                                            
  This SOFTWARE is provided "AS IS", WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language 
  governing rights and limitations under the License. Any infringement will be prosecuted under applicable laws.                           
*/
import{c as css,h as html}from"../external/lit-element.js";import{c as classMap}from"../external/class-map.js";import{s as styleMap}from"../external/style-map.js";import{IntegralUIItemDisplayMode,IntegralUIMoveDirection,IntegralUITheme}from"./integralui.enums.js";import"./integralui.scrollbar.js";import IntegralUIBaseList from"./integralui.base.list.js";import{iuiTreeViewDefaultStyle}from"../styles/integralui.treeview.style.js";import{iuiTreeViewOfficeStyle}from"../themes/office/integralui.treeview.office.js";import{iuiTreeViewMidnightStyle}from"../themes/midnight/integralui.treeview.midnight.js";import{iuiTreeItemDefaultStyle}from"../styles/integralui.treeitem.style.js";import{iuiTreeItemOfficeStyle}from"../themes/office/integralui.treeitem.office.js";import{iuiTreeItemMidnightStyle}from"../themes/midnight/integralui.treeitem.midnight.js";class IntegralUITreeView extends IntegralUIBaseList{_init(){super._init();this._isThereChildItems=!1;this._expandTimeout=null;this._expandItem=null;this._isAutoExpanded=!1;this._currentItemDisplay=IntegralUIItemDisplayMode.Full;this._isExpandBoxVisible=!0;this._isLongestInProcess=!1;this._longestObj={data:null,width:0};this._currentControlStyleSettings=iuiTreeViewDefaultStyle;this._currentItemStyleSettings=iuiTreeItemDefaultStyle;this._currentItemThemeSettings=css``;this._generalClassName="iui-treeview";this._itemClassName="iui-treeitem";this._itemContentClassName=this._itemClassName+"-content";this._expandBoxClassName=this._itemClassName+"-expand-box";this._isExpandBoxTouched=!1;this._updateOptions();this._initStyle();this._updateData()}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback();this._removeDropMark();if(this._expandTimeout)clearTimeout(this._expandTimeout);this._resetLayoutTimer();this._rt()}_initStyle(){this._defaultStyle={general:{disabled:this._generalClassName+"-disabled",focused:this._generalClassName+"-focused",normal:this._generalClassName,hovered:this._generalClassName+"-hovered",selected:this._generalClassName+"-selected"},item:{general:{disabled:this._itemClassName+"-disabled",focused:this._itemClassName+"-focused",normal:this._itemClassName,hovered:this._itemClassName+"-hovered",selected:this._itemClassName+"-selected"},expandBox:{general:this._expandBoxClassName,load:this._expandBoxClassName+"-load",expanded:this._expandBoxClassName+"-open",collapsed:this._expandBoxClassName+"-close"},content:{disabled:this._itemContentClassName+"-disabled",focused:this._itemContentClassName+"-focused",normal:this._itemContentClassName,hovered:this._itemContentClassName+"-hovered",selected:this._itemContentClassName+"-selected"}}};this._updateStyle(this.controlStyle);this._updateControlClass();this.refresh()}attributeChangedCallback(t,e,i){super.attributeChangedCallback(t,e,i)}static get properties(){return{autoExpand:{type:Boolean,attribute:"auto-expand",reflect:!0},compactMode:{type:Boolean,attribute:"compact-mode",reflect:!0},indent:{type:Number,reflect:!0},itemDisplay:{attribute:"item-display",converter:{fromAttribute:t=>"partial"===(t=t.replace(/"|'/,"").replace(/"|'/,"")).toLowerCase()?IntegralUIItemDisplayMode.Partial:IntegralUIItemDisplayMode.Full,toAttribute:(t,e)=>t===IntegralUIItemDisplayMode.Partial?"Partial":"Full"},reflect:!0},showExpandBox:{type:Boolean,attribute:"show-expandbox",reflect:!0}}}get autoExpand(){return this._isAutoExpanded}set autoExpand(t){if(this._isAutoExpanded!==t){const e=this._isAutoExpanded;this._isAutoExpanded=t;this.requestUpdate("autoExpand",e)}}get compactMode(){return this._currentCompactMode}set compactMode(t){if(this._currentCompactMode!==t){const e=this._currentCompactMode;this._currentCompactMode=t;this.requestUpdate("compactMode",e);this.updateLayout()}}get indent(){return this._options.indent}set indent(t){if(this._options.indent!==t){const e=this._options.indent;this._options.indent=t;this.requestUpdate("indent",e);this.updateLayout()}}get itemDisplay(){return this._currentItemDisplay}set itemDisplay(t){if(this._currentItemDisplay!==t){const e=this._currentItemDisplay;this._currentItemDisplay=t;this.requestUpdate("itemDisplay",e);this.updateLayout()}}get showExpandBox(){return this._isExpandBoxVisible}set showExpandBox(t){if(this._isExpandBoxVisible!==t){const e=this._isExpandBoxVisible;this._isExpandBoxVisible=t;this.requestUpdate("showExpandBox",e);this.updateLayout()}}_itemDblClickEvent(t,e){if(this._isEnabled){let i={cancel:!1,event:t,item:e.data};this._invokeEvent("itemDblClick",i);if(!0!==i.cancel)this.toggle(e.data)}}_updateData(){this._dataService.init([{data:this.items,fields:this._options.dataFields}]);this.updateLayout()}_updateOptions(t){if(t){this._options={allowDrag:this._commonService.isFieldAvailable(t.allowDrag,!1),allowDrop:this._commonService.isFieldAvailable(t.allowDrop,!0),compactMode:this._commonService.isFieldAvailable(t.compactMode,!1),dataFields:null,indent:this._commonService.isFieldAvailable(t.indent,15),loadItems:[],selectedItem:this._commonService.isFieldAvailable(t.selectedItem,this._options.selectedItem?this._options.selectedItem:null)};this._updateShowScroll(t.showScroll)}else{this._options={allowDrag:!1,allowDrop:!0,compactMode:!1,dataFields:null,indent:15,loadItems:[],selectedItem:null};this._updateDataFields();this._updateShowScroll()}}_updateDataFields(t){if(t)this._options.dataFields={allowDrag:t.allowDrag?t.allowDrag:"allowDrag",allowDrop:t.allowDrop?t.allowDrop:"allowDrop",allowEdit:t.allowEdit?t.allowEdit:"allowEdit",allowFocus:t.allowFocus?t.allowFocus:"allowFocus",autoCheck:t.autoCheck?t.autoCheck:"autoCheck",checkBoxSettings:t.checkBoxSettings?t.checkBoxSettings:"checkBoxSettings",checked:t.checked?t.checked:"checked",checkState:t.checkState?t.checkState:"checkState",content:t.content?t.content:"content",contentVisibility:t.contentVisibility?t.contentVisibility:"contentVisibility",contextMenu:t.contextMenu?t.contextMenu:"contextMenu",enabled:t.enabled?t.enabled:"enabled",expanded:t.expanded?t.expanded:"expanded",hasChildren:t.hasChildren?t.hasChildren:"hasChildren",icon:t.icon?t.icon:"icon",id:t.id?t.id:"id",items:t.items?t.items:"items",objects:t.items?t.items:"items",pid:t.pid?t.pid:"pid",selected:t.selected?t.selected:"selected",statusIcon:t.statusIcon?t.statusIcon:"statusIcon",style:t.style?t.style:"style",templateObj:t.templateObj?t.templateObj:"templateObj",text:t.text?t.text:"text",tooltip:t.tooltip?t.tooltip:"tooltip",value:t.value?t.value:"value",visible:t.value?t.visible:"visible"};else this._options.dataFields={allowDrag:"allowDrag",allowDrop:"allowDrop",allowEdit:"allowEdit",allowFocus:"allowFocus",autoCheck:"autoCheck",checkBoxSettings:"checkBoxSettings",checked:"checked",checkState:"checkState",content:"content",contentVisibility:"contentVisibility",contextMenu:"contextMenu",enabled:"enabled",expanded:"expanded",hasChildren:"hasChildren",icon:"icon",id:"id",items:"items",objects:"items",pid:"pid",selected:"selected",statusIcon:"statusIcon",style:"style",templateObj:"templateObj",text:"text",tooltip:"tooltip",value:"value",visible:"visible"};if(this._dataService)this._dataService.updateDataFields(this._options.dataFields)}_updateCurrentList(){this._currentList.length=0;this._isThereChildItems=!1;let t=this._dataService.getList();if(!0===this._options.compactMode)t=this._createCompactList(t);if(t){this._applySorting(t);t.forEach(t=>this._addChildItems(t,0,null,!1))}}_addChildItems(t,e,i,s,l){let a=!0;if(!t[this._options.dataFields.items])return a=this._addItemToCurrentList(t,e,i,s,l);if(this._addItemToCurrentList(t,e,i,s,l)){a=!0;let i=0;if(s||this.isItemExpanded(t)){let l=t[this._options.dataFields.items];if(l){this._applySorting(l);l.forEach(l=>{if(this._addChildItems(l,e+this._options.indent,t[this._options.dataFields.id],s,t))i++})}}if(!s&&!this._isThereChildItems&&(i>0||this._isThereItems(t)))this._isThereChildItems=!0}return a}_addItemToCurrentList(t,e,i,s,l){t.type="item";if(!t[this._options.dataFields.id])t[this._options.dataFields.id]=this._commonService.getUniqueId();if(i)t[this._options.dataFields.pid]=i;let a=this._isItemAllowed(t);if(a)if(s)this._fullList.push(t);else this._currentList.push({data:t,indent:e});return a}_isThereItems(t){return!this.isItemExpanded(t)&&t[this._options.dataFields.items]&&t[this._options.dataFields.items].length>0&&this._isThereVisibleChildren(t)}_resetVisiblity(t){if(t)t.forEach(t=>{t[this._options.dataFields.visible]=!0;this._resetVisiblity(t[this._options.dataFields.items])})}_collapseChildren(t){if(t)t.forEach(t=>{t[this._options.dataFields.expanded]=!1;this._collapseChildren(t[this._options.dataFields.items])})}_createCompactList(t){this._resetVisiblity(t);if(this.selectedItem){let e=this.selectedItem,i=this.getItemParent(this.selectedItem),s=i,l=this.selectedItem;this._collapseChildren(l[this._options.dataFields.items]);if(i)for(;i;){this._updateChildren(i,l);let t=this.getItemParent(i);if(!t)e=i;l=i;i=t}t.forEach(t=>{if(!this._commonService.isEqual(t[this._options.dataFields.id],e[this._options.dataFields.id]))t[this._options.dataFields.visible]=s&&this.isItemExpanded(e)?!1:this.isItemExpanded(l)&&this._isThereVisibleChildren(this.selectedItem)?!1:!0})}return t}_updateChildren(t,e){t[this._options.dataFields.items].forEach(t=>{if(!this._commonService.isEqual(t[this._options.dataFields.id],e[this._options.dataFields.id])){t[this._options.dataFields.expanded]=!1;t[this._options.dataFields.visible]=this.isItemExpanded(e)&&this._isThereVisibleChildren(e)?!1:!0}})}loadData(t,e,i,s){this._processLoadData(t,e,i,s)}_updateScrollItemList(){this._resetScrollItemList();this._scrollItemList.length=0;this.update();let t=1;for(let e=this._currentIndex;e<this._currentList.length&&e<this._currentIndex+this._visibleRange;e++,t++){let i=this._currentList[e],s={data:i.data,indent:i.indent,index:e-this._currentIndex,inlineStyle:this._getItemInlineStyle(i),style:{},tabIndex:t};this._updateItemStyle(s);this._scrollItemList.push(s)}}_checkForChildren(t){let e=!1,i=t[this._options.dataFields.items];if(i)for(let t=0;t<i.length;t++)if(this._isItemAllowed(i[t])){e=!0;break}return e}_updateIsThereChildItems(){let t=!1,e=this._dataService.getList();if(e)for(let i=0;i<e.length&&!(t=this._checkForChildren(e[i]));i++);this.isThereChildItems=t}_processItemAdd(t,e){if(this._allowUpdate)this._updateIsThereChildItems()}_processItemRemoval(t,e){if(this._allowUpdate)this._updateIsThereChildItems()}_expandOnDelay(t){let e=this;if(!1!==e._isAutoExpanded){if(e._expandItem!==t){if(e._expandTimeout)clearTimeout(e._expandTimeout);e._expandTimeout=setTimeout(function(){if(e._expandTimeout)e.expand(t);clearTimeout(e._expandTimeout)},500)}e._expandItem=t}}_itemDragOver(t,e,i,s){if(this._isEnabled){let l=this._getItemElemList();if(l&&i>=0&&i<l.length){let a=this._commonService.getPageRect(l[i]),o={x:a.left,y:a.top,width:a.right-a.left,height:a.bottom-a.top};this._expandOnDelay(e.data);this._processScroll(t);if(!this.isScrollTimerActive)this._processDragOver(t,e.data,o,s)}}t.stopPropagation()}_itemDragDrop(t,e){if(this._isEnabled){this._expandItem=null;if(this._expandTimeout)clearTimeout(this._expandTimeout);this._processDragDrop(t,e.data)}t.stopPropagation()}collapse(t){this.toggle(t,!1)}expand(t){this.toggle(t,!0)}_expandBoxMouseDown(t,e){if(this._isEnabled){if(1===t.buttons&&!this._isExpandBoxTouched)this.toggle(e);this._isExpandBoxTouched=!1}t.stopPropagation()}_expandBoxMouseUp(t){this._isExpandBoxTouched=!1;t.stopPropagation()}_expandBoxTouchStart(t,e){if(this._isEnabled){this._isExpandBoxTouched=!0;this.toggle(e)}t.stopPropagation()}_expandBoxTouchEnd(t,e){}toggle(t,e){if(t){if(!t[this._options.dataFields.hasChildren]&&(!t[this._options.dataFields.items]||0===t[this._options.dataFields.items].length))return;else if(e&&!1!==t[this._options.dataFields.expanded])return;else if(!1===e&&!1===t[this._options.dataFields.expanded])return;let i=void 0!==e?e:!1!==t[this._options.dataFields.expanded]?!0:!1,s=void 0!==e?e:!i,l={cancel:!1,item:t};if(void 0!==e)if(e)this._invokeEvent("beforeExpand",l);else this._invokeEvent("beforeCollapse",l);else if(i)this._invokeEvent("beforeCollapse",l);else this._invokeEvent("beforeExpand",l);if(!0!==l.cancel){if(s!==t[this._options.dataFields.expanded]){t[this._options.dataFields.expanded]=s;if(!0===this._options.compactMode)this._processSelection(null,t);this._updateCurrentLayout(!1)}if(this.isItemExpanded(t))this._invokeEvent("afterExpand",{item:t});else this._invokeEvent("afterCollapse",{item:t})}}else{this.getFullList().forEach(t=>t[this._options.dataFields.expanded]=e);this._updateCurrentLayout(!1)}this.update()}exportToJSON(t,e,i){e=e?e:null;let s=!1===i?this.items:this.getFullList(),l=t?t:[this._options.dataFields.allowDrag,this._options.dataFields.allowDrop,this._options.dataFields.allowEdit,this._options.dataFields.allowFocus,this._options.dataFields.autoCheck,this._options.dataFields.canSelect,this._options.dataFields.checkBoxSettings,this._options.dataFields.checked,this._options.dataFields.checkState,this._options.dataFields.content,this._options.dataFields.contextMenu,this._options.dataFields.contentVisibility,this._options.dataFields.enabled,this._options.dataFields.expanded,this._options.dataFields.fixed,this._options.dataFields.fixChildren,this._options.dataFields.hasChildren,this._options.dataFields.icon,this._options.dataFields.id,this._options.dataFields.pid,this._options.dataFields.selected,this._options.dataFields.showCheckBox,this._options.dataFields.statusIcon,this._options.dataFields.style,this._options.dataFields.templateObj,this._options.dataFields.text,this._options.dataFields.tooltip,this._options.dataFields.value,this._options.dataFields.visible];if(!1===i)l.push(this._options.dataFields.items);return JSON.stringify(s,l,e)}_getDisplayMode(){return this._currentItemDisplay===IntegralUIItemDisplayMode.Partial&&!this._isHoverTemplatePresent&&!this._isSelectedTemplatePresent?IntegralUIItemDisplayMode.Partial:IntegralUIItemDisplayMode.Full}updateFullList(){this._fullList.length=0;let t=this._dataService.getList();if(t)t.forEach(t=>this._addChildItems(t,0,null,!0));return this._fullList}getItemLevel(t){let e=0,i=this.getItemParent(t);for(;i;){e++;i=this.getItemParent(i)}return e}getItemParent(t){return this._dataService.getParent(t)}_isChildOf(t,e){let i=!1;if(t&&e){let s=e[this._options.dataFields.items];if(s&&s.length>0)for(let e=0;e<s.length;e++){if(this._commonService.isEqual(t[this._options.dataFields.id],s[e][this._options.dataFields.id])){i=!0;break}else i=this._isChildOf(t,s[e]);if(i)break}}return i}_isParentOf(t,e){let i=this._dataService.getParent(e);if(t&&e&&i&&this._commonService.isEqual(t[this._options.dataFields.id],i[this._options.dataFields.id]))return!0;else return!1}isItemExpanded(t){return t?t[this._options.dataFields.expanded]||void 0===t[this._options.dataFields.expanded]?!0:!1:!0}isThereChildren(){return this._isThereChildItems}_isThereVisibleChildren(t){let e=!1;if(t){let i=t[this._options.dataFields.items];if(i)for(let t=0;t<i.length;t++)if(this._isItemAllowed(i[t])){e=!0;break}}return e}_getItemRealIndex(t){let e=this._dataService.getList();return e?e.indexOf(t):-1}getPrevItem(t){let e=null;if(t){let i=this._dataService.getList(),s=this.getItemParent(t);if(s)i=s[this._options.dataFields.items];let l=i.indexOf(t);if((l=l>0?l-1:-1)>=0)e=i[l]}return e}getNextItem(t){let e=null;if(t){let i=this._dataService.getList(),s=this.getItemParent(t);if(s)i=s[this._options.dataFields.items];let l=i.indexOf(t);if((l=l<i.length-1?l+1:-1)>=0)e=i[l]}return e}moveItem(t,e,i,s){if(t){this._allowUpdate=!1;let l=-1;switch(e){case IntegralUIMoveDirection.At:l=s;break;case IntegralUIMoveDirection.Down:i=this.getNextItem(t);break;case IntegralUIMoveDirection.First:l=0;break;case IntegralUIMoveDirection.Last:l=this._getLastItemIndex();break;case IntegralUIMoveDirection.Left:i=this.getItemParent(t);break;case IntegralUIMoveDirection.Right:case IntegralUIMoveDirection.Up:i=this.getPrevItem(t);break;default:l=-1}if(Array.isArray(t)){let s=[];for(let e=0;e<t.length;e++){let i=!1,l=this.getItemParent(t[e]);for(;l;){if(t.indexOf(l)>=0){i=!0;break}l=this.getItemParent(l)}if(!i)s.push(t[e])}if(s.length>0){if(this._getItemCurrentIndex(s[0])<=this._getItemCurrentIndex(s[s.length-1]))for(let t=0;t<s.length;t++)this.moveItemAt(s[t],i,e,l);else for(let t=s.length-1;t>=0;t--)this.moveItemAt(s[t],i,e,l)}}else this.moveItemAt(t,i,e,l);this._allowUpdate=!0;this._updateCurrentLayout(!0);this._invokeEvent("itemMoved",{item:t})}}_processLeftArrowKey(t,e){this.collapse(t.data);return null}_processRightArrowKey(t,e){this.expand(t.data);return null}_updateBlockSize(){if(this._currentItemDisplay===IntegralUIItemDisplayMode.Partial){if(!1!==this.virtualMode)this._updateLongestItem()}else{this._blockSize={width:this._scrollBarSize.width+2,height:this._scrollBarSize.height+2};this._longestItemWidthValue=this._getFullItemWidth()}}_isItemInCurrentList(t){let e=!1;if(t)for(let i=0;i<this._currentList.length;i++)if(this._currentList[i].data.id===t.id){e=!0;break}return e}_getFullItemWidth(){if(!this._isLongestInProcess&&this._currentItemDisplay===IntegralUIItemDisplayMode.Partial&&(this._isHoverTemplatePresent||this._isSelectedTemplatePresent))return this._longestItemWidth+"px";else return"auto"}_updateLongestItem(){let t=this;t._isLongestInProcess=!0;t._prevLongestItemWidth=t._longestObj&&t._isItemInCurrentList(t._longestObj.data)?t._longestObj.width:0;setTimeout(function(){if(t._longestObj&&!t._isItemInCurrentList(t._longestObj.data))t._longestObj={data:null,width:0};let e=t._getItemContentElemList();if(e){t._calcLongestItem(e);if(t._prevLongestItemWidth<t._clientRect.width)t._prevLongestItemWidth=t._clientRect.width}let i=t._commonService.getPadding(t._elemRef);t._blockSize.width=t._longestObj.width+(i.left+i.right);t._isLongestInProcess=!1;t._longestItemWidth=t._prevLongestItemWidth;t._longestItemWidthValue=t._getFullItemWidth();t._updateScrollSize()},1)}_calcLongestItem(t,e){let i=0;for(let s=0;s<t.length;s++)if(s<this._scrollItemList.length){let l=this._scrollItemList[s].data,a=this._getObjFromItem(l);if(a){let l=t[s].offsetWidth+a.indent;if(!e&&this._longestObj.data===a.data){this._calcLongestItem(t,!0);break}if(i<l&&l>=this._longestObj.width){i=l;this._longestObj={data:a.data,width:i};this._prevLongestItemWidth=i}}}}_updateCurrentLayout(t){let e=this;if(e._allowUpdate){e._resetLayoutTimer();e._updateCurrentList();if(t)e.updateFullList();e._updateScrollItemList();if(this._currentItemDisplay===IntegralUIItemDisplayMode.Partial&&!1!==this._virtualMode)e._updateLongestItem();else e._updateScrollSize();e._updateTimer=setTimeout(function(){e._updateBlockSize();e._updateHoverContentPos();e._updateSelectContentPos();e.update();e._updateItemElems();clearTimeout(e._updateTimer)},1)}}_updateScrollSize(){this._contentSize={width:this._clientRect.width-2,height:this._clientRect.height-2};this._scrollSize={width:this._currentItemDisplay===IntegralUIItemDisplayMode.Partial?this._blockSize.width-this._clientRect.width-2:0,height:this._avgItemHeight*this._currentList.length-this._clientRect.height+this._avgItemHeight};if(this.isVerScrollVisible())this._contentSize.width-=18;if(this._currentItemDisplay===IntegralUIItemDisplayMode.Partial&&this._scrollSize.width>=-6){if(this.isVerScrollVisible())this._scrollSize.width+=16;if(this._isHoverTemplatePresent||this._isSelectedTemplatePresent)this._scrollSize.width+=4}if(this.isHorScrollVisible())this._scrollSize.height+=16;this._scrollSize.width=this._scrollSize.width>0?this._scrollSize.width:0;this._scrollSize.height=this._scrollSize.height>0?this._scrollSize.height:0;this._maxScrollPos={x:this._scrollSize.width,y:this._scrollSize.height};if(this._currentScrollPos.x>this._maxScrollPos.x)this._changeHorizontalScrollPos(this._maxScrollPos.x);if(this._currentScrollPos.y>this._maxScrollPos.y)this._changeVerticalScrollPos(this._maxScrollPos.y);this._scrollBarSize={width:this.isVerScrollVisible()?this._clientRect.width-18:this._clientRect.width-2,height:this.isHorScrollVisible()?this._clientRect.height-18:this._clientRect.height-2};this._scrollLargeChange={x:this._scrollBarSize.width,y:this._scrollBarSize.height};this._blockHoverRect={height:this._avgItemHeight-2,left:0,top:-9999999,width:this._clientRect.width-2};let t={height:this._avgItemHeight-2,left:0,top:-9999999,width:this._clientRect.width-2};if(this.isVerScrollVisible()){this._blockHoverRect.width-=16;t.width-=16}this._blockSelectRect.forEach(e=>{e.width=t.width;e.height=t.height})}beginLoad(t){if(t)if(this._options.loadItems.indexOf(t)<0)this._options.loadItems.push(t)}endLoad(t){let e=this._options.loadItems.indexOf(t);if(e>=0)this._options.loadItems.splice(e,1);this._updateCurrentLayout(!0)}_isItemLoading(t){return this._options.loadItems.indexOf(t)>=0?!0:!1}scrollTo(t){if(!1!==this.virtualMode&&t){this.suspendLayout();let e=this.getItemParent(t);for(;null!==e;){this.expand(e);e=this.getItemParent(e)}this.resumeLayout();let i=this,s=setTimeout(function(){let e=i._getItemCurrentIndex(t);if(e>=0){i.scrollPos({x:i._currentScrollPos.x,y:i._avgItemHeight*(e-Math.floor(i._visibleRange/2))});i.updateLayout()}clearTimeout(s)},150)}}_callAfterSelectEvent(t){let e={item:t};this._invokeEvent("afterSelect",e);this._invokeEvent("selectionChanged",e);if(!0===this._options.compactMode){if(this.getItemParent(t))t[this._options.dataFields.expanded]=!0;this.updateLayout()}}_getControlStyle(){let t={cursor:this._ctrlCursor,overflow:this.virtualMode?"hidden":"auto"};if(this._ctrlSize.width>0)t.width=this._ctrlSize.width+"px";if(this._ctrlSize.height>0)t.height=this._ctrlSize.height+"px";return t}_getBlockStyle(){let t={};if(this._currentItemDisplay===IntegralUIItemDisplayMode.Partial)t={width:this._blockSize.width+"px"};return t}_getItemInlineStyle(t){return t.data[this._options.dataFields.style]||{}}_getItemInlineContentStyle(t){let e={};e["padding-left"]=t.indent+"px";return e}_isThereNoItems(t){return t[this._options.dataFields.items]&&0===t[this._options.dataFields.items].length}_itemHasChildren(t){return t[this._options.dataFields.hasChildren]&&(this._isThereVisibleChildren(t)||!t[this._options.dataFields.items]||this._isThereNoItems(t))}_updateItemStyle(t){if(t){t.style={general:{},expandBox:{},content:{}};t.inlineStyle=this._getItemInlineStyle(t);t.style.general[this._itemClassName]=!0;t.style.general[this._options.currentStyle.item.general.normal]=!0;t.style.content[this._itemContentClassName]=!0;t.style.content[this._options.currentStyle.item.content.normal]=!0;if(this._getDisplayMode()===IntegralUIItemDisplayMode.Partial){t.style.content["iui-treeitem-content-block"]=!0;if(!this._isItemEnabled(t.data))t.style.content[this._options.currentStyle.item.content.disabled]=!0;else if(this._isItemSelected(t.data))t.style.content[this._options.currentStyle.item.content.selected]=!0;else if(this._isItemHovered(t.data))t.style.content[this._options.currentStyle.item.content.hovered]=!0}else{t.style.general["iui-treeitem-block"]=!0;if(!this._isItemEnabled(t.data))t.style.general[this._options.currentStyle.item.general.disabled]=!0;else if(this._isItemSelected(t.data))t.style.general[this._options.currentStyle.item.general.selected]=!0;else if(this._isItemHovered(t.data))t.style.general[this._options.currentStyle.item.general.hovered]=!0}if(this._options.allowFocus&&this._currentFocusObj&&t.data===this._currentFocusObj.data)t.style.content[this._options.currentStyle.item.content.focused]=!0;if(this._isThereChildItems||t.data[this._options.dataFields.hasChildren])t.style.expandBox[this._options.currentStyle.item.expandBox.general]=!0;if(this._itemHasChildren(t.data)||this._isThereVisibleChildren(t.data))if(this._isItemLoading(t.data))t.style.expandBox[this._options.currentStyle.item.expandBox.load]=!0;else if(!1!==t.data[this._options.dataFields.expanded])t.style.expandBox[this._options.currentStyle.item.expandBox.expanded]=!0;else t.style.expandBox[this._options.currentStyle.item.expandBox.collapsed]=!0}}_getItemStyle(t){if(t)return{general:this._getItemGeneralStyle(t.general),expandBox:this._getItemExpandBoxStyle(t.expandBox),content:this._getItemContentStyle(t.content)};else return this._getDefaultItemStyle()}_getItemExpandBoxStyle(t){if(this._commonService.isString(t))return t;else if(t)return{general:this._commonService.isFieldAvailable(t.disabled,this._expandBoxClassName),load:this._commonService.isFieldAvailable(t.focused,this._expandBoxClassName+"-load"),expanded:this._commonService.isFieldAvailable(t.normal,this._expandBoxClassName+"-open"),collapsed:this._commonService.isFieldAvailable(t.hovered,this._expandBoxClassName+"-close")};else return this._getDefaultItemExpandBoxStyle()}_getDefaultItemStyle(){return{general:this._getDefaultItemGeneralStyle(),expandBox:this._getDefaultItemExpandBoxStyle(),content:this._getDefaultItemContentStyle()}}_getDefaultItemExpandBoxStyle(){return{general:this._defaultStyle.item.expandBox.general,load:this._defaultStyle.item.expandBox.load,expanded:this._defaultStyle.item.expandBox.expanded,collapsed:this._defaultStyle.item.expandBox.collapsed}}refresh(){if(this._allowUpdate){this._updateControlClass();this._scrollItemList.forEach(t=>this._updateItemStyle(t));this.update();this._updateReferences()}}_updateThemeSettings(t){this._currentThemeSettings=css``;this._currentItemThemeSettings=css``;switch(t){case IntegralUITheme.Office:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiTreeViewOfficeStyle.cssText,"../../icons",this._currentResourcePath);this._currentItemThemeSettings.cssText=this._commonService.replaceAll(iuiTreeItemOfficeStyle.cssText,"../../icons",this._currentResourcePath);break;case IntegralUITheme.Midnight:this._currentThemeSettings.cssText=this._commonService.replaceAll(iuiTreeViewMidnightStyle.cssText,"../../icons",this._currentResourcePath);this._currentItemThemeSettings.cssText=this._commonService.replaceAll(iuiTreeItemMidnightStyle.cssText,"../../icons",this._currentResourcePath);break;default:this._currentThemeSettings.cssText="";this._currentItemThemeSettings.cssText=""}}_getItemSelectBlock(){if(this._isSelectedTemplatePresent&&!this._isUpdateActive)return this._currentSelectedItems.map((t,e)=>html`<span>                 ${this._isContentAllowed(t,"select")?html`<div class="iui-treeview-block iui-treeview-block-select" style=${styleMap(this._getSelectBlockRect(e))}>                         <div style=${styleMap({height:this._blockSelectHeight+"px"})}>                             ${this._getItemTemplate(t,"select")}                         </div>                     </div>`:html``}                 </span>`);else return html``}render(){return html`                 <style>                     ${this._currentControlStyleSettings}                     ${this._currentItemStyleSettings}                     ${this._currentThemeSettings}                     ${this._currentItemThemeSettings}                     ${this._currentCustomStyle}                 </style>                 <div data-ctrl="treeview" class=${classMap(this._getControlClass())} style=${styleMap(this._getControlStyle())} @DOMMouseScroll="${t=>this._processMouseWheel(t)}" @mousewheel="${t=>this._processMouseWheel(t)}" @mouseenter="${t=>this._onCtrlMouseEnter(t)}" @mouseleave="${t=>this._onCtrlMouseLeave(t)}" @mousemove="${t=>this._onCtrlMouseMove(t)}" @dragenter="${t=>this._ctrlDragEnter(t)}" @dragleave="${t=>this._ctrlDragLeave(t)}" @dragover="${t=>this._ctrlDragOver(t)}" @drop="${t=>this._ctrlDragDrop(t)}" @dragend="${t=>this._ctrlDragEnd(t)}" @scroll="${t=>this._onScroll(t)}">                     <ul style=${styleMap({width:this._currentItemDisplay===IntegralUIItemDisplayMode.Partial?"9999px":this._blockSize.width+"px",height:this._contentSize.height+"px",margin:0,padding:0,"margin-left":-this._currentScrollPos.x+"px"})} @touchstart="${t=>this._ctrlTouchStart(t)}" @touchend="${t=>this._ctrlTouchEnd(t)}">                         ${this._scrollItemList.map((t,e)=>html`                             <li data-item style=${styleMap(t.inlineStyle)}>                                 <div class=${classMap(t.style.general)} style=${styleMap({display:this._currentItemDisplay===IntegralUIItemDisplayMode.Partial?"inline-block":"block",width:this._longestItemWidthValue})} @mouseenter="${e=>this._itemMouseEnter(e,t)}" @mousemove="${e=>this._itemMouseMove(e,t)}" @mouseleave="${e=>this._itemMouseLeave(e,t)}">                                     <div style=${styleMap({"padding-left":t.indent+"px"})} draggable="true" @mousedown="${e=>this._itemMouseDown(e,t)}" @mouseup="${e=>this._itemMouseUp(e,t)}" @dragstart="${e=>this._itemDragStart(e,t)}" @dragover="${i=>this._itemDragOver(i,t,e)}" @drop="${e=>this._itemDragDrop(e,t)}" @touchstart="${e=>this._itemTouchStart(e,t)}" @touchmove="${e=>this._itemTouchMove(e,t)}" @touchend="${e=>this._itemTouchEnd(e,t)}">                                         <div data-item-content class=${classMap(t.style.content)} style=${styleMap({display:this._currentItemDisplay===IntegralUIItemDisplayMode.Partial?"inline-block":"block"})} tabindex="${t.tabIndex}" @focus="${()=>this._itemGotFocus(t)}" @blur="${()=>this._itemLostFocus(t)}" @keydown="${e=>this._itemKeyDown(e,t)}" @keypress="${e=>this._itemKeyPress(e,t)}" @keyup="${e=>this._itemKeyUp(e,t)}">                                             ${this.showExpandBox?html`<span class=${classMap(t.style.expandBox)} @mousedown="${e=>this._expandBoxMouseDown(e,t.data)}" @mouseup="${t=>this._expandBoxMouseUp(t)}" @touchstart="${e=>this._expandBoxTouchStart(e,t.data)}" @touchend="${e=>this._expandBoxTouchEnd(e,t.data)}"></span>`:html``}                                             <div style="display:inline-block" @click="${e=>this._itemClickEvent(e,t)}" @dblclick="${e=>this._itemDblClickEvent(e,t)}" @contextmenu="${e=>this._itemRightClickEvent(e,t)}">                                                 ${this._getItemTemplate(t.data)}                                             </div>                                         </div>                                     </div>                                 </div>                             </li>                         `)}                     </ul>                     ${this._isHoverTemplatePresent&&!this._isUpdateActive&&this._hoverItemObj&&this._isContentAllowed(this._hoverItemObj.data,"hover")?html`<div class="iui-treeview-block iui-treeview-block-hover" style=${styleMap({left:this._blockHoverRect.left+"px",top:this._blockHoverRect.top+"px",height:this._blockHoverRect.height+"px",width:this._blockHoverRect.width+"px"})}>                                 <div style=${styleMap({height:this._blockHoverRect.height+"px"})} @mousemove="${t=>this._hoverBlockMouseMove(t)}" @mouseleave="${t=>this._hoverBlockMouseLeave(t)}">                                     ${this._getItemTemplate(this._hoverItemObj.data,"hover")}                                 </div>                             </div>`:html``}                     ${this._isSelectedTemplatePresent&&!this._isUpdateActive?this._currentSelectedItems.map((t,e)=>html`<span>                                 ${this._isContentAllowed(t,"select")?html`<div class="iui-treeview-block iui-treeview-block-select" style=${styleMap(this._getSelectBlockRect(e))}>                                         <div style=${styleMap({height:this._blockSelectHeight+"px"})}>                                             ${this._getItemTemplate(t,"select")}                                         </div>                                     </div>`:html``}                                 </span>`):html``}                     ${this.isVerScrollVisible()?html`<iui-scrollbar id="ver-scroll" .enabled="${this.enabled}" .value="${this._currentScrollPos.y}" .max="${this._maxScrollPos.y}" .largeChange="${this._scrollLargeChange.y}" .height="${this._scrollBarSize.height}" .theme="${this._currentTheme}" @mouseenter="${t=>this._scrollMouseEnter(t)}" @valueChanged="${t=>this._onVerticalScrollChanged(t)}" @scrollStart="${t=>this._onVerticalScrollStart(t)}" @scrollEnd="${t=>this._onVerticalScrollEnd(t)}"></iui-scrollbar>`:html``}                     ${this.isHorScrollVisible()?html`<iui-scrollbar id="hor-scroll" .enabled="${this.enabled}" orientation="Horizontal" .value="${this._currentScrollPos.x}" .max="${this._maxScrollPos.x}" .width="${this._scrollBarSize.width}" .theme="${this._currentTheme}" @mouseenter="${t=>this._scrollMouseEnter(t)}" @valueChanged="${t=>this._onHorizontalScrollChanged(t)}" @scrollStart="${t=>this._onHorizontalScrollStart(t)}" @scrollEnd="${t=>this._onHorizontalScrollEnd(t)}"></iui-scrollbar>`:html``}                     ${this.isVerScrollVisible()&&this.isHorScrollVisible()?html`<div class="iui-scrollbar-corner" style="position:absolute;right:0;bottom:0;width:16px;height:16px;"></div>`:html``}                 </div>             `}firstUpdated(t){let e=this;e._updateReferences();setTimeout(function(){e._isHoverTemplatePresent=e.itemHoverTemplate?!0:!1;e._isSelectedTemplatePresent=e.itemSelectTemplate?!0:!1;e.updateLayout()},1)}updated(t){t.forEach((t,e)=>{});this._updateFocusItem()}_updateControlStyleSettings(t){this._currentControlStyleSettings=css``;this._currentControlStyleSettings.cssText=this._commonService.replaceAll(iuiTreeViewDefaultStyle.cssText,"../icons",t);this._currentItemStyleSettings=css``;this._currentItemStyleSettings.cssText=this._commonService.replaceAll(iuiTreeItemDefaultStyle.cssText,"../icons",t)}_updateReferences(){this._elemRef=this.shadowRoot.querySelector("div[data-ctrl=treeview]")}}window.customElements.define("iui-treeview",IntegralUITreeView);export default IntegralUITreeView;