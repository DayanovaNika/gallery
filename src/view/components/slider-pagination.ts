export class SliderPagination {

    items;

    pageSize;

    currentPage;

    renderPage;

    container;

    prevButton;

    nextButton;

    counter;

    constructor(
        items,
        pageSize,
        renderPage,
    ) {

        this.items = items;

        this.pageSize = pageSize;

        this.renderPage = renderPage;

        this.currentPage = 0;

        this.container =
            document.createElement("div");

        this.container.className =
            "sliderPagination";

        this.prevButton =
            document.createElement("button");

        this.prevButton.innerHTML = "❮";

        this.nextButton =
            document.createElement("button");

        this.nextButton.innerHTML = "❯";

        this.counter =
            document.createElement("span");

        this.container.append(
            this.prevButton,
            this.counter,
            this.nextButton,
        );

        this.prevButton.onclick =
            () => this.prev();

        this.nextButton.onclick =
            () => this.next();

        
        
        this.update();
    }

    getPageItems() {

        const start =
            this.currentPage *
            this.pageSize;

        return this.items.slice(
            start,
            start + this.pageSize,
        );

    }

    getPagesCount() {

        return Math.ceil(
            this.items.length /
            this.pageSize,
        );

    }

    update() {

        this.renderPage(
            this.getPageItems(),
        );

        this.counter.innerText =
            `${this.currentPage + 1} / ${this.getPagesCount()}`;

        this.prevButton.disabled =
            this.currentPage === 0;

        this.nextButton.disabled =
            this.currentPage ===
            this.getPagesCount() - 1;

    }

    next() {

        if (
            this.currentPage <
            this.getPagesCount() - 1
        ) {

            this.currentPage++;

            this.update();

        }

    }

    prev() {

        if (this.currentPage > 0) {

            this.currentPage--;

            this.update();

        }

    }

    getElement() {

        return this.container;

    }

}