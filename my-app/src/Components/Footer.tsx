import React from 'react'
import {Box,Typography} from "@mui/material"

export const Footer:React.FC = ()=>{
    return (
      <>
        <Box
          component="footer"
          sx={{
            backgroundColor: "#272B90",
            p: "1rem 0",
            textAlign: "center",
            borderTop: "1px solid #e0e0e0",
            mt:'auto'
          }}
        >

<Typography variant="body2" color="textSecondary">
        © Tu Track. Established 2025.
      </Typography>

        </Box>
      </>
    );
}