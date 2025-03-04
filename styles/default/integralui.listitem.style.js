import { c as css } from '../../external/lit-element.js';

export const iuiListItemDefaultStyle = css`
    .iui-listgroup {
        background: var(--listgroup-background, transparent);
        border: var(--listgroup-border, 1px solid transparent);
        border-color:  var(--listgroup-border-color, transparent transparent #e5e5e5 transparent);
        border-radius: var(--listgroup-border-radius, 1px);
        border-width: var(--listgroup-border-width, 1px);
        color: var(--listgroup-color, black);
        cursor: var(--listgroup-cursor, default);
        display: var(--listgroup-display, block);
        font-weight: var(--listgroup-font-weight, bold);
        height: var(--listgroup-height, auto);
        list-style-type: none;
        margin: var(--listgroup-margin, 1px 0);
        opacity: var(--listgroup-opacity, 1);
        overflow: hidden;
        padding: var(--listgroup-padding, 0);
        position: var(--listgroup-position, relative);
        white-space: var(--listgroup-white-space, nowrap);
        width: var(--listgroup-width, auto);

    }
    .iui-listgroup-general {
        list-style-type: none;
    }
    .iui-listgroup-focused {
        border: var(--listgroup-focused-border, 2px solid gray);
    }
    .iui-listgroup:focus {
        outline: none !important;
    }
    .iui-listgroup-content {
        border: var(--listgroup-border, 2px solid transparent);
        padding: var(--listgroup-content-padding, 3px);
    }

    .iui-listgroup-expand-box {
        background: url(../../icons/expandbox-icons.png) no-repeat 0 -48px;
        display: inline-block;
        overflow: hidden;
        padding: 0;
        margin: var(--listgroup-expand-box-margin, 1px 3px 0 0);
        width: 16px;
        height: 16px;
        vertical-align: top;
    }
    .iui-treeview-enter .iui-listgroup-expand-box-general {
        animation-name: iui-treeview-animate-expand-box-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-treeview-animate-expand-box-enter {
        0% { opacity: 0; }
        100% { opacity: 1; }
    } 
    .iui-treeview-leave .iui-listgroup-expand-box-general {
        animation-name: iui-treeview-animate-expand-box-leave;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-treeview-animate-expand-box-leave {
        0% { opacity: 1; }
        100% { opacity: 0; }
    } 
    .iui-listgroup-expand-box-open {
        background-position: 0 -16px;
    }
    .iui-listgroup-expand-box-open-animate {
        background-position: 0 0;
    
        animation-name: expand-box-open;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes expand-box-open {
        0% { 
            -ms-transform: rotate(0deg); /* IE 9 */
            -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
            transform: rotate(0deg);
        }
        100% { 
            -ms-transform: rotate(90deg); /* IE 9 */
            -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */
            transform: rotate(90deg);
        }
    }
    .iui-listgroup-expand-box-close {
        background-position: 0 0;
    }
    .iui-listgroup-expand-box-close-animate {
        background-position: 0 0;

        animation-name: expand-box-close;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes expand-box-close {
        0% { 
            -ms-transform: rotate(90deg); /* IE 9 */
            -webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */
            transform: rotate(90deg);
        }
        100% { 
            -ms-transform: rotate(0deg); /* IE 9 */
            -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
            transform: rotate(0deg);
        }
    }

    /* Disabled State */
    .iui-listgroup-disabled div {
        opacity: var(--listgroup-disabled-opacity, 0.75);
        pointer-events: none;
    }

    
    .iui-listitem {
        background: var(--listitem-background, transparent);
        border: var(--listitem-border, 2px solid transparent);
        border-color:  var(--listitem-border-color, transparent);
        border-radius: var(--listitem-border-radius, 1px);
        border-width: var(--listitem-border-width, 2px);
        color: var(--listitem-color, black);
        cursor: var(--listitem-cursor, default);
        display: var(--listitem-display, block);
        height: var(--listitem-height, auto);
        list-style-type: none;
        margin: var(--listitem-margin, 0);
        opacity: var(--listitem-opacity, 1);
        overflow: hidden;
        padding: var(--listitem-padding, 0);
        position: var(--listitem-position, relative);
        white-space: var(--listitem-white-space, nowrap);
        width: var(--listitem-width, auto);
    }
    .iui-listitem-general {
        list-style-type: none;
    }
    .iui-item-drag {
        height: 0;
        pointer-events: none;
    }
    .iui-item-drag-above, .iui-item-drag-below {
        border: thin dotted #cecece;
        height: 38px;
    }
    .iui-item-drag-open {
        animation-name: drag-open;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.35s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 

    }
    @keyframes drag-open {
        0% { max-height: 0; border-width: 0; opacity: 0; }
        50% { max-height: 0; border-width: 0; opacity: 0; }
        100% { max-height: 38px; border-width: 1; opacity: 1; }
    }
    .iui-item-drag-close {
        animation-name: drag-close;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.35s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 

    }
    @keyframes drag-close {
        0% { max-height: 38px; border-width: 1; opacity: 1; }
        50% { max-height: 38px; border-width: 1; opacity: 1; }
        100% { max-height: 0; border-width: 0; opacity: 0; }
    }
    .iui-listitem-hovered {
        background: var(--listitem-hovered-background, #f5f5f5);
        border: var(--listitem-hovered-border, 2px solid #efefef);
        color: var(--listitem-hovered-color, black);
    }
    .iui-listitem-selected {
        background: var(--listitem-selected-background, #e5e5e5);
        border: var(--listitem-selected-border, 2px solid #dedede);
        color: var(--listitem-selected-color, black);
        z-index: 2;
    }
    .iui-listitem-focused {
        border: var(--listitem-focused-border, 2px solid gray);
    }
    .iui-listitem:focus {
        outline: none !important;
    }
    .iui-listitem-content {
        border: var(--listitem-border, 2px solid transparent);
        padding: var(--listitem-content-padding, 3px);
    }
    .iui-listitem-content-hovered {
    }
    .iui-listitem-content-selected {
    }
    .iui-listitem-content-focused {
        border-color: gray;
    }
    .iui-listitem-content:focus {
        outline: none !important;
    }

    /* Disabled State */
    .iui-listitem-disabled div {
        opacity: var(--listitem-disabled-opacity, 0.75);
        pointer-events: none;
    }

    /* Animation */
    .iui-listitem-animate {
        border: var(--listitem-animate-border, 0);
        background-color: transparent;
        box-shadow: none;
        list-style-type: none;
        overflow: hidden;
        padding: 0;
        position: relative;
    }
    .iui-listitem-animate-enter {
        animation-name: listitem-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.175s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes listitem-animate-enter {
        0% { 	   
            border: thin solid transparent;
            box-shadow: none;
        }
        100% { 
            border: thin solid #242424;
            box-shadow: 2px 3px 3px #cecece;
        }
    }
    .iui-listitem-animate-select-block {
        display: block;
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
    }
    .iui-listitem-animate-select {
        background: var(--listitem-animate-select-background, #f5f5f5);
        display: block;
        left: 0;
        position: absolute;
        opacity: 0;
        top: 0;
    }
    .iui-listitem-animate-select-left {
        animation-name: listitem-animate-select-left;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes listitem-animate-select-left {
        0% { 	   
            left: 100%;
            opacity: 0.5;
            width: 0;
        }
        100% { 
            left: 0;
            opacity: 0;
            width: 100%;
        }
    }
    .iui-listitem-animate-select-right {
        animation-name: listitem-animate-select-right;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes listitem-animate-select-right {
        0% { 	   
            width: 0;
            opacity: 0.5;
        }
        100% { 
            width: 100%;
            opacity: 0;
        }
    }
`;
