import "./style.css";

const articlesWrapper = document.querySelector("#articles-wrapper");
fetch("http://localhost:3000/articles/")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(function (article) {
      // separate file
      const articleContainer = document.createElement("div");
      const titleElement = document.createElement("h2");
      titleElement.innerText = article.title;
      const contentElement = document.createElement("p");
      contentElement.innerText = article.content;
      const editButton = document.createElement("button");
      editButton.innerText = "Edit article";
      editButton.addEventListener("click", function () {
        const editForm = document.createElement("form");
        const editTitleInput = document.createElement("input");
        editTitleInput.value = titleElement.innerText
        const editContentInput = document.createElement("input");
        editContentInput.value = contentElement.innerText
        const sendEditedArticleButton = document.createElement("button");
        editForm.append(editTitleInput);
        editForm.append(editContentInput);
        editForm.append(sendEditedArticleButton);
        articleContainer.replaceWith(editForm);
      });
      articleContainer.append(titleElement);
      articleContainer.append(contentElement);
      articleContainer.append(editButton);
      articlesWrapper.append(articleContainer);
    });
  });

const form = document.querySelector("#new-article-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = document.querySelector("#new-article-tittle");
  const contentInput = document.querySelector("#new-article-content");
  const title = titleInput.value;
  const content = contentInput.value;
  console.log(title, content);
});

// REPo
// PR
// patrzac na blad odpowiednia odpowiedz na stronie
// przyciski delete edit(artykul na formularz)
// style
