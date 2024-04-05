import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';

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
                itemDelete: item.itemDelete,
                deadline: item.deadline,
                
              }))
            );
          })
          .catch((error) => {
            console.error("データ取得時のエラー:", error);
          });
      };
    const deleteCard = (itemId) => {
      axios
        .post("http://localhost:3001/Archive/delete", {
          _id: itemId,
        }).then(() => {
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
                <p>There is no archive list</p>
            ) : (
                <Grid container direction="row">
                  {archiveList.map((archiveList) => (
                  <Grid item>
                    <Card key={archiveList.id} variant="outlined" className={classes.card}>
                      <CardContent>
                        <Typography variant="body1">{archiveList.itemDelete}</Typography>
                        <Typography variant="body1">締切:{archiveList.deadline}</Typography>
                        <Button variant="outlined" onClick={()=>deleteCard(archiveList.id)} startIcon={<DeleteIcon />}>削除する</Button>
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