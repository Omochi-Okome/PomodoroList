import React from 'react';

const Input = () => {
    return(
        <div class="container">
            <div class="row text-center pb-4">
                <div class="col-md-8 order-1 ">
                    <form action="/item" method="POST">
                        <input type="text" class="form-control" name="ToDoItem" placeholder="ToDoを入力" />
                    </form>
                </div>
                <div class="col-md-2 order-2">
                    <button class="btn btn-primary" type="submit">追加</button>    
                </div>
            </div>
        </div>
    )
}

export default Input;