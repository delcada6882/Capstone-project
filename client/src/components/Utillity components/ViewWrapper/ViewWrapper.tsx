import Divider from 'HTML_components/Divider/Divider';
import './ViewWrapper.scss';

export interface ViewWrapperProps {
    className?: string;
}

function ViewWrapper(props: React.PropsWithChildren<ViewWrapperProps>) {
    return (
        <Divider
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
