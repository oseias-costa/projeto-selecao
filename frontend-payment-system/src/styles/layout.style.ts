export const layoutStyle = {
    header: {
        container: {
            bgcolor: "#424242",
            paddingTop: "11px",
            paddingBottom: "11px",
            paddingLeft: "16px",
            paddingRight: "16px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            top: "0",
            zIndex: 40,
            width: "100%"
        }, 
        account: {
            backgroundColor: "#BDBDBD",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100px"
        },
        logo : {
            color: "#fff",
            fontFamily: "Alata",
            fontWeight: "400",
            fontSize: "34px"
        },
        icon: {
            color: "#fff",
        }
    },
    body : {
        display: "flex",
        height: "calc(100vh - 73px)",
        "@media(max-width: 800px)": {
            width: "100%",
            // flexWrap: "wrap"
          }
    }, 
    menu : {
        container: {
          background: "linear-gradient(180deg, #ffffff26 0%, #ffffff26 100%), #121212",
          boxShadow: "0px 6px 30px 5px #0000001f, 0px 16px 24px 2px #00000024, 0px 8px 10px -5px #00000033",
          width: "320px",
          height: "calc(100vh)",
          position: "fixed",
          paddingTop: "73px",
          "@media(max-width: 800px)": {
            display: "none",
            width: "100%",
            height: "100vh",
            position: "absolute",
            zIndex: "20"
          }
        },
        buttonBox: {
            display: "flex",
            justifyContent: "start",
            paddingLeft: "16px",
            paddingTop: "12px",
            paddingBottom: "12px",
            borderRadius: "0px",
            height: "48px",
            width: "320px",
            ":hover": {
                backgroundColor: "#90caf915"
            }, 
            "@media": {
                width: "100%",
            }
        },
        icon: {
            color: "#ffffff8f",
            marginRight: "32px"
        }
    },
    pageContent: {
        width: "100%",
        paddingTop: "97px",
        paddingLeft: "344px",
        paddingRight: "24px",
        paddingBottom: "24px",
        "@media(max-width: 800px)": {
            paddingLeft: "24px",
        }
    },
    buttonMenu: {
        display: "none",
        "@media(max-width: 800px)": {
            display: "flex",
            marginBottom: "20px",
            width: "100%"
          }
    },
    buttonMenuBottom: {
        display: "none",
        "@media(max-width: 800px)": {
            display: "flex",
            marginBottom: "20px",
            width: "calc(100% - 40px)",
            margin: "20px"
          }
    },
}