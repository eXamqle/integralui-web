import { c as css } from '../../../external/lit-element.js';

export const iuiMenuItemLightStyle = css`
    .iui-menu
    {
        background-color: #2455b0;
    }
    .iui-menu > ul
    {
        background-color: #2455b0;
    }
    .iui-menuitem-root, .iui-menuitem-root-vertical
    {
        background: none;
        border: solid thin #2455b0;
        color: white;
    }
    .iui-menuitem-root-hovered, .iui-menuitem-root-selected
    {
        background-color: #153268 !important;
        border: solid thin #0f244a !important;
        color: white;

        animation-name: iui-menuitem-root-hovered-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-menuitem-root-hovered-animate-enter {
        0% { background: transparent; border-color: transparent; }
        100% { background: #153268; border-color: #0f244a; }
    }
    .iui-menuitem-root-hovered a
    {
        color: black;
    }
    .iui-menuitem
    {
        color: black;
    }
    .iui-menuitem-hovered, .iui-menuitem-selected, .iui-contextmenuitem-hovered, .iui-contextmenuitem-selected
    {
        background-color: #d9edfd !important;
        border: solid thin #d9edfd !important;
        color: black;

        animation-name: iui-menuitem-hovered-animate-enter;
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-menuitem-hovered-animate-enter {
        0% { background: transparent; border-color: transparent; }
        100% { background: #d9edfd; border-color: #d9edfd; }
    }
    .iui-menuitem-selected a
    {
        color: black;
    }
    .iui-menu li > ul
    {
        background-color: #fefefe;
        border: solid thin #1e4691;
    }
    .iui-menu-expand-box
    {
        width: 16px;
        height: 16px;
    }
    .iui-menuitem, .iui-contextmenuitem
    {
        background-color: #fefefe;
        border: solid thin #fefefe;
        color: black;
    }
    .iui-menu-marker-expand-down::before
    {
        border: 4px solid #6791e1;
        border-color: #6791e1 transparent transparent transparent;
    }
    .iui-menu-marker-expand-down-rtl::before
    {
        border: 4px solid #6791e1;
        border-color: #6791e1 transparent transparent transparent;
    }
    .iui-menu-marker-expand-right::before
    {
        border: 4px solid #6791e1;
        border-color: transparent transparent transparent #6791e1;
    }
    .iui-menu-marker-expand-left::before
    {
        border: 4px solid #6791e1;
        border-color: transparent #6791e1 transparent transparent;
    }
    .iui-menu-marker-top::before
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent #1e4691 transparent;
    }
    .iui-menu-marker-top::after
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent #fefefe transparent;
    }
    .iui-menu-marker-top-rtl::before
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent #1e4691 transparent;
    }
    .iui-menu-marker-top-rtl::after
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent #fefefe transparent;
    }
    .iui-menu-marker-left::before
    {
        border: 4px solid #fefefe;
        border-color: transparent #1e4691 transparent transparent;
    }
    .iui-menu-marker-left::after
    {
        border: 4px solid #fefefe;
        border-color: transparent #fefefe transparent transparent;
    }
    .iui-menu-marker-right::before
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent transparent #1e4691;
    }
    .iui-menu-marker-right::after
    {
        border: 4px solid #fefefe;
        border-color: transparent transparent transparent #fefefe;
    }
    .iui-menu-disabled > ul
    {
        background: #808080;
    }
    .iui-menuitem-root-disabled, .iui-menuitem-disabled
    {
        border: solid thin transparent;
        color: #cecece;
    }

    .iui-contextmenuitem-root-hovered, .iui-contextmenuitem-root-selected {
        background: var(--contextmenuitem-hovered-background, #d9edfd);
        border: var(--contextmenuitem-hovered-border, thin solid #d9edfd);
        color: var(--contextmenuitem-hovered-color, black);

        animation-name: none; /*iui-contextmenuitem-hovered-animate-enter;*/
        animation-delay: 0s;
        animation-direction: normal;
        animation-duration: 0.15s;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-play-state: running;
        animation-timing-function: linear; 
    }
    @keyframes iui-contextmenuitem-hovered-animate-enter {
        0% { 
            background: var(--contextmenuitem-hovered-animation-background-0, transparent); 
            border-color: var(--contextmenuitem-hovered-animation-border-color-0, transparent);
        }
        100% { 
            background: var(--contextmenuitem-hovered-animation-background-100, #d9edfd); 
            border-color: var(--contextmenuitem-hovered-animation-border-color-100, #d9edfd);
        }
    }
`;