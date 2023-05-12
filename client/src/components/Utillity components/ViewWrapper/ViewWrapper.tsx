import Div from 'HTML_components/Div/Div';
import './ViewWrapper.scss';

export interface ViewWrapperProps {
    className?: string;
}

function ViewWrapper(props: React.PropsWithChildren<ViewWrapperProps>) {
    return (
        <Div
            {...props}
            className={
                props.className
                    ? `ViewWrapper ${props.className}`
                    : 'ViewWrapper'
            }
        />
    );
}

export default ViewWrapper;
