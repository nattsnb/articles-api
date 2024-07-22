export function displayFetchedArticle(article,articlesWrapper){
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
}