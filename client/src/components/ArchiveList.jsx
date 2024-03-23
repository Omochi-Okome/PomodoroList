import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
              }))
            );
          })
          .catch((error) => {
            console.error("データ取得時のエラー:", error);
          });
      };

    return(
        <div>
            {archiveList.length === 0 ? (
                <p>アーカイブリストはありません</p>
            ) : (
                <Grid container>
                    {console.log({ArchiveList})}
                  {archiveList.map((archiveList) => (
                    <Card key={archiveList._id} variant="outlined" className={classes.card}>
                      <CardContent>
                        <Typography variant="body1">{archiveList.itemDelete}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Grid>
              )}
        </div>
    )
}

export default ArchiveList