import {ProductCardComponent} from "../../components/product-card/index.js";
import {ButtonGroupComponent} from "../../components/button-group/index.js";
import {ProductPage} from "../product/index.js";
import {players} from "../../data/players.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.position = "Все"
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    get cardsRoot() {
        return document.getElementById('cards')
    }

    getData() {
        if (this.position === "Все") {
            return players
        }
        return players.filter((item) => item.position === this.position)
    }

    getHTML() {
        return (
            `
                <div id="main-page">
                    <h1>ФК Спартак Москва: основной состав</h1>
                    <div id="cards" class="d-flex flex-wrap gap-3"></div>
                    <p class="credits">Фотографии: Wikimedia Commons, лицензия CC BY-SA 3.0. Авторы: Анна Мейер, Антон Зайцев, Артем Гусев, Вячеслав Евдокимов.</p>
                </div>
            `
        )
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    clickFilter(e) {
        const position = e.target.dataset.position
        if (!position) {
            return
        }

        this.position = position
        document.querySelectorAll('#button-group .btn').forEach((button) => {
            button.classList.toggle('active', button === e.target)
        })
        this.renderCards()
    }

    renderCards() {
        this.cardsRoot.innerHTML = ''
        this.getData().forEach((item) => {
            const productCard = new ProductCardComponent(this.cardsRoot)
            productCard.render(item, this.clickCard.bind(this))
        })
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const positions = ["Все", "Вратарь", "Защитник", "Полузащитник", "Нападающий"]
        const buttonGroup = new ButtonGroupComponent(this.pageRoot)
        buttonGroup.render(positions, this.clickFilter.bind(this))

        this.pageRoot.insertBefore(document.getElementById('button-group'), this.cardsRoot)
        this.renderCards()
    }
}
