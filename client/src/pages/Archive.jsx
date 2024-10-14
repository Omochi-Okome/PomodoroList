import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/UI/Button";
import ItemList from "../components/UI/ItemCard";
import Message from "../components/UI/Message";
import SideMenu from "../components/SideMenu";

export default function Archive() {
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    fetchArchiveList();
  }, []);

  async function fetchArchiveList() {
    try {
      const response = await axios.get("http://localhost:3001/archive");
      setArchiveList(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function returnHome(_id, item) {
    try {
      await axios.post("http://localhost:3001/Archive/returnHome", {
        _id: _id,
        item: item,
      });
      await fetchArchiveList();
    } catch (err) {
      console.error("returnHomeでエラー発生", err);
    }
  }

  async function deleteItem(itemId) {
    try {
      await axios.post("http://localhost:3001/Archive/delete", {
        _id: itemId,
      });
      await fetchArchiveList();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex h-screen mt-10">
      <div className="flex flex-col w-80">
        <SideMenu currentMenu="Archive" />
      </div>
      <div className="flex flex-col items-center bg-slate-100 h-screen">
        <div className="flex flex-row flex-wrap mt-4">
          {archiveList.length === 0 && <Message message="There is no item!" />}
          {archiveList.map((item) => (
            <ItemList itemList={item}>
              <Button
                name="Return"
                handle={() => returnHome(item._id, item.item)}
              />
              <Button name="Delete" handle={() => deleteItem(item._id)} />
            </ItemList>
          ))}
        </div>
      </div>
    </div>
  );
}
