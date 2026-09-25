import type { Card } from "../../types/card";
import { BoardCard } from "../BoardCard/BoardCard";
import styles from "./BoardColumn.module.css";

type Props = {
  cards: Card[];
}

export function BoardColumn(props: Props) {
  return (
    <section className={styles.column}>
      <h2 className={styles.title}>К выполнению</h2>
      <div className={styles.cards}>
        {props.cards.map(card =>
         <BoardCard
          title={card.title} 
          isDone={card.isDone}
          />)}
      </div>
    </section>
  );
}
