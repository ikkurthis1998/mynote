

const Logo = ({logoSize, name}) => {

    const logoOpening = "<";
    const logoClosing = "/>";
    // const logoSize = fontSize;
    // console.log(logoSize);

    return(
        <span style={{fontFamily: "'Shadows Into Light', cursive", fontSize: logoSize}}>
            {logoOpening}{name ? name + "'s" : "My"}Note {logoClosing}
        </span>
    )
}

export default Logo;