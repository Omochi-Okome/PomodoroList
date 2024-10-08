import { useEffect, useState } from "react";
// External File
import API from "../../api";
import ModalStyle from "./ModalStyle";
// Firebase
import { getAuth } from "firebase/auth";
// MaterialUI
import { Box, CircularProgress, Typography, Button } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Modal(props) {
  const [stopBool, setStopBool] = useState(false);
  const classes = ModalStyle();
  const {
    duration,
    colors = [],
    colorValues = [],
    onComplete,
    selectedId,
  } = props;
  const [timeDuration, setTimeDuration] = useState(duration);
  const [countdownText, setCountdownText] = useState();
  const [countdownPercentage, setCountdownPercentage] = useState(100);
  const [countdownColor, setCountdownColor] = useState("#004082");
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user.getIdToken();

  useEffect(() => {
    let intervalId;
    if (!stopBool && !timerCompleted) {
      intervalId = setInterval(() => {
        setTimeDuration((prev) => {
          const newTimeDuration = prev - 1;
          if (newTimeDuration >= 0) {
            setCountdownPercentage(
              Math.ceil((newTimeDuration / duration) * 100)
            );
            if (newTimeDuration === 0) {
              clearInterval(intervalId);
              if (!timerCompleted) {
                onComplete();
                countUpPomodoroCount();
                setTimerCompleted(true);
              }
            }
          }
          return newTimeDuration;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [stopBool, duration, timerCompleted]);

  useEffect(() => {
    const minutes = Math.floor(timeDuration / 60);
    const seconds = timeDuration % 60;
    setCountdownText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
  }, [timeDuration]);

  useEffect(() => {
    colorValues.forEach((item, i) => {
      if (timeDuration === item) {
        setCountdownColor(colors[i]);
        return;
      }
    });
  }, [timeDuration, colorValues, colors]);

  const countUpPomodoroCount = async () => {
    if (isRequesting || timerCompleted) return;
    try {
      setIsRequesting(true);
      API.post(
        `${process.env.REACT_APP_API_URL}/home/countUpPomodoroCount`,
        {
          selectedId,
          credentials: "include",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsRequesting(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={200}
            thickness={6}
            value={100}
          />
          <CircularProgress
            className={classes.top}
            classes={{ circle: classes.circle }}
            variant="determinate"
            size={200}
            thickness={6}
            value={countdownPercentage}
            style={{
              transform: "scaleX(-1) rotate(-90deg)",
              color: countdownColor,
            }}
          />
        </Box>
        <Typography className={classes.text}>{countdownText}</Typography>
        <Box className={classes.buttonsContainer}>
          <Button variant="outlined" onClick={props.handleCloseClick}>
            <DeleteForeverIcon />
            discard
          </Button>
          <Button variant="contained" onClick={() => setStopBool(true)}>
            <StopCircleIcon />
            stop
          </Button>
          <Button variant="contained" onClick={() => setStopBool(false)}>
            <PlayCircleFilledWhiteIcon />
            reunion
          </Button>
        </Box>
      </Box>
    </>
  );
}
