import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ItemCard({ items, deleteItem }) {
  return (
    <Grid>
      <Card variant="outlined" className="card">
        <CardContent>
          <Typography variant="body1">{items.item}</Typography>
          <Button
            variant="outlined"
            onClick={() => console.log("Start button clicked")}
          >
            <PlayCircleOutlineIcon />
            Start
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              deleteItem(
                items._id,
                items.item,
                items.registerDate,
                items.pomodoroCount
              )
            }
          >
            <CheckCircleIcon />
            Done
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
