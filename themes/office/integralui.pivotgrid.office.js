import { c as css } from '../../external/lit-element.js';

const iuiPivotGridOfficeStyle = css`
    .iui-pivotgrid {
        border-color:  var(--pivotgrid-border-color, #d9d9d9);
        color: var(--pivotgrid-color, black);
    }
    .iui-pivotgrid-block-left, .iui-pivotgrid-block-right {
        background: var(--pivotgrid-block-fixed-background, #f9f9f9);
    }
    .iui-pivotgrid-block-top-left .iui-pivotgrid-column-header, 
    .iui-pivotgrid-block-top-left .iui-pivotgrid-column-footer, 
    .iui-pivotgrid-block-top-right .iui-pivotgrid-column-header, 
    .iui-pivotgrid-block-top-right .iui-pivotgrid-column-footer {
        background: var(--pivotgrid-column-fixed-background, #eeeeee);
        border: var(--pivotgrid-column-fixed-border, thin solid transparent);
        color: var(--pivotgrid-column-fixed-color, black);
    }
    .iui-pivotgrid-block-top-left .iui-pivotgrid-column-header-hovered, 
    .iui-pivotgrid-block-top-right .iui-pivotgrid-column-header-hovered {
        background-color: #e9e9e9;
        border: thin solid #e9e9e9 !important;
        color: #000000;
    }
    .iui-pivotgrid-block-top-left .iui-pivotgrid-column-header-selected, 
    .iui-pivotgrid-block-top-right .iui-pivotgrid-column-header-selected {
        background-color: #d9d9d9;
        border: thin solid #d9d9d9 !important;
        color: #000000;
    }
    .iui-pivotgrid-block-hover {
        border: thin solid #bebebe;
    }
    .iui-pivotgrid-column-header, .iui-pivotgrid-column-footer {
        background: var(--pivotgrid-column-background, #f5f5f5);
        border-color: var(--pivotgrid-column-border-color, transparent);
        border-right: thin solid transparent !important;
        color: var(--pivotgrid-column-color, #49678f);
    }
    .iui-pivotgrid-column-header {
        border-bottom: thin solid #efefef !important;
    }
    .iui-pivotgrid-column-footer {
        border-top: thin solid #efefef !important;
        color: var(--pivotgrid-column-footer-color, #323232);
    }
    .iui-pivotgrid-column-header-hovered {
        background: var(--pivotgrid-column-header-hovered-background, #e9e9e9);
        border-color: var(--pivotgrid-colum-header-hovered-border-color, #e9e9e9);
        color: var(--pivotgrid-column-header-hovered-color, #49678f);

        animation-name: var(--pivotgrid-column-header-hovered-animation-name, iui-pivotgrid-column-hovered-animate-enter);
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-pivotgrid-column-hovered-animate-enter {
        0% { background: var(--pivotgrid-animation-column-hovered-background-0, #f5f5f5); }
        100% { background: var(--pivotgrid-animation-column-hovered-background-100, #e9e9e9); }
    }
    .iui-pivotgrid-column-header-selected {
        background: var(--pivotgrid-column-header-hovered-background, #d9d9d9);
        border-color: var(--pivotgrid-colum-header-hovered-border-color, #d9d9d9);
        color: var(--pivotgrid-column-header-hovered-color, #3d5576);

        animation-name: var(--pivotgrid-column-header-selected-animation-name, iui-pivotgrid-column-selected-animate-enter);
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-pivotgrid-column-selected-animate-enter {
        0% { background: var(--pivotgrid-animation-column-selected-background-0, #e9e9e9); }
        100% { background: var(--pivotgrid-animation-column-selected-background-100, #d9d9d9); }
    }
    .iui-pivotgrid-column-header-cell-selected {
        background: transparent;
    }
    .iui-pivotgrid-row, .iui-pivotgrid-row-fixed {
        color: var(--pivotgrid-row-color, #646464);
    }
    .iui-pivotgrid-row-hovered {
        background: var(--pivotgrid-row-hovered-background, transparent);
        color: var(--pivotgrid-row-hovered-color, black);

        animation-name: var(--pivotgrid-row-hovered-animation-name, iui-pivotgrid-row-hovered-animate-enter);
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-pivotgrid-row-hovered-animate-enter {
        0% { background: var(--pivotgrid-animation-row-hovered-background-0, transparent); }
        100% { background: var(--pivotgrid-animation-row-hovered-background-100, #d9edfd); }
    }
    .iui-pivotgrid-row-selected {
        background: var(--pivotgrid-row-selected-background, #d9edfd);
        border-color: var(--pivotgrid-row-selected-border-color, #99d1ff);
        color: var(--pivotgrid-row-selected-color, black);

        animation-name: var(--pivotgrid-row-selected-animation-name, iui-pivotgrid-row-selected-animate-enter);
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-pivotgrid-row-selected-animate-enter {
        0% { background: var(--pivotgrid-animation-row-selected-background-0, #d9edfd); }
        100% { background: var(--pivotgrid-animation-row-selected-background-100, #a5d3fa); }
    }
    .iui-pivotgrid-row-cell:first-child {
        border-left: thin solid transparent;
    }
    .iui-pivotgrid-row-cell:last-child {
        border-right: thin solid transparent;
    }
    .iui-pivotgrid-lines-horizontal:not(:last-child) {
        border-bottom-color: #efefef;
    }
    .iui-pivotgrid-lines-horizontal:last-child {
        border-bottom: thin solid #efefef;
    }
    .iui-pivotgrid-lines-vertical {
        border-right: thin solid transparent;
    }
    .iui-pivotgrid-lines-both {
        border-right: thin solid transparent;
        border-bottom: thin solid #efefef;
    }
    .iui-pivotgrid-expand-box-open {
        background: url(../../icons/expandbox-icons.png) no-repeat -80px 0;
    }
    .iui-pivotgrid-expand-box-open:hover {
        background: url(../../icons/expandbox-icons.png) no-repeat -64px 0;
    }
    .iui-pivotgrid-expand-box-close {
        background: url(../../icons/expandbox-icons.png) no-repeat -80px -16px;
    }
    .iui-pivotgrid-expand-box-close:hover {
        background: url(../../icons/expandbox-icons.png) no-repeat -64px -16px;
    }

    /* Animation */
    .iui-pivotgrid-column-animate-select {
        background: #e9e9e9;
    }
    .iui-pivotgrid-row-animate-select {
        background: #d9edfd;
    }

    /* Filtering and Sorting */
    .iui-pivotgrid .iui-filtering, .iui-pivotgrid .iui-filtering-hovered, .iui-pivotgrid .iui-filtering-selected {
        background-position: -96px -128px;
    }
    .iui-pivotgrid .iui-sort-ascending, .iui-pivotgrid .iui-sort-ascending-hovered, .iui-pivotgrid .iui-sort-ascending-selected {
        background-position: -48px -128px !important;
    }
    .iui-pivotgrid .iui-sort-descending, .iui-pivotgrid .iui-sort-descending-hovered, .iui-pivotgrid .iui-sort-descending-selected {
        background-position: -32px -128px !important;
    }
`;

export { iuiPivotGridOfficeStyle };
