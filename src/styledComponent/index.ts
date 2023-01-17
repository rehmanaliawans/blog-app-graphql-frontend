import { Box, Card, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

export const ForgotRootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100vh"
}));

export const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
  [theme.breakpoints.down("md")]: {
    display: "none"
  }
}));

export const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0)
}));

export const ChatPaper = styled(Paper)(({ theme }) => ({
  height: "30rem",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  position: "relative"
}));

export const ChatOpenBox = styled(Box)(({ theme }) => ({
  height: "27rem",
  width: "100%",
  overflowY: "scroll",
  overflowX: "hidden"
}));

export const ChatOpenTextBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "absolute",
  bottom: "5px"
}));

export const UserOpenBox = styled(Box)(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflowY: "scroll",
  overflowX: "hidden"
}));
export const ChatBoxPaper = styled(Paper)(({ theme }) => ({
  width: "22rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px"
}));
export const ChatBox = styled(Box)(() => ({
  position: "fixed",
  bottom: "0",
  right: "10px",
  margin: "0",
  padding: "0"
}));
