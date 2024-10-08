import { Grid } from "@material-ui/core";

export default function Message({ message }) {
  return (
    <Grid>
      <h2>{message}</h2>
    </Grid>
  );
}