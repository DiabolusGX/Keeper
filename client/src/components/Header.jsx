import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
require("dotenv").config();

const Header = (props) => {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const errorFn = (response) => {
        console.log(response);
    }
    const { signOut } = useGoogleLogout({
        onFailure: errorFn,
        clientId: googleClientId,
        cookiePolicy: "single_host_origin",
        onLogoutSuccess: props.logout
    });

    return (
        <header className="navbar navbar-expand-sm">
            <h1>
                <HighlightIcon />
                Keeper
            </h1>
            <ul className="navbar-nav ml-auto">
                { props.isLoggedIn
                    ? <li className="nav-item">
                        <div className="nav-item my-item">
                            <div className="display-signin">
                                <img src= { props.isLoggedIn.image } className="profile rounded-circle nav-item" alt="profile_pic" />
                                <p className="nav-item"> { props.isLoggedIn.name } </p>
                            </div>
                            <a onClick={signOut} href="/">
                                <img src="logout.png" alt="logout_image" width="30px"/>
                            </a>
                        </div>
                    </li>
                    : <li className="nav-item"> <GoogleLogin
                        clientId={googleClientId}
                        buttonText="Login"
                        onSuccess={props.login}
                        onFailure={errorFn}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    /> </li>
                }
            </ul>

        </header>
    );
}

export default Header;