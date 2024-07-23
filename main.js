import "./style.css";
import { displayFetchedArticle } from "./displayFetchedArticle.js";

const articlesWrapper = document.querySelector("#articles-wrapper");
fetch("http://localhost:3000/articles/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(function (article) {
      displayFetchedArticle(article, articlesWrapper);
    });
  });

const form = document.querySelector("#new-article-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#new-article-tittle");
  const contentInput = document.querySelector("#new-article-content");
  const title = titleInput.value;
  const content = contentInput.value;
  postNewArticle(title, content);
  console.log(title, content);
});

function postNewArticle(title, content) {
  const dataToSend = {
    title: title,
    content: content,
  };
  fetch("http://localhost:3000/articles/", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// patrzac na blad odpowiednia odpowiedz na stronie
// przyciski delete edit(artykul na formularz)
// style
