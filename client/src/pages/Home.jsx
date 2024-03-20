import InputList from "../components/InputList";
import ToDoList from "../components/ToDoList";
import TopBar from "../components/TopBar";

const Home = () => {
    return(
        <>
            <TopBar />
            <InputList />
            <ToDoList />
        </>
    )
}

export default Home;