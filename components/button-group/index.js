export class ButtonGroupComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(items) {
        const buttons = items.map((item, index) => (
            `<button type="button" class="btn btn-outline-light${index === 0 ? ' active' : ''}" data-position="${item}">${item}</button>`
        )).join('')

        return (
            `
                <div id="button-group" class="btn-group mb-4" role="group">${buttons}</div>
            `
        )
    }

    addListeners(listener) {
        document
            .getElementById("button-group")
            .addEventListener("click", listener)
    }

    render(items, listener) {
        const html = this.getHTML(items)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}
