export function displayFetchedArticle(article, articlesWrapper) {
  const articleContainer = document.createElement("div");
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
      id
  );
  const deleteEditedArticleButton = document.createElement("button");
  deleteEditedArticleButton.innerText = "Delete article";
  initializeDeleteButton(deleteEditedArticleButton, articleContainer);
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
  id
) {
  editButton.addEventListener("click", function () {
    const editForm = document.createElement("form");
    const editTitleInput = document.createElement("input");
    editTitleInput.value = titleElement.innerText;
    const editContentInput = document.createElement("input");
    editContentInput.value = contentElement.innerText;
    const sendEditedArticleButton = document.createElement("button");
    sendEditedArticleButton.innerText = "Save edit";
    editForm.append(editTitleInput);
    editForm.append(editContentInput);
    editForm.append(sendEditedArticleButton);
    articleContainer.replaceWith(editForm);
    initializeSaveEditButton(editForm, id, editTitleInput, editContentInput);
  });
}

function initializeDeleteButton(deleteButton, articleContainer) {
  deleteButton.addEventListener("click", function () {
    articleContainer.remove();
  });
}

function postEditedArticle(id, title, content) {
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
  });
}

function initializeSaveEditButton(editForm, id, title, content) {
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    postEditedArticle(id, title, content);
    console.log(title, content);
  });
}
