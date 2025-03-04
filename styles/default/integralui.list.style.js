import { c as css } from '../../external/lit-element.js';

export const iuiListDefaultStyle = css`
    .iui-list {
        background: var(--list-background, white);
        border: var(--list-border, thin solid #cecece);
        border-color:  var(--list-border-color, #cecece);
        border-radius: var(--list-border-radius, 1px);
        border-width: var(--list-border-width, thin);
        color: var(--list-color, black);
        cursor: var(--list-cursor, default);
        display: var(--list-display, block);
        float: var(--list-float, none);
        height: var(--list-height, auto);
        margin: var(--list-margin, 0);
        opacity: var(--list-opacity, 1);
        overflow: hidden;
        padding: var(--list-padding, 1px);
        position: var(--list-position, relative);
        width: var(--list-width, auto);

        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .iui-list:focus {
        outline: none !important;
    }
    .iui-list li {
        display: block;
    }

    .iui-list-block-hover, .iui-list-block-select {
        background: var(--list-block-background, transparent);
        border: var(--list-block-border, thin solid #cecece);
        box-shadow: var(--list-block-box-shadow, 2px 3px 3px #e5e5e5);
        pointer-events: none;
        position: absolute;
        z-index: 6;
    }
    .iui-list-block-hover > div, .iui-list-block-select > div {
        background: var(--list-block-panel-background, #f5f5f5);
        pointer-events: auto;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 5;
    }

    /* Disabled State */
    .iui-list-disabled div, .iui-list-disabled ul
    {
        opacity: var(--list-disabled-opacity, 0.75);
        pointer-events: none;
    }
`;
