import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const AvatarIcon = styled(Avatar)(({ index }: { index: number }) => ({
  backgroundColor: index % 2 === 0 ? "#5c7c8b" : "#029489",
  width: "35px",
  height: "35px",
  marginTop: "10px"
}));
const DateTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "12px",
  color: theme.palette.grey[500],
  position: "relative"
}));
const MessageBox = ({ side, text, time }: { side: string; text: string; time: string }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [text]);

  return (
    <Grid container wrap="nowrap" spacing={1} pl={1} pr={1} ref={messagesEndRef}>
      {side === "left" && (
        <Grid item>
          <AvatarIcon index={1}>Y</AvatarIcon>
        </Grid>
      )}
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Box
          display="flex"
          justifyContent={side === "right" ? "flex-end" : "space-between"}
          alignItems="center"
        >
          <Box sx={{ marginRight: "10px", width: "fit-content", maxWidth: "15rem" }}>
            <DateTypography variant="body1" textAlign={side === "right" ? "right" : "left"}>
              {time}
            </DateTypography>
            <Typography
              variant="body1"
              textAlign={side === "right" ? "right" : "left"}
              sx={{
                lineBreak: "anywhere",
                backgroundColor: `${side === "left" ? "#ECECEC" : "#579FFB"}`,
                color: `${side === "left" ? "#000" : "#fff"}`,
                borderRadius: "5px",
                padding: "10px"
              }}
            >
              {text}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MessageBox;
