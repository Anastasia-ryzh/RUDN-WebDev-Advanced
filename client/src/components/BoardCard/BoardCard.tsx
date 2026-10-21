import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
};

export function BoardCard({ id, title, isDone }: BoardCardProps) {
  return <div 
  className={isDone ? 
    styles.isDone :
    styles.card
}>
{title}
</div>;
}
