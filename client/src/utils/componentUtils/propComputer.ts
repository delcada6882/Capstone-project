export interface StyleProps {
    style?: React.CSSProperties;

    p?: string;
    pt?: string;
    pr?: string;
    pb?: string;
    pl?: string;
    px?: string;
    py?: string;

    m?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    mx?: string;
    my?: string;

    padding?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingX?: string;
    paddingY?: string;

    margin?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginX?: string;
    marginY?: string;

    display?:
        | 'block'
        | 'inline'
        | 'inline-block'
        | 'flex'
        | 'inline-flex'
        | 'grid'
        | 'inline-grid'
        | 'none'
        | 'inherit'
        | 'initial'
        | 'unset';
    position?:
        | 'absolute'
        | 'relative'
        | 'fixed'
        | 'static'
        | 'sticky'
        | 'inherit'
        | 'initial'
        | 'unset';

    minHeight?: string;
    maxHeight?: string;

    minWidth?: string;
    maxWidth?: string;

    height?: string;
    width?: string;
}

export function computeStyleProps(inputProps: StyleProps): React.CSSProperties {
    let computedStyles: any = {};
    let propName: keyof StyleProps;
    for (propName in inputProps) {
        if (propName === 'style') {
            computedStyles = { ...computedStyles, ...inputProps.style };
            continue;
        }
        let propValue = inputProps[propName];
        if (propName.at(-1)?.toLowerCase() === 'x') {
            propValue = `0 ${propValue}`;
            if (propName[0] === 'm') propName = 'margin';
            else if (propName[0] === 'p') propName = 'padding';
        }
        if (propName.at(-1)?.toLowerCase() === 'y') {
            propValue = `${propValue} 0`;
            if (propName[0] === 'm') propName = 'margin';
            else if (propName[0] === 'p') propName = 'padding';
        }
        if (propName.length <= 2) {
            switch (propName[1]) {
                case 't':
                    if (propName[0] === 'm') propName = 'marginTop';
                    else if (propName[0] === 'p') propName = 'paddingTop';
                    break;
                case 'r':
                    if (propName[0] === 'm') propName = 'marginRight';
                    else if (propName[0] === 'p') propName = 'paddingRight';
                    break;
                case 'b':
                    if (propName[0] === 'm') propName = 'marginBottom';
                    else if (propName[0] === 'p') propName = 'paddingBottom';
                    break;
                case 'l':
                    if (propName[0] === 'm') propName = 'marginLeft';
                    else if (propName[0] === 'p') propName = 'paddingLeft';
                    break;
                default:
                    break;
            }
        }
        computedStyles[propName] = propValue;
    }
    return computedStyles;
}

export function computeProps(props: React.PropsWithChildren<StyleProps>) {
    if (props.hasOwnProperty('children')) delete props.children;
    return { style: { ...computeStyleProps(props) } };
}

// export function filterObject(inputProps: React.PropsWithChildren<StyleProps>) {
//     const filterObjective = [
//         ...shorthandStylePropsToLowercase,
//         'children',
//     ];
//     return Object.keys(inputProps)
//         .filter((key) => !filterObjective.includes(key.toLowerCase()))
//         .reduce(
//             (res, key) => Object.assign(res, { [key]: inputProps[key] }),
//             {}
//         );
// }

// export const shorthandStyleProps = [
//     'display',
//     'position',
//     'minHeight',
//     'maxHeight',
//     'minWidth',
//     'maxWidth',
//     'height',
//     'width',
//     'margin',
//     'marginTop',
//     'marginRight',
//     'marginBottom',
//     'marginLeft',
//     'marginX',
//     'marginY',
//     'padding',
//     'paddingTop',
//     'paddingRight',
//     'paddingBottom',
//     'paddingLeft',
//     'paddingX',
//     'paddingY',
//     'm',
//     'mt',
//     'mr',
//     'mb',
//     'ml',
//     'mx',
//     'my',
//     'p',
//     'pt',
//     'pr',
//     'pb',
//     'pl',
//     'px',
//     'py',
// ];
// export const shorthandStylePropsToLowercase = [
//     'display',
//     'position',
//     'minHeight',
//     'maxHeight',
//     'minWidth',
//     'maxWidth',
//     'height',
//     'width',
//     'margin',
//     'margintop',
//     'marginright',
//     'marginbottom',
//     'marginleft',
//     'marginx',
//     'marginy',
//     'padding',
//     'paddingtop',
//     'paddingright',
//     'paddingbottom',
//     'paddingleft',
//     'paddingx',
//     'paddingy',
//     'm',
//     'mt',
//     'mr',
//     'mb',
//     'ml',
//     'mx',
//     'my',
//     'p',
//     'pt',
//     'pr',
//     'pb',
//     'pl',
//     'px',
//     'py',
// ];
