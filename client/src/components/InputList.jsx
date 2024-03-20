import React, { useState } from "react";
import axios from "axios";

const InputList = ({updateList}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        console.log("送信するデータ:", inputValue);
        const dataToSend = { inputData: inputValue };
        const response = await axios.post("http://localhost:3001/item", dataToSend);
        setInputValue("")
        console.log("バックエンドからのレスポンス:", response.data);
        updateList(response.data)
    } catch (error) {
        console.error("データの送信時にエラーが発生しました:", error);
    }
  };
  

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleSubmit}
      >
        追加する
      </button>
    </div>
  );
};

export default InputList;
