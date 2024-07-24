import "./style.css";
import { displayFetchedArticle } from "./displayFetchedArticle.js";

const articlesWrapper = document.querySelector("#articles-wrapper");
const form = document.querySelector("#new-article-form");
fetchArticles();
initializeEventListenerToNewArticleForm();

function fetchArticles() {
  fetch("http://localhost:3000/articles/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(function (article) {
        displayFetchedArticle(article, articlesWrapper);
      });
    });
}
function initializeEventListenerToNewArticleForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = document.querySelector("#new-article-tittle");
    const contentInput = document.querySelector("#new-article-content");
    const errorMessage = document.querySelector("#error-message");
    postNewArticle(titleInput, contentInput, errorMessage);
  });
}

function postNewArticle(titleInput, contentInput, errorMessage) {
  const dataToSend = {
    title: titleInput.value,
    content: contentInput.value,
  };
  fetch("http://localhost:3000/articles/", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 400) {
      errorMessage.innerText = "Error, provide data."
    } else if (response.status === 409) {
      errorMessage.innerText = "Error, article already exists."
    } else if (response.status === 404) {
      errorMessage.innerText = "Error, server doesn't exist."
    } else if (response.status === 201) {
      errorMessage.innerText = "Article published."
      clearArticlesWrapper()
      fetchArticles()
      titleInput.value = ""
      contentInput.value = ""
    }
  });
}

function clearArticlesWrapper() {
  const articlesToClear = document.querySelectorAll(".article-container")
  articlesToClear.forEach(function (article){
    article.remove()
  })
}

// patrzac na blad odpowiednia odpowiedz na stronie
// przyciski delete edit(artykul na formularz)
// style
