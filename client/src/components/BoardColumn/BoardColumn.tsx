import type { Card } from "../../types/card";
import { BoardCard } from "../BoardCard/BoardCard";
import styles from "./BoardColumn.module.css";
import { useBoardFiltersStore } from "../../store/boardFiltersStore";

type Props = {
  cards: Card[];
}

export function BoardColumn(props: Props) {
  const hideDone = useBoardFiltersStore((state) => state.hideDone);

  const visibleCards = hideDone
    ? props.cards.filter((card) => !card.isDone)
    : props.cards;

  return (
    <section className={styles.column}>
      <h2 className={styles.title}>К выполнению</h2>
      <div className={styles.cards}>
        {visibleCards.map(card =>
         <BoardCard
          title={card.title}
          isDone={card.isDone}
          />)}
      </div>
    </section>
  );
}