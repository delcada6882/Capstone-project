export type AnimationName =
    | 'fade'
    | 'flip'
    | 'shift-away'
    | 'shift-toward'
    | 'scale'
    | 'none';
export type EasingFunction =
    | CubicBezierTimingFunction
    | StepTimingFunction
    | CustomTimingFunction
    | 'bounce'
    | 'elastic'
    | 'linear'
    | 'none';
export type CubicBezierTimingFunction =
    | 'ease'
    | 'ease-in'
    | 'ease-in-out'
    | 'ease-out';
export type AnimationDelay = number | `${number}ms` | `${number}s`;
export type AnimationDuration = number | `${number}ms` | `${number}s`;
export type StepTimingFunction = 'step-end' | 'step-start';
export type CustomTimingFunction =
    `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
export interface AnimationProperties {
    name: AnimationName;
    duration?: AnimationDuration;
    delay?: AnimationDelay;
    easingFunction?: EasingFunction;
    distance?: number | `${number}px` | `${number}%` | `${number}em`;
}
