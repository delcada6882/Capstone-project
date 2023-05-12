export enum TooltipEvents {
    SHOW = 'showTooltip',
    HIDE = 'hideTooltip',
}
export const hideTooltipEvent = new Event(TooltipEvents.HIDE, {
    bubbles: false,
});
export const showTooltipEvent = new Event(TooltipEvents.SHOW, {
    bubbles: false,
});
export function hideTooltip(elem: HTMLElement) {
    elem.dispatchEvent(hideTooltipEvent);
}
export function showTooltip(elem: HTMLElement) {
    elem.dispatchEvent(showTooltipEvent);
}
