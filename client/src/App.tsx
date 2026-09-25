import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import styles from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "./api/cards";

function App() {
  const query = useQuery({queryKey: ["cards"], queryFn: fetchCards })

  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        {query.isLoading ? "Загружаемся" :
        
        <div className={styles.columns}>
          <BoardColumn cards={query.data ?? []}/>
        </div>
        }
      </main>
    </div>
  );
}

export default App;
