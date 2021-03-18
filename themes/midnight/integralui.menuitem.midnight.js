import { c as css } from '../../external/lit-element.js';

export const iuiMenuItemMidnightStyle = css`
    .iui-menu
    {
        background-color: #252526;
        color: white;
    }
    .iui-menu-block
    {
        background-color: #252526;
        border-color: #151515;
    }
    .iui-menuitem-block
    {
        background-color: #252526;
        border: solid thin #151515;
        box-shadow: 0 2px 5px #151515;
        color: #cccccc;
    }
    .iui-menuitem-root, .iui-menuitem-root-vertical
    {
        background: none;
        border: solid thin #252526;
        color: #cccccc;
    }
    .iui-menuitem-root-hovered, .iui-menuitem-root-selected
    {
        animation-name: none;
        background-color: #1177bb !important;
        border: solid thin #1177bb !important;
        color: white;
    }
    .iui-menuitem-root-hovered a
    {
        color: black;
    }
    .iui-menuitem
    {
        background-color: #252526;
        border-color: transparent;
        color: #cccccc;
    }
    .iui-menuitem-hovered
    {
        animation-name: none;
        background-color: #1177bb !important;
        border-color: #1177bb !important;
        color: white;
    }
    .iui-menuitem-selected
    {
        animation-name: none;
        background-color: #1177bb !important;
        border-color: #1177bb !important;
        color: white;
    }
    .iui-menuitem-selected a
    {
        color: white;
    }
    .iui-menu li > ul
    {
        background-color: #252526;
        border: thin solid #151515;
        box-shadow: 0 2px 5px #151515;
    }
    .iui-menu-expand-box
    {
        width: 16px;
        height: 16px;
    }
    .iui-menuitem-normal
    {
        background-color: transparent;
        border-color: transparent;
        color: #cccccc;
    }
    .iui-menuitem-root-separator, .iui-menuitem-separator
    {
        background-color: #252526;
    }
    .iui-menuitem-root-separator > hr, .iui-menuitem-separator > hr
    {
        background-color: #151515;
    }
    .iui-menu-marker-expand-down::before
    {
        border: 4px solid #0a4369;
        border-color: #0a4369 transparent transparent transparent;
    }
    .iui-menu-marker-expand-down-rtl::before
    {
        border: 4px solid #0a4369;
        border-color: #0a4369 transparent transparent transparent;
    }
    .iui-menu-marker-expand-right::before
    {
        border: 4px solid #0a4369;
        border-color: transparent transparent transparent #0a4369;
    }
    .iui-menu-marker-expand-left::before
    {
        border: 4px solid #0a4369;
        border-color: transparent #0a4369 transparent transparent;
    }
    .iui-menu-marker-top::before
    {
        border: 4px solid #484848;
        border-color: transparent transparent #1177bb transparent;
    }
    .iui-menu-marker-top::after
    {
        border: 4px solid #484848;
        border-color: transparent transparent #242424 transparent;
    }
    .iui-menu-marker-top-rtl::before
    {
        border: 4px solid #484848;
        border-color: transparent transparent #000000 transparent;
    }
    .iui-menu-marker-top-rtl::after
    {
        border: 4px solid #484848;
        border-color: transparent transparent #242424 transparent;
    }
    .iui-menu-marker-left::before
    {
        border: 4px solid #484848;
        border-color: transparent #000000 transparent transparent;
    }
    .iui-menu-marker-left::after
    {
        border: 4px solid #484848;
        border-color: transparent #242424 transparent transparent;
    }
    .iui-menu-marker-right::before
    {
        border: 4px solid #484848;
        border-color: transparent transparent transparent #000000;
    }
    .iui-menu-marker-right::after
    {
        border: 4px solid #484848;
        border-color: transparent transparent transparent #242424;
    }
    .iui-menu-disabled > ul
    {
        background: #808080;
    }
    .iui-menuitem-root-disabled, .iui-menuitem-disabled
    {
        border: solid thin transparent;
        color: #cccccc;
    }
`;