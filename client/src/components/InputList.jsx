import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";
import axios from "axios";

const InputList = ({updateList}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        const dataToSend = { inputData: inputValue };
        const response = await axios.post("http://localhost:3001/item", dataToSend);
        setInputValue("")
        updateList(response.data)
    } catch (error) {
        console.error("データの送信時にエラーが発生しました:", error);
    }
  };
  

  return (
    <div>
      <TextField
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        type="button"
        onClick={handleSubmit}
      >
        追加する
      </Button>
    </div>
  );
};

export default InputList;
