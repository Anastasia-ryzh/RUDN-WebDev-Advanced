import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../../api/cards";
import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
};

export function BoardCard({ id, title, isDone }: BoardCardProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
  });

  const handleDelete = () => {
    if (window.confirm("Удалить карточку?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={isDone ? styles.isDone : styles.card}>
      {title}
      <button className={styles.deleteBtn} onClick={handleDelete}>×</button>
    </div>
  );
}
