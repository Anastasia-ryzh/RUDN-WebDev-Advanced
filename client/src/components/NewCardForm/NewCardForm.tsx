import { useState } from "react";
import styles from "./NewCardForm.module.css";
import { useMutation } from "@tanstack/react-query";

export function NewCardForm() {
const [inputText, setInputText] = useState('');

const mutation = useMutation({ mutationFn: createCard })

  return (
    <div className={styles.form}>
      <input 
      className={styles.input} 
      placeholder="Название карточки" 
      value={inputText}
      onChange={(event) => setInputText(event.target.value)} 
      />
      <button className={styles.button} type="button">
        Добавить
      </button>
    </div>
  );
}
