import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
}

const Header = () => {
    return (
        <header>
            <h1>
                <HighlightIcon />
                Keeper
            </h1>
            <div><GoogleLogin
                clientId= "927001483726-5vuuseba1irmvncv1a7g6io7baje9ic1.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /></div>
        </header>
    );
}

export default Header;