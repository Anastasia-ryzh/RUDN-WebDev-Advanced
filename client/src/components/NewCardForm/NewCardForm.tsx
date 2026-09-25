import { useState } from "react";
import styles from "./NewCardForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../../api/cards";

export function NewCardForm() {
  const [inputText, setInputText] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      setInputText('');
    },
  });

  function handleAddClick() {
    if (!inputText.trim()) return;
    mutation.mutate(inputText);
  }

  return (
    <div className={styles.form}>
      <input
      className={styles.input}
      placeholder="Название карточки"
      value={inputText}
      onChange={(event) => setInputText(event.target.value)}
      />
      <button className={styles.button} type="button" onClick={handleAddClick}>
        Добавить
      </button>
    </div>
  );
}