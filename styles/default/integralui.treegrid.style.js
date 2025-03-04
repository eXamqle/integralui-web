import { c as css } from '../../external/lit-element.js';

const iuiTreeGridDefaultStyle = css`
    .iui-treegrid {
        background: var(--treegrid-background, white);
        border: var(--treegrid-border, thin solid #cecece);
        border-color:  var(--treegrid-border-color, #cecece);
        border-radius: var(--treegrid-border-radius, 1px);
        border-width: var(--treegrid-border-width, thin);
        color: var(--treegrid-color, black);
        cursor: var(--treegrid-cursor, default);
        display: var(--treegrid-display, block);
        float: var(--treegrid-float, none);
        height: var(--treegrid-height, auto);
        margin: var(--treegrid-margin, 0);
        opacity: var(--treegrid-opacity, 1);
        overflow: hidden;
        padding: var(--treegrid-padding, 0);
        position: var(--treegrid-position, relative);
        width: var(--treegrid-width, auto);
        
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .iui-treegrid table {
        color: var(--treegrid-color, black);
    }
    .iui-treegrid div { /*Compatibility with Bootstrap */
        -webkit-box-sizing: content-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: content-box;    /* Firefox, other Gecko */
        box-sizing: content-box; 
    }
    .iui-treegrid-rtl {
        direction: rtl;
    }
    .iui-treegrid-block {
        background: var(--treegrid-background, #white);
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: relative;
        z-index: 0;
    }
    .iui-treegrid-block-left {
        background: var(--treegrid-block-fixed-background, #f5f5f5);
        left: 0;
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        top: 0;
        z-index: 4;
    }
    .iui-treegrid-block-right {
        background: var(--treegrid-block-fixed-background, #f5f5f5);
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 3;
    }
    .iui-treegrid-block-top {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .iui-treegrid-block-top-left {
        background: transparent;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 12;
    }
    .iui-treegrid-block-top-right {
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 11;
    }
    .iui-treegrid-block-filter {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .iui-treegrid-block-filter-left {
        background: transparent;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 12;
    }
    .iui-treegrid-block-filter-right {
        background: transparent;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 11;
    }
    .iui-treegrid-block-bottom {
        bottom: 0;
        left: 0;
        position: absolute;
        z-index: 7;
    }
    .iui-treegrid-block-bottom-left {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9;
    }
    .iui-treegrid-block-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 8;
    }
    .iui-treegrid-block-middle {
        position: absolute;
        top: 0;
        left: 0;
    }
    .iui-treegrid-block-hover, .iui-treegrid-block-select {
        background: transparent;
        border: thin solid #cecece;
        box-shadow: 2px 3px 3px #e5e5e5;
        pointer-events: none;
        position: absolute;
        z-index: 6;
    }
    .iui-treegrid-block-hover > div, .iui-treegrid-block-select > div {
        background: #f5f5f5;
        pointer-events: auto;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 5;
    }
    .iui-treegrid-block-shift-left {
        /*margin-left: 16px !important;*/
        padding-left: 15px;
    }
    .iui-treegrid-block-shift-right {
        margin-right: 16px;
    }
    .iui-treegrid-filter-block-top {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .iui-treegrid-row-block {
        padding: 0 0 0 15px;
    }
    .iui-treegrid-row-block-rtl {
        padding: 0 15px 0 0;
    }
    .iui-treegrid-column-header, .iui-treegrid-column-filter, .iui-treegrid-column-footer {
        background: var(--treegrid-column-background, #ededed);
        border: var(--treegrid-column-border, thin solid #d5d5d5);
        border-color: var(--treegrid-column-border-color, #d5d5d5);
        color: var(--treegrid-column-color, black);
        margin: 0;
        padding: var(--treegrid-column-padding, 3px 0);
        position: relative;
        vertical-align:middle;
        white-space: nowrap;
        z-index: 1;
    }
    .iui-treegrid-column-filter  {
        background: var(--treegrid-column-filter-background, transparent);
        padding: var(--treegrid-column-filter-padding, 0px 0);
    }
    .iui-treegrid-block-top-left .iui-treegrid-column-header, 
    .iui-treegrid-block-top-left .iui-treegrid-column-filter, 
    .iui-treegrid-block-top-left .iui-treegrid-column-footer, 
    .iui-treegrid-block-top-right .iui-treegrid-column-header, 
    .iui-treegrid-block-top-right .iui-treegrid-column-filter,
    .iui-treegrid-block-top-right .iui-treegrid-column-footer {
        background: var(--treegrid-column-fixed-background, #dddddd);
        border: thin solid #c5c5c5;
    }
    .iui-treegrid-block-top-left .iui-treegrid-column-filter, .iui-treegrid-block-top-right .iui-treegrid-column-filter  {
        background: var(--treegrid-column-filter-fixed-background, transparent);
    }
    .iui-treegrid-column-header-hovered {
        animation-name: var(--treegrid-column-header-hovered-animation-name, none);
        background: var(--treegrid-column-header-hovered-background, #d5d5d5);
        border-color: var(--treegrid-colum-header-hovered-border-color, #cecece);
        color: var(--treegrid-column-header-hovered-color, black);
    }
    .iui-treegrid-column-header-selected {
        animation-name: var(--treegrid-column-header-selected-animation-name, none);
        background: var(--treegrid-column-header-selected-background, #bebebe);
        border-color: var(--treegrid-colum-header-selected-border-color, #aeaeae);
        color: var(--treegrid-column-header-selected-color, black);
    }
    .iui-treegrid-column-header > div, .iui-treegrid-column-filter > div, .iui-treegrid-column-footer > div, .iui-treegrid-row-cell > div {
        border: 2px solid transparent;
        margin: 0;
        padding: 2px;
        vertical-align: middle;
        overflow: hidden;
        text-align: left;
        /*text-overflow: ellipsis;*/
        white-space2: nowrap;
    }
    .iui-treegrid-column-header-cell-content, .iui-treegrid-column-footer-cell-content, .iui-treegrid-row-cell-label {
        display: inline;
        padding: 0 3px;
        vertical-align: middle;
        cursor: default;
    }
    .iui-treegrid-row, .iui-treegrid-row-fixed {
        color: var(--treegrid-row-color, black);
        margin: 0;
        padding: 0;
        white-space: nowrap;
        z-index: 0;
    }
    .iui-treegrid-row-hovered {
        animation-name: var(--treegrid-row-hovered-animation-name, none);
        background: var(--treegrid-row-hovered-background, #f5f5f5);
        border: var(--treegrid-row-hovered-border, thin solid #efefef);
        border-color: var(--treegrid-row-hovered-border-color, #efefef);
        color: var(--treegrid-row-hovered-color, black);
    }
    .iui-treegrid-row-selected {
        animation-name: var(--treegrid-row-selected-animation-name, none);
        background: var(--treegrid-row-selected-background, #e5e5e5);
        border: var(--treegrid-row-selected-border, thin solid #dedede);
        border-color: var(--treegrid-row-selected-border-color, #dedede);
        color: var(--treegrid-row-selected-color, black);
    }
    .iui-treegrid-row-cell {
        border-left: thin solid transparent;
        border-right: thin solid transparent;
        border-bottom: thin solid transparent;
        padding: 0;
        /*position: relative;*/
        vertical-align: middle;
    }
    .iui-treegrid-row-cell-content {
        border: 2px solid transparent;
        white-space: nowrap;
    }
    .iui-treegrid-row-cell-content:focus {
        outline: none !important;
    }
    .iui-treegrid-row-cell-content-focused {
        border: 2px solid gray !important;
    }
    .iui-treegrid-cell-empty {
        border: thin solid transparent !important;
    }
    .iui-treegrid-expand-box {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: var(--treegrid-expand-box-margin, 2px 3px 0 0);
        vertical-align: top;
    }
    .iui-treegrid-enter .iui-treegrid-expand-box {
        animation-name: iui-treegrid-animate-expand-box-enter2;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.4s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-treegrid-animate-expand-box-enter {
        0% { opacity: 0; }
        100% { opacity: 1; }
    } 
    .iui-treegrid-leave .iui-treegrid-expand-box {
        animation-name: iui-treegrid-animate-expand-box-leave2;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-treegrid-animate-expand-box-leave {
        0% { opacity: 1; }
        100% { opacity: 0; }
    } 
    .iui-treegrid-expand-box-load {
        background: url(../../icons/load.gif) no-repeat 0 0;
    }
    .iui-treegrid-expand-box-open {
        background: url(../../icons/expand.ico) no-repeat 0 0;
    }
    .iui-treegrid-expand-box-open-disabled {
        background: url(../../icons/expand-disabled.ico) no-repeat 0 0;
    }
    .iui-treegrid-expand-box-close {
        background: url(../../icons/collapse.ico) no-repeat 0 0;
    }
    .iui-treegrid-expand-box-close-disabled {
        background: url(../../icons/collapse-disabled.ico) no-repeat 0 0;
    }
    .iui-treegrid-column-reorder-mark {
        position: absolute;
        pointer-events: none;
    }
    .iui-treegrid-column-reorder-mark span {
        background-repeat: no-repeat;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
    .iui-treegrid-column-reorder-mark-left {
        background-image: url(../../icons/move-left.ico);
    }
    .iui-treegrid-column-reorder-mark-right {
        background-image: url(../../icons/move-right.ico);
    }
    .iui-treegrid-column-reorder-tooltip {
        background: -webkit-linear-gradient(white, #F1EFEC);
        background:    -moz-linear-gradient(white, #F1EFEC);
        background:     -ms-linear-gradient(white, #F1EFEC);
        background:      -o-linear-gradient(white, #F1EFEC);
        background :         linear-gradient(white, #F1EFEC);

        background-color: #F1EFEC;
        border: thin solid black;
        border-radius: 3px;
        font-size: 16px;
        margin:0;
        padding:0;
        position: absolute;
        box-shadow: 0 0 3px #888888;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 200px;
        z-index: 999;
    }
    .iui-treegrid-column-reorder-tooltip span {
        display: inline-block;
        padding: 3px;
        margin: 0 2px 0 0;
        vertical-align: middle;
    }
    .iui-treegrid-column-header-left, .iui-treegrid-column-filter-left, .iui-treegrid-column-footer-left {
        border-right: 1px solid #ababab;
    }
    .iui-treegrid-column-header-right, .iui-treegrid-column-filter-right, .iui-treegrid-column-footer-right {
        border-left: 1px solid #ababab;
    }
    .iui-treegrid-rows-left, .iui-treegrid-rows-left-top, .iui-treegrid-rows-left-bottom {
        border-right: 1px solid #ababab;
    }
    .iui-treegrid-rows-right, .iui-treegrid-rows-right-top, .iui-treegrid-rows-right-bottom {
        border-left: 1px solid #ababab;
    }
    .iui-treegrid-rows-top-block {
        background: #f6f6f6;
        border-bottom: thin solid #efefef;
    }
    .iui-treegrid-rows-bottom-block {
        background: #f6f6f6;
        border-top: thin solid #c5c5c5;
        z-index: 2;
    }
    .iui-treegrid-rows-bottom-block .iui-treegrid-row:last-child .iui-treegrid-lines-both {
        border-bottom: 0;
    }
    .iui-treegrid-row-cell:first-child {
        border-left: thin solid #d5d5d5;
    }
    .iui-treegrid-row-cell:last-child {
        border-right: thin solid #d5d5d5;
    }
    .iui-treegrid-lines-none {
        border-color: transparent !important;
    }
    .iui-treegrid-lines-horizontal:not(:last-child) {
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: #d5d5d5;
    }
    .iui-treegrid-lines-horizontal:last-child {
        border-left-color: transparent;
        border-bottom-color: #d5d5d5;
    }
    .iui-treegrid-lines-vertical {
        border-right-color: #d5d5d5;
    }
    .iui-treegrid-column-header .iui-treegrid-lines-vertical, .iui-treegrid-column-filter .iui-treegrid-lines-vertical, .iui-treegrid-column-footer .iui-treegrid-lines-vertical {
        border-left-color: #d5d5d5;
        border-right-color: #d5d5d5;
    }
    .iui-treegrid-row:last-child .iui-treegrid-lines-vertical {
        border-bottom-color: #d5d5d5;
    }
    .iui-treegrid-lines-both {
        border-right-color: #d5d5d5;
        border-bottom-color: #d5d5d5;
    }
    .iui-treegrid-column-header .iui-treegrid-lines-both, .iui-treegrid-column-filter .iui-treegrid-lines-both, .iui-treegrid-column-footer .iui-treegrid-lines-both {
        border-left-color: #d5d5d5;
        border-right-color: #d5d5d5;
        border-bottom-color: #d5d5d5;
    }
    
    /* Disabled State */
    .iui-treegrid-disabled div {
        opacity: var(--treegrid-disabled-opacity, 0.75);
        pointer-events: none;
    }
    .iui-treegrid-row-disabled {
        opacity: var(--treegrid-row-disabled-opacity, 0.6);
        pointer-events: none;
    }

    /* Animation */
    .iui-treegrid-column-animate {
        border: 0;
        background-color: transparent;
        box-shadow: none;
        overflow: hidden;
        position: relative;
    }
    .iui-treegrid-column-animate-enter {
        animation-name: treegrid-column-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.175s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-column-animate-enter {
        0% { 	   
            border: thin solid transparent;
            box-shadow: none;
        }
        100% { 
            border: thin solid #242424;
            box-shadow: 2px 3px 3px #cecece;
        }
    }
    .iui-treegrid-column-animate-select-block {
        display: block;
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
    }
    .iui-treegrid-column-animate-select {
        background: #d5d5d5;
        display: block;
        left: 0;
        position: absolute;
        opacity: 0;
        top: 0;
    }
    .iui-treegrid-column-animate-select-left {
        animation-name: treegrid-column-animate-select-left;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-column-animate-select-left {
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
    .iui-treegrid-column-animate-select-right {
        animation-name: treegrid-column-animate-select-right;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-column-animate-select-right {
        0% { 	   
            width: 0;
            opacity: 0.5;
        }
        100% { 
            width: 100%;
            opacity: 0;
        }
    }


    .iui-treegrid-row-animate {
        border: 0;
        background-color: transparent;
        box-shadow: none;
        display: block;
        overflow: hidden;
        position: relative;
    }
    .iui-treegrid-row-animate-enter {
        animation-name: treegrid-row-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.175s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-row-animate-enter {
        0% { 	   
            border: thin solid transparent;
            box-shadow: none;
        }
        100% { 
            border: thin solid #242424;
            box-shadow: 2px 3px 3px #cecece;
        }
    }
    .iui-treegrid-row-animate-select-block {
        display: block;
        pointer-events: none;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
    }
    .iui-treegrid-row-animate-select {
        background: #f5f5f5;
        display: block;
        left: 0;
        position: absolute;
        opacity: 0;
        top: 0;
    }
    .iui-treegrid-row-animate-select-left {
        animation-name: treegrid-row-animate-select-left;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-row-animate-select-left {
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
    .iui-treegrid-row-animate-select-right {
        animation-name: treegrid-row-animate-select-right;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes treegrid-row-animate-select-right {
        0% { 	   
            width: 0;
            opacity: 0.5;
        }
        100% { 
            width: 100%;
            opacity: 0;
        }
    }


    /* For Drag Drop with border to each row
    .iui-treegrid table {
        border-collapse: collapse;
    }
    .iui-treegrid-row:hover {
        border: thin solid red;
        box-shadow: 2px 3px 3px #e5e5e5;
    }
    */


    /* Drag Drop Column */
    .iui-treegrid-handle {
        background-image: var(--treegrid-handle-background-image, url(../../icons/grab.ico));
        background-repeat: repeat;
        cursor: var(--treegrid-handle-cursor, grab);
        display: block;
        height: var(--treegrid-handle-height, 16px);
        margin: var(--treegrid-handle-margin, 2px 0);
        padding: 0;
        vertical-align: middle;
        width: var(--treegrid-handle-width, 16px);
    }

    /* Editing Column */
    .iui-treegrid-editing {
        background-repeat: repeat;
        cursor: var(--treegrid-editing-cursor, default);
        display: block;
        height: var(--treegrid-editing-height, 16px);
        margin: var(--treegrid-editing-margin, 2px 0);
        opacity: 0.25;
        padding: 0;
        vertical-align: middle;
        width: var(--treegrid-editing-width, 16px);
    }
    .iui-treegrid-editing-hover, .iui-treegrid-editing:hover {
        background-image: var(--treegrid-editing-background-image, url(../../icons/edit.ico));
        opacity: 0.25;
    }
    .iui-treegrid-editing-active {
        background-image: var(--treegrid-editing-background-image, url(../../icons/edit.ico));
        opacity: 1;
    }
    .iui-treegrid-editing-active:hover {
        opacity: 1 !important;
    }
    .iui-treegrid-editor-save-column {
        opacity: 0;
    }

    /* TreeGrid Form */
    .iui-treegrid-form {
        background: #f5f5f5;
        cursor: ew-resize;
        opacity: 0;
        overflow: auto;
        padding: 0 0 0 15px;
        position: absolute;
        right: -320px;
        top: 0;
        width: 300px;
        z-index: 101;
    }
    .iui-treegrid-form > div {
        cursor: default;
        height: calc(100% - 25px);
        padding: 10px 10px 10px 0;
    }    
    .iui-treegrid-form-active {
        opacity: 1;
        right: 0;
    }
    .iui-treegrid-form-label {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .iui-treegrid-form-label-inline {
        display:inline-block; 
        margin-top: 5px; 
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        white-space: nowrap;
    }
    .iui-treegrid-form-editor-text {
        border: 1px solid #cecece;
        border-radius: 1px;
        display: block;
        margin: 2px 0 15px 0;
        padding: 7px 5px;
        width: calc(100% - 14px);
    }

    /* TreeGrid Batch Editing */
    .iui-treegrid-row-deleted, .iui-treegrid-cell-deleted {
        background: #e5e5e5;
        color: #999999;
    }
    .iui-treegrid-cell-value-changed {
        background: #ffc58f;
        color: black;
    }
`;

export { iuiTreeGridDefaultStyle };
