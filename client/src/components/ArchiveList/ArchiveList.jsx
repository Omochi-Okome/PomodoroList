import React, { useState, useEffect } from 'react';
import API from '../../api';
import ArchiveItem from '../ArchiveItem/ArchiveItem';
import  { getAuth } from 'firebase/auth';
import './ArchiveList.css';

const ArchiveList = () => {
  const [archiveList, setArchiveList] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchArchiveList();
  }, []);
    
  const fetchArchiveList = async(user) => {
    const token = await user.getIdToken();
    try {
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

export default ArchiveList