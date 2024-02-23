"use strict";
document.addEventListener("DOMContentLoaded", (event) => {
    const dynamicForm = document.getElementById("dynamic-form");
    console.log(dynamicForm);
    const button = dynamicForm.querySelector("#add-button");
    const template = dynamicForm.querySelector("template");
    const templateTarget = dynamicForm.querySelector(template.dataset.target);
    button.addEventListener("click", event => {
        const fragment = template.content.cloneNode(true);
        const deleteButton = fragment.querySelector(".delete-button");
        deleteButton.addEventListener("click", event => {
            const row = event.currentTarget.closest(".dynamic-row");
            row.remove();
        });
        // Replace __index__ here with the index
        // Some state is probably needed to keep track of rows
        templateTarget.appendChild(fragment);
    });
});
class InputTest extends HTMLElement {
    constructor() {
        super();
        const html = '<input placeholder="Custom input">';
        this.innerHTML = html;
    }
    connectedCallback() {
        console.log("Custom element connected");
    }
}
if (!customElements.get("pk-input-test")) {
    customElements.define("pk-input-test", InputTest);
}