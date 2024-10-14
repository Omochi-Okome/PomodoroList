import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import ItemCard from "../components/UI/ItemCard";
import Message from "../components/UI/Message";
import SideMenu from "../components/SideMenu";

export default function Home() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    fetchTodoList();
    console.log("危険確認");
  }, []);

  async function fetchTodoList() {
    try {
      const response = await axios.get("http://localhost:3001/home");
      setTodoList(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit() {
    if (!inputValue.trim()) return;
    try {
      await axios.post("http://localhost:3001/home/item", { inputValue });
      setInputValue("");
      await fetchTodoList();
    } catch (error) {
      console.error("handleSubmitでエラー発生", error);
    }
  }

  async function deleteItem(itemId, item) {
    try {
      await axios.post("http://localhost:3001/home/delete", { itemId, item });
      await fetchTodoList();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex h-screen mt-10 ">
      <div className="flex flex-col w-80">
        <SideMenu currentMenu="Home" />
      </div>
      <div className="flex flex-col bg-slate-100 items-center h-screen ">
        <div className="mt-3">
          <Input
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
          <Button handle={handleSubmit} name="追加" />
        </div>
        {todoList.length === 0 && <Message message="There is no item!" />}
        <div className="flex flex-row flex-wrap mt-4">
          {todoList.map((item) => (
            <ItemCard itemList={item} deleteItem={deleteItem}>
              <Button name="Start" handle={() => console.log("Start!!")} />
              <Button
                name="Done"
                handle={() => deleteItem(item._id, item.item)}
              />
            </ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
}
