import { Grid } from "@material-ui/core";
// Components
import ItemCard from "./ItemCard";
import Message from "./Message";

export default function ItemList({ itemList, deleteItem }) {
  if (itemList.length === 0) {
    return <Message message="There is no ItemList" />;
  }
  return (
    <Grid container spacing={2}>
      {itemList.map((item) => (
        <ItemCard items={item} deleteItem={deleteItem} />
      ))}
    </Grid>
  );
}
