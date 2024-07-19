import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "../Modal/Modal";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import ToDoForm from "../ToDoForm/ToDoForm";
import ToDoItem from "../ToDoItem/ToDoItem";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container.start");
  return createPortal(children, target);
};

const ToDoList = () => {
  const initialDate = dayjs();
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const firstPomodoroCount = 0;
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("ログイン中です");
        setUser(user);
        fetchTodoList(user);
      } else {
        console.log("ログインしていません");
        navigate("/auth/login");
      }
    });
    return () => unsubscribe();
  }, [navigate, auth]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStartCountdown = (todoId) => {
    setSelectedTodoId(todoId);
    setModalOpen(true);
  };

  //アイテム読み込み
  const fetchTodoList = async (user) => {
    try {
      const token = await user.getIdToken();
      const response = await API.get(`${process.env.REACT_APP_API_URL}/home`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTodoList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //アイテム追加
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    try {
      const dataToSend = {
        userId: user.uid,
        inputData: inputValue,
        registerDate: initialDate,
        pomodoroCount: firstPomodoroCount,
        credentials: "include",
      };
      await API.post(`${process.env.REACT_APP_API_URL}/home/item`, dataToSend);
      setInputValue("");
      fetchTodoList();
    } catch (error) {
      console.error("handleSubmitでエラー発生", error);
    }
  };

  const deleteItem = async (itemId, item, registerDate, pomodoroCount) => {
    try {
      await API.post(`${process.env.REACT_APP_API_URL}/home/delete`, {
        userId: user.uid,
        itemId: itemId,
        item: item,
        registerDate: registerDate,
        pomodoroCount: pomodoroCount,
        credentials: "include",
      });
      fetchTodoList();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnComplete = () => {
    setModalOpen(false);
  };

  return (
    <div className="container start" onSubmit={handleSubmit}>
      <ToDoForm inputValue={inputValue} handleInputChange={handleInputChange} />
      <ToDoItem
        todoList={todoList}
        handleStartCountdown={handleStartCountdown}
        deleteItem={deleteItem}
      />
      {modalOpen && (
          <ModalPortal>
            <Modal
              handleCloseClick={() => setModalOpen(false)}
              duration={3}
              colors={["#ff9248", "#a20000"]}
              colorValues={[20, 10]}
              onComplete={handleOnComplete}
              selectedId={selectedTodoId}
            />
          </ModalPortal>
      )}
    </div>
  );
};

export default ToDoList;
