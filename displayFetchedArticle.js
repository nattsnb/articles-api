export function displayFetchedArticle(article, articlesWrapper) {
  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container");
  const titleElement = document.createElement("h2");
  const id = article.id;
  titleElement.innerText = article.title;
  const contentElement = document.createElement("p");
  contentElement.innerText = article.content;
  const editButton = document.createElement("button");
  editButton.innerText = "Edit article";
  initializeEditButton(
    editButton,
    titleElement,
    contentElement,
    articleContainer,
    id,
  );
  const deleteEditedArticleButton = document.createElement("button");
  deleteEditedArticleButton.innerText = "Delete article";
  initializeDeleteButton(deleteEditedArticleButton, articleContainer, id);
  articleContainer.append(titleElement);
  articleContainer.append(contentElement);
  articleContainer.append(editButton);
  articleContainer.append(deleteEditedArticleButton);
  articlesWrapper.append(articleContainer);
}

function initializeEditButton(
  editButton,
  titleElement,
  contentElement,
  articleContainer,
  id,
) {
  editButton.addEventListener("click", function () {
    const editForm = document.createElement("form");
    const editTitleInput = document.createElement("input");
    editTitleInput.value = titleElement.innerText;
    const editContentInput = document.createElement("input");
    editContentInput.value = contentElement.innerText;
    const sendEditedArticleButton = document.createElement("button");
    sendEditedArticleButton.innerText = "Save edit";
    const errorMessageEdit = document.createElement("p");
    editForm.append(editTitleInput);
    editForm.append(editContentInput);
    editForm.append(sendEditedArticleButton);
    editForm.append(errorMessageEdit);
    articleContainer.replaceWith(editForm);
    initializeSavingEditedArticle(
      editForm,
      id,
      editTitleInput,
      editContentInput,
      errorMessageEdit,
    );
  });
}

function initializeDeleteButton(deleteButton, articleContainer, id) {
  deleteButton.addEventListener("click", function () {
    fetch(`http://localhost:3000/articles/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.status === 200) {
        articleContainer.remove();
      }
    });
  });
}

function postEditedArticle(id, title, content, errorMessageEdit) {
  const dataToSend = {
    id: id,
    title: title.value,
    content: content.value,
  };
  console.log(dataToSend);
  fetch(`http://localhost:3000/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 400) {
      errorMessageEdit.innerText = "Error, provide data.";
    } else if (response.status === 200) {
      errorMessageEdit.innerText = "Article published.";
    }
  });
}

function initializeSavingEditedArticle(
  editForm,
  id,
  title,
  content,
  errorMessageEdit,
) {
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    postEditedArticle(id, title, content, errorMessageEdit);
    console.log(title, content);
  });
}
