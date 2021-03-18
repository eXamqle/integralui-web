import { c as css } from '../../external/lit-element.js';

export const iuiContextMenuOfficeStyle = css`
    .iui-contextmenu
    {
        background-color: #fefefe;
        border: solid thin #dedede;
    }
    .iui-contextmenu .iui-menuitem-block
    {
        background: #f5f5f5;
        border: solid thin #dedede;
    }
    .iui-contextmenu .iui-menuitem-root
    {
        border-color: transparent;
        color: black;
    }
    .iui-contextmenu .iui-menuitem-root-hovered, .iui-contextmenu .iui-menuitem-root-selected
    {
        background-color: transparent !important;
        border: solid thin transparent !important;
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
`;
