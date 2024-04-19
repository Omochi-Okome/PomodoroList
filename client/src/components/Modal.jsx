import { Box, CircularProgress, makeStyles, Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

const useStylesCountDown = makeStyles(() => ({
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: { color: "#b2b2b2" },
  top: {
    animationDuration: "100ms",
    position: "absolute",
    left: 0
  },
  circle: { strokeLinecap: "round" },
  text: {
    fontWeight: "bold",
    fontSize: "3em",
    marginTop: "1em",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }
}));

const Modal = (props) => {
  const [stopBool, setStopBool] = useState(false);
  const classes = useStylesCountDown();
  const { duration, colors = [], colorValues = [], onComplete, selectedId } = props;

  const [timeDuration, setTimeDuration] = useState(duration);
  const [countdownText, setCountdownText] = useState();
  const [countdownPercentage, setCountdownPercentage] = useState(100);
  const [countdownColor, setCountdownColor] = useState("#004082");

  useEffect(() => {
    let intervalId;
    if (!stopBool) {
      intervalId = setInterval(() => {
        setTimeDuration((prev) => {
          const newTimeDuration = prev - 1;
          if (newTimeDuration >= 0) {
            setCountdownPercentage(Math.ceil((newTimeDuration / duration) * 100));
            if (newTimeDuration === 0) {
              clearInterval(intervalId);
              onComplete();
              countUpPomodoroCount();
            }
          }
          return newTimeDuration;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [stopBool, duration, onComplete, selectedId]);

  useEffect(() => {
    const minutes = Math.floor(timeDuration / 60);
    const seconds = timeDuration % 60;
    setCountdownText(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  }, [timeDuration]);

  useEffect(() => {
    colorValues.forEach((item, i) => {
      if (timeDuration === item) {
        setCountdownColor(colors[i]);
        return;
      }
    });
  }, [timeDuration, colorValues, colors]);

  const countUpPomodoroCount = () => {
    axios.post("http://localhost:3001/countUpPomodoroCount", { selectedId })
      .then(onComplete)
      .catch(console.error);
  }

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
            style={{ transform: "scaleX(-1) rotate(-90deg)", color: countdownColor }}
          />
        </Box>
        <Typography className={classes.text}>{countdownText}</Typography>
        <Box className={classes.buttonsContainer}>
          <Button variant="outlined" onClick={() => props.handleCloseClick()}><DeleteForeverIcon />discard</Button>
          <Button variant="contained" onClick={() => setStopBool(true)}><StopCircleIcon />stop</Button>
          <Button variant="contained" onClick={() => setStopBool(false)}><PlayCircleFilledWhiteIcon />reunion</Button>
        </Box>
      </Box>
    </>
  );
};

export default Modal;
