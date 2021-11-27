import React, { useEffect } from "react";
import styles from "../styles/chat.module.css";
import Avatar from "./Avatar";

const getFormattedDate = (date) => {
  let formattedDate;
  const today = new Date();
  if (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  ) {
    if (date.getMinutes() < 10) {
      formattedDate = date.getHours() + ":" + "0" + date.getMinutes();
    } else {
      formattedDate = date.getHours() + ":" + date.getMinutes();
    }
  } else {
    formattedDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  return formattedDate;
};

function Message({ message, searchTerm }) {
  const { who, what, when } = message;
  let FilterTerm = what;

  if (
    searchTerm.length > 0 &&
    what.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    const splitTerms = what.split(searchTerm);
    FilterTerm = (
      <>
        {splitTerms.map((term, index) => {
          return (
            <React.Fragment key={index}>
              {term}
              {index !== splitTerms.length - 1 && (
                <span className="bg-gray-900 border-2 rounded border-gray-600">{searchTerm}</span>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <div className={styles.message}>
      <Avatar name={who} />
      <div className={styles.message__info}>
        <h4>
          {who}{" "}
          <span className={styles.message__timestamp}>
            {getFormattedDate(new Date(when))}
          </span>
          {"\t\t"}
        </h4>
        {searchTerm.length > 0 ? <p>{FilterTerm}</p> : <p>{what}</p>}
        {/* <p>{what}</p> */}
      </div>
    </div>
  );
}

export default Message;
