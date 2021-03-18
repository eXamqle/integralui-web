import { c as css } from '../../external/lit-element.js';

export const iuiGridOfficeStyle = css`
    .iui-grid
    {
        border: thin solid #d9d9d9;
        color: #000000;
    }
    .iui-grid-block-left, .iui-grid-block-right
    {
        background: #f9f9f9;
    }
    .iui-grid-block-top-left .iui-grid-column-header, 
    .iui-grid-block-top-left .iui-grid-column-footer, 
    .iui-grid-block-top-right .iui-grid-column-header, 
    .iui-grid-block-top-right .iui-grid-column-footer {
        background-color: #eeeeee;
        border: thin solid transparent !important;
        color: #000000;
    }
    .iui-grid-block-top-left .iui-grid-column-header-hovered, 
    .iui-grid-block-top-right .iui-grid-column-header-hovered {
        background-color: #e9e9e9;
        border: thin solid #e9e9e9 !important;
        color: #000000;
    }
    .iui-grid-block-top-left .iui-grid-column-header-selected, 
    .iui-grid-block-top-right .iui-grid-column-header-selected {
        background-color: #d9d9d9;
        border: thin solid #d9d9d9 !important;
        color: #000000;
    }
    .iui-grid-block-hover {
        border: thin solid #bebebe;
    }
    .iui-grid-column-header, .iui-grid-column-footer
    {
        background-color: #f5f5f5;
        border-color: transparent;
        border-right: thin solid transparent !important;
        color: #49678f;
    }
    .iui-grid-column-header
    {
        border-bottom: thin solid #efefef !important;
    }
    .iui-grid-column-footer
    {
        border-top: thin solid #efefef !important;
        color: #323232;
    }
    .iui-grid-column-header-hovered
    {
        background-color: #e9e9e9;
        border-color: #e9e9e9;
        color: #49678f;

        animation-name: iui-grid-column-hovered-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-grid-column-hovered-animate-enter {
        0% { background: #f5f5f5; }
        100% { background: #e9e9e9; }
    }
    .iui-grid-column-header-selected
    {
        background-color: #d9d9d9;
        border-right-color: #d9d9d9;
        color: #3d5576;

        animation-name: iui-grid-column-selected-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-grid-column-selected-animate-enter {
        0% { background: #e9e9e9; }
        100% { background: #d9d9d9; }
    }
    .iui-grid-column-header-cell-selected
    {
        background-color: transparent;
    }
    .iui-grid-row, .iui-grid-row-fixed {
        color: #646464;
    }
    .iui-grid-row-hovered
    {
        background-color: transparent;
        color: #000000;

        animation-name: iui-grid-row-hovered-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-grid-row-hovered-animate-enter {
        0% { background: transparent; }
        100% { background: #d9edfd; }
    }
    .iui-grid-row-selected
    {
        background-color: #d9edfd;
        border-color: #99d1ff;
        color: #000000;

        animation-name: iui-grid-row-selected-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-grid-row-selected-animate-enter {
        0% { background: #d9edfd; }
        100% { background: #a5d3fa; }
    }
    .iui-grid-row-cell:first-child
    {
        border-left: thin solid transparent;
    }
    .iui-grid-row-cell:last-child
    {
        border-right: thin solid transparent;
    }
    .iui-grid-lines-horizontal:not(:last-child)
    {
        border-bottom-color: #efefef;
    }
    .iui-grid-lines-horizontal:last-child
    {
        border-bottom: thin solid #efefef;
    }
    .iui-grid-lines-vertical
    {
        border-right: thin solid transparent;
    }
    .iui-grid-lines-both
    {
        border-right: thin solid transparent;
        border-bottom: thin solid #efefef;
    }
    .iui-grid-expand-box-open
    {
        background: url(../../icons/expandbox-icons.png) no-repeat -80px 0;
    }
    .iui-grid-expand-box-open:hover
    {
        background: url(../../icons/expandbox-icons.png) no-repeat -64px 0;
    }
    .iui-grid-expand-box-close
    {
        background: url(../../icons/expandbox-icons.png) no-repeat -80px -16px;
    }
    .iui-grid-expand-box-close:hover
    {
        background: url(../../icons/expandbox-icons.png) no-repeat -64px -16px;
    }

    /* Grouping */
    .iui-grid-grouping-panel
    {
        background-color: #f5f5f5;
        border-bottom: thin solid #d9d9d9;
    }
    .iui-grid-grouping-panel-item
    {
        background-color: #e2e2e2;
        border: thin solid #e2e2e2;
    }
    .iui-grid-grouping-panel-toolbar-button-add
    {
        background: #e2e2e2;
        border: thin solid #e2e2e2;
    }
    .iui-grid-grouping-marker::before
    {
        border: 6px solid #e2e2e2;
        border-color: transparent transparent transparent #e2e2e2;
    }
    .iui-grid-grouping-marker::after
    {
        border: 6px solid #e2e2e2;
        border-color: transparent transparent transparent #e2e2e2;
    }
    .iui-grid-grouping-panel-dropdown-list li:hover
    {
        background: #e5e5e5;
    }

    /* Animation */
    .iui-grid-column-animate-select
    {
        background: #e9e9e9;
    }
    .iui-grid-row-animate-select
    {
        background: #d9edfd;
    }

    /* Filtering and Sorting */
    .iui-grid .iui-filtering, .iui-grid .iui-filtering-hovered, .iui-grid .iui-filtering-selected
    {
        background-position: -96px -128px;
    }
    .iui-grid .iui-sort-ascending, .iui-grid .iui-sort-ascending-hovered, .iui-grid .iui-sort-ascending-selected
    {
        background-position: -48px -128px !important;
    }
    .iui-grid .iui-sort-descending, .iui-grid .iui-sort-descending-hovered, .iui-grid .iui-sort-descending-selected
    {
        background-position: -32px -128px !important;
    }
`;
