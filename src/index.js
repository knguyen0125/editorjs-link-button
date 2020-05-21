import css from "./index.css";
import ToolboxIcon from "./icon.svg";

export default class LinkButton {
  static get toolbox() {
    return {
      title: "Link Button",
      icon: ToolboxIcon,
    };
  }

  constructor({ data, api, config }) {
    this.data = {
      url: data.url || "",
      title: data.title || "",
    };

    this.wrapper = undefined;
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("link-button");

    if (this.data && this.data.url) {
      this._createButton(this.data.title, this.data.url);
      return this.wrapper;
    }

    this._editButton();
    return this.wrapper;
  }

  _createButton(title, url) {
    const button = document.createElement("button");
    button.setAttribute("data-url", url);
    button.innerText = title;
    button.onclick = () => this._editButton(title, url);

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(button);
  }

  _editButton(title, url) {
    this.wrapper.innerHTML = "";

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.value = title || null;
    titleInput.placeholder = "Title for button...";

    const urlInput = document.createElement("input");
    urlInput.value = url || null;
    urlInput.placeholder = "URL for button...";

    const createButton = document.createElement("button");
    createButton.innerText = "Save";
    createButton.classList.add("link-button--save");
    createButton.onclick = () =>
      this._createButton(titleInput.value, urlInput.value);

    form.appendChild(titleInput);
    form.appendChild(urlInput);
    form.appendChild(createButton);

    this.wrapper.appendChild(form);
  }

  save(blockContent) {
    const button = blockContent.querySelector("button");

    return Object.assign(this.data, {
      url: button.getAttribute("data-url"),
      title: button.innerText,
    });
  }

  /**
   * Skip empty blocks
   * @see {@link https://editorjs.io/saved-data-validation}
   * @param {ImageToolConfig} savedData
   * @return {boolean}
   */
  validate(savedData) {
    if (!savedData.url.trim()) {
      return false;
    }

    return true;
  }
}
