

const Logo = ({logoSize}) => {

    const logoOpening = "<";
    const logoClosing = "/>";
    // const logoSize = fontSize;
    // console.log(logoSize);

    return(
        <span style={{fontFamily: "'Shadows Into Light', cursive", fontSize: logoSize}}>
            {logoOpening}MyNote {logoClosing}
        </span>
    )
}

export default Logo;