import React from 'react';

const bar = () => {
  return (
    <nav>
        <div class="container-fluid">
            <form action="/archive" method="GET">
                <button class="btn btn-outline-primary" type="submit">アーカイブ</button>
            </form>
        <span class="navbar-toggler-icon"></span>
        </div>
    </nav>
  );
};

export default bar;