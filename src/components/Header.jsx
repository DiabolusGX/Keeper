import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
require("dotenv").config();

const Header = () => {

    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    console.log(googleClientId);
    const [isLoggedIn, setLoggedIn] = React.useState(null);
    const login = (response) => {
        setLoggedIn({
            name: response.profileObj.name,
            image: response.profileObj.imageUrl
        });
    }
    const logout = () => {
        setLoggedIn(null);
    }
    const errorFn = (response) => {
        console.log(response);
    }

    return (
        <header className="navbar navbar-expand-sm">
            <h1>
                <HighlightIcon />
                Keeper
            </h1>
            <ul className="navbar-nav ml-auto">
                { isLoggedIn
                    ? <li className="nav-item">
                        <div className="nav-item">
                            <img src= { isLoggedIn.image } className="profile rounded-circle nav-item" alt="profile_pic" />
                            <p className="nav-item"> { isLoggedIn.name } </p>
                            <GoogleLogout
                                clientId={googleClientId}
                                buttonText="Logout"
                                cookiePolicy={'single_host_origin'}
                                onFailure={errorFn}
                                onLogoutSuccess={logout} >
                            </GoogleLogout>
                        </div>
                    </li>
                    : <li className="nav-item"> <GoogleLogin
                        clientId={googleClientId}
                        buttonText="Login"
                        onSuccess={login}
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