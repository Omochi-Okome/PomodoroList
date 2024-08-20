import React, { useState, useEffect } from 'react';
// External File
import './ArchiveList.css';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import ArchiveItem from './ArchiveItem';

const ArchiveList = () => {
  const [archiveList, setArchiveList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchArchiveList(user);
  }, [user]);
    
  const fetchArchiveList = async(user) => {
    try {
      const token = await user.getIdToken();
      const response = await API.get(`${process.env.REACT_APP_API_URL}/archive`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setArchiveList(response.data);
    } catch(err) {
      console.error(err);
    }
  };

  const returnHome = async(_id, item, registerDate, pomodoroCount) => {
    try {
      await API.post(`${process.env.REACT_APP_API_URL}/Archive/returnHome`,{
        userId: user.uid,
        _id: _id,
        returnItem: item,
        registerDate: registerDate,
        pomodoroCount: pomodoroCount,
        credentials: 'include'
      });
      fetchArchiveList(user);
    } catch(err) {
      console.error('returnHomeでエラー発生',err);
    }
  }

  const deleteCard = async(itemId) => {
    try {
      await API.post(`${process.env.REACT_APP_API_URL}/Archive/delete`, {_id: itemId, });
      fetchArchiveList(user);
    } catch(err) {
      console.error(err);
    }
  }

  return(
    <ArchiveItem archiveList={archiveList} returnHome={returnHome} deleteCard={deleteCard}/>
  )
}

export default ArchiveList;