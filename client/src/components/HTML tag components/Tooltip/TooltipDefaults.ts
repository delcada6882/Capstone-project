import { DeepRequired } from '../../../utils/typeUtils/typeFunctions';
import { TooltipProps } from './Tooltip';

export const DEFAULT_TOOLTIP_PROPS: DeepRequired<TooltipProps> = {
    // Required props:
    content: '',
    // Optional props:
    className: undefined,
    style: {},
    onClick: undefined,
    // Tooltip props:
    textColor: undefined,
    backgroundColor: undefined,
    position: 'top',
    look: 'standard',
    // Arrow props:
    margin: '10px',
    maxWidth: 'none',
    pointerSize: '10px',
    pointer: 'default',
    // Functionality props:
    interactive: false,
    onShow: undefined,
    onHide: undefined,
    onShowEnd: undefined,
    onHideEnd: undefined,
    onMount: undefined,
    onUnmount: undefined,
    // Animation props:
    showAnimation: undefined,
    hideAnimation: undefined,
};
