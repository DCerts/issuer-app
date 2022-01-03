import React from 'react';
import { FallbackProps } from 'react-error-boundary';


const ErrorComponent = (props: FallbackProps) => {
    return (
        <>
            <h1>Whoops!</h1>
            <p>Message: {props.error.message}</p>
            <button onClick={props.resetErrorBoundary}>Back</button>
        </>
    );
};

export default ErrorComponent;