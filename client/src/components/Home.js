// Home.js

import React from "react";

const Home = () => {
  return (
    <>
      <h1>Hello World!</h1>
      <Nava  />
      <InputContent />
    </>
  );
};

const Nava = () => {
  return(
    <div class="container-fluid">
            <form action="/archive" method="GET">
                <button class="btn btn-outline-primary" type="submit">アーカイブ</button>
            </form>
          <span class="navbar-toggler-icon"></span>
    </div>
  )
};

const InputContent = () => {
  return(
    <>
      <div class="container">
        <div class="row text-center pb-4">
            <div class="col-md-8 order-1 ">
                <form action="/item" method="POST">
                    <input type="text" class="form-control" name="ToDoItem" placeholder="ToDoを入力"/>
                </form>
            </div>
            <div class="col-md-2 order-2">
              <button class="btn btn-primary" type="submit">追加</button> 
            </div>
        </div>
      </div>    
    </>
  )
}

export default Home;
