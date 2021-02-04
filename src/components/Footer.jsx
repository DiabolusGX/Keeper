import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="fixed-bottom">
            <p>Copyright © {currentYear}</p>
        </footer>
    );
}

export default Footer;