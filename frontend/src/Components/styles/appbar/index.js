import { IconButton, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import "@fontsource/montez";
import { Colors} from "../theme/index";
import DrawerWidth from "../theme/index";
import { textPopUpTop } from "../../animation";

export const AppbarContainer = styled(Box)(() => ({
  display: "flex",
  marginTop: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "1px 2px",
  backgroundColor: "green"
}));

export const AppbarHeader = styled(Typography)(() => ({
  padding: "2px",
  flexGrow: 1,
  fontSize: "3em",
  fontFamily: '"Montez", "cursive"',
  color: Colors.secondary,
  "&:hover": {
    animation: `${textPopUpTop} 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
  },
}));


export const MyList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  flexGrow: 3,
  justifyContent: "center",
  alignItems: "center",
}));

