import { Box } from "@mui/material";

export default function FormContainer({children}: {children: React.ReactNode}){
    return(
        <Box sx={{
            width: "100%",
            height: "calc(100vh - 133px)",
            display: "flex",
            flexDirection: "column",
            paddingTop: "32px",
            paddingBottom: "24px",
            justifyContent: "space-between",
                "@media(max-width: 800px)": {
                    height: "calc(100vh - 189.5px)"
                }
        }}>
            {children}
        </Box>
    )
}