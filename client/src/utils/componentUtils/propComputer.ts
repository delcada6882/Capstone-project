/* 
    p pt pr pb pl px py
    m mt mr mb ml px py
    padding paddingTop paddingRight paddingBottom paddingLeft paddingX paddingY
    margin marginTop marginRight marginBottom marginLeft marginX marginY
    display
    position
    minHeight
    minWidth
    maxHeight
    maxWidth
    height
    width
*/
export function computeStyleProps(inputProps) {
    let computedStyles = {};
    for (let propName in inputProps) {
        let propValue = inputProps[propName];
        propName = propName.toLowerCase();
        if (shorthandStylePropsToLowercase.includes(propName)) {
            if (propName.at(-1) === 'x') {
                propValue = `0 ${propValue}`;
                propName = propName.substring(0, propName.length - 1);
            }
            if (propName.at(-1) === 'y') {
                propValue = `${propValue} 0`;
                propName = propName.substring(0, propName.length - 1);
            }
            let temp = propName;
            if (propName.length < 3) {
                if (propName[0] === 'm') temp = 'margin';
                else if (propName[0] === 'p') temp = 'padding';
                if (propName.length !== 1) {
                    switch (propName[1]) {
                        case 't':
                            temp += 'top';
                            break;
                        case 'r':
                            temp += 'right';
                            break;
                        case 'b':
                            temp += 'bottom';
                            break;
                        case 'l':
                            temp += 'left';
                            break;
                        default:
                            break;
                    }
                }
            }
            computedStyles[
                shorthandStyleProps[
                    shorthandStylePropsToLowercase.indexOf(temp)
                ]
            ] = propValue;
        }
    }
    return computedStyles;
}

export function computeProps(props, ...others) {
    let computedProps = { ...filterObject(props, ...others) };
    computedProps.style = {
        ...computedProps.style,
        ...computeStyleProps(props),
    };
    return computedProps;
}

export function filterObject(inputProps, ...values) {
    const filterObjective = [
        ...shorthandStylePropsToLowercase,
        ...values,
        'children',
    ];
    return Object.keys(inputProps)
        .filter((key) => !filterObjective.includes(key.toLowerCase()))
        .reduce(
            (res, key) => Object.assign(res, { [key]: inputProps[key] }),
            {}
        );
}

export const shorthandStyleProps = [
    'display',
    'position',
    'minHeight',
    'maxHeight',
    'minWidth',
    'maxWidth',
    'height',
    'width',
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'marginX',
    'marginY',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'paddingX',
    'paddingY',
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
];
export const shorthandStylePropsToLowercase = [
    'display',
    'position',
    'minHeight',
    'maxHeight',
    'minWidth',
    'maxWidth',
    'height',
    'width',
    'margin',
    'margintop',
    'marginright',
    'marginbottom',
    'marginleft',
    'marginx',
    'marginy',
    'padding',
    'paddingtop',
    'paddingright',
    'paddingbottom',
    'paddingleft',
    'paddingx',
    'paddingy',
    'm',
    'mt',
    'mr',
    'mb',
    'ml',
    'mx',
    'my',
    'p',
    'pt',
    'pr',
    'pb',
    'pl',
    'px',
    'py',
];
