import { c as css } from '../../../external/lit-element.js';

export const iuiDarkStyle = css`
    .iui-header-expand-box {
        opacity: 0.75;
    }
    .iui-item {
        color: #cccccc;
    }
    /* Item Hover State */
    .iui-item-hovered {
        background-color: #2a2d2e;
        border: thin solid #2a2d2e;
    }
    /* Item Selected State */
    .iui-item-selected {
        background-color: #37373d;
        border: thin solid #37373d;
        color: white;
    } 

    .iui-list {
        background: #252526;
        border: thin solid #151515;
        color: #cccccc;
    }
    .iui-list li {
        color: #cccccc;
    }
    .iui-list li:hover {
        background-color: #2a2d2e;
        border: 2px solid #2a2d2e;
    }
    .iui-list-item-selected {
        background-color: #37373d;
        color: white;
    }
`;