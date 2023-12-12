import TodoList from "../TodoList/TodoList"
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Todo List</h1>
      <TodoList />
    </div>
  )
}

export default App