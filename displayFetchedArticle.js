export function displayFetchedArticle(article, articlesWrapper) {
  const articleContainer = document.createElement("div");
  const titleElement = document.createElement("h2");
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
  });
}

function initializeDeleteButton(deleteButton, articleContainer) {
  deleteButton.addEventListener("click", function () {
    articleContainer.remove();
  });
}
