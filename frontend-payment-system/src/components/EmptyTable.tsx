import { Box, Button, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

type EmptyTable = {
    text: string,
    buttonText: string,
    path: string
}

export default function EmptyTable({text, buttonText, path}: EmptyTable){
    return(
        <Box component="div" style={style.container} id="emptyTable">
            <Box sx={style.body}>
                <Typography style={style.text}>{text}</Typography>
                <Link  to={path}>
                    <Button 
                        variant="contained" 
                        sx={style.button}
                    >{buttonText}</Button>
                </Link>
            </Box>  
        </Box>
    )
}

const style = {
    container: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"calc(100vh - 133px)",
        "@media(max-width: 800px)": {
            height:"calc(100vh - 153.5px)"
        }
    },
    body: {
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
    }, 
    text: {
        fontSize: "16px",
        color: "#000000de",
        marginBottom: "24px",
        "text-align": "center"
    },
    button: {
        borderRadius: "24px",
        fontSize: "13px",
        height: "30px",
        width: "140px"
    }
}

export const bodyEmptyTable = {
    display: "flex", 
    flexDirection: "column",
    "@media(max-width: 800px)": {
        "align-items": "center",
        justifyContent: "center"
    }
}