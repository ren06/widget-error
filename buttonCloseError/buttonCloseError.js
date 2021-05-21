(function () {
    let template = document.createElement("template");
    template.innerHTML = `
		<style>
		:host {
			display: block;
		} 

        .container {
            max-width: 400px;
            overflow: hidden;
        }

        img {
            width: 100%;
            object-fit: contain;
        }

		</style>
		
		<div class="container">
            <img alt="Button image" title="Button image" src="https://aydenowl.github.io/literate-enigma/image_button/bookmark.png" />
		</div>
	`;

    class Imagebutton extends HTMLElement {
        constructor() {
            super();
            let shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(template.content.cloneNode(true));

            this.$style = shadowRoot.querySelector('style');
            this.$div = shadowRoot.querySelector('div');

            this.addEventListener("click", event => {
                var event = new Event("onClick");
                this.dispatchEvent(event);
            });

            this._props = {};
        }

        render(imageUrl, tooltip) {
            this.$style.innerHTML = ':host {display: block;} .container {max-width: 400px;overflow: hidden;} img {width: 100%;object-fit: contain;}';
            this.$div.innerHTML = '<img alt="Button image" title="' + tooltip + '" src="' + imageUrl + '" />';
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if ("imageUrl" in changedProperties) {
                this.$imageUrl = changedProperties["imageUrl"];
            }

            if ("tooltip" in changedProperties) {
                this.$tooltip = changedProperties["tooltip"];
            }

            this.render(this.$imageUrl, this.$tooltip);
        }
    }

    customElements.define("com-synvance-imagebutton", Imagebutton);
})();