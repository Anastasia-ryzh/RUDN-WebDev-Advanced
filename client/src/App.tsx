import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import styles from "./App.module.css";
import type { Card } from "./types/card";

const cards: Card[] = [{
  id: '1',
  title: 'Первая карточка',
  isDone: false
},
{
  id: '2',
  title: 'Вторая карточка',
  isDone: false
},
{
  id: '3',
  title: 'Третья карточка',
  isDone: false
},
{
  id: '4',
  title: 'Четвертая карточка',
  isDone: true
}];

function App() {
  return (
    <div className={styles.app}>
      <BoardHeader />
      <main className={styles.board}>
        <NewCardForm />
        <div className={styles.columns}>
          <BoardColumn cards={cards}/>
        </div>
      </main>
    </div>
  );
}

export default App;
