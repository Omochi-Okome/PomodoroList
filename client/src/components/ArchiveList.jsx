import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const useStyles = makeStyles({
  card: {
    width: 300,
    margin: "20px auto",
    textAlign: "center",
  },
});

const ArchiveList = () => {
  const [archiveList, setArchiveList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchArchiveList();
  }, []);
    
  const fetchArchiveList = () => {
    axios
      .get("http://localhost:3001/Archive")
      .then((response) => {
        setArchiveList(
          response.data.map((item) => ({
            id: item._id.toString(),
            ArchiveItem: item.ArchiveItem,
            registerDate: item.registerDate,
            pomodoroCount: item.pomodoroCount
          }))
        );
      })
      .catch((error) => {
        console.error("データ取得時のエラー:", error);
      });
  };

  const returnHome = (id, archiveItem, registerDate, pomodoroCount) => {
    axios
      .post("http://localhost:3001/Archive/returnHome",{
        id: id,
        returnItem: archiveItem,
        registerDate: registerDate,
        pomodoroCount: pomodoroCount
      })
      .then(() => {
        fetchArchiveList();
      })
      .catch((err) => console.log(err))
  }

  const deleteCard = (itemId) => {
    axios
      .post("http://localhost:3001/Archive/delete", {
        _id: itemId,
      })
      .then(() => {
        console.log("削除成功");
        fetchArchiveList();
      })
      .catch((err) => {
        console.log("削除時のエラー：",err)
      })
  }

  return(
    <div>
      {archiveList.length === 0 ? (
          <h2>There is no archive list</h2>
      ) : (
        <Grid container direction="row">
            {archiveList.map((archiveList) => (
          <Grid item>
            <Card key={archiveList.id} variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="body1">{archiveList.ArchiveItem}</Typography>
                <Button variant="outlined" color="primary" onClick={() => returnHome(archiveList.id, archiveList.ArchiveItem, archiveList.registerDate, archiveList.pomodoroCount)} startIcon={<KeyboardReturnIcon/>}>Return</Button>
                <Button variant="contained" color="error" onClick={()=> deleteCard(archiveList.id)} startIcon={<DeleteIcon />}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default ArchiveList