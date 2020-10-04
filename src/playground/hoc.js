import React from 'react';
import ReactDOM from 'react-dom';

// HOC higher order component - a component that renders another component

// note jsx function uses () while regular function uses {} outer brackets
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Some info text: {props.info}</p>
    </div>
);

// note component names start with upper case
const withAdminWarning = (WrappedComponent) => {
    // return the higher order component
    // note passing props onto wrapped component
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information....</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}
// note component names start with upper case
const requireAuthentication = (WrappedComponent) => {
    // return the higher order component
    // note passing props onto wrapped component
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Please logon to view info</p>}
        </div>
    )
}

//const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="Here are the details"/>, document.getElementById("app"));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Here are the details"/>, document.getElementById("app"));