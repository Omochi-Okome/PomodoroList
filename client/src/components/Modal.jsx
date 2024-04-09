import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
  Button
} from "@material-ui/core";
import { useEffect, useState,  } from "react";


const useStylesCountDown = makeStyles(() => ({
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  root: {
    position: "relative"
  },
  bottom: {
    color: "#b2b2b2"
  },
  top: {
    animationDuration: "100ms",
    position: "absolute",
    left: 0
  },
  circle: {
    strokeLinecap: "round"
  },
  text: {
    fontWeight: "bold",
    fontSize: "5em",
    marginTop: "1em"
  }
}));

const Modal = (props) => {
  const classes = useStylesCountDown();
  const { duration, colors = [], colorValues = [], onComplete } = props;

  const [timeDuration, setTimeDuration] = useState(duration);
  const [countdownText, setCountdownText] = useState();
  const [countdownPercentage, setCountdownPercentage] = useState(100);
  const [countdownColor, setCountdownColor] = useState("#004082");

  const handleCloseModal = () => {
    props.handleCloseClick()
  }

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTimeDuration((prev) => {
        const newTimeDuration = prev - 1;
        const percentage = Math.ceil((newTimeDuration / timeDuration) * 100);
        setCountdownPercentage(percentage);

        if (newTimeDuration === 0) {
          clearInterval(intervalId);
          intervalId = null;
          onComplete();
        }

        return newTimeDuration;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      intervalId = null;
    };
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeDuration / 60);
    const seconds = timeDuration % 60;
    setCountdownText(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  }, [timeDuration]);

  useEffect(() => {
    for (let i = 0; i < colorValues.length; i++) {
      const item = colorValues[i];
      if (timeDuration === item) {
        setCountdownColor(colors[i]);
        break;
      }
    }
  }, [timeDuration]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={200}
            thickness={4}
            value={100}
          />
          <CircularProgress
            className={classes.top}
            classes={{
              circle: classes.circle
            }}
            variant="determinate"
            size={200}
            thickness={8}
            value={countdownPercentage}
            style={{
              transform: "scaleX(-1) rotate(-90deg)",
              color: countdownColor
            }}
          />
        </Box>
        
        <Typography className={classes.text}>{countdownText}</Typography>
        <Button onClick={() => handleCloseModal()}>discard</Button>
        <Button>Stop</Button>
      </Box>
    </>
  );
};

export default Modal;
