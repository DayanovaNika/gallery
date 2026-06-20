import { Model } from "../model/model";
import { View } from "../view/view";

export class Controller {
  model = new Model();
  view;

  constructor() {
    this.init();
  }

  async init() {
    this.view = new View(await this.model.genresList);

    this.setFormListener();
    this.setListListener();
  }

  setFormListener() {
    this.view.headerView.form.addEventListener(
      "submit",
      (event) => this.formSubmit(event),
    );
  }

  async formSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.view.mainView.showLoader();

    const formValue = new FormData(
      this.view.headerView.form,
    ).get("search");

    const response = await this.model.getData({
      version: "1.4",
      chapter: "movie",
      path: "search",
      params: {
        page: 1,
        limit: 12,
        query: formValue,
      },
    });

    this.model.setData(response);
    this.model.sortRating(this.model.dataFromServer);

    this.view.mainView.createImageList(
      this.model.dataFromServer,
    );

    this.view.mainView.removeLoader();
  }

  async showPrewiew(event) {
    const card = event.target.closest("[data-id]");
    const id = card?.getAttribute("data-id");

    if (!id) {
      return;
    }

    this.view.mainView.showLoader();

    const response = await this.model.getData({
      version: "1.4",
      chapter: "movie",
      path: id,
    });

    this.view.mainView.removeLoader();

    this.model.setData(response);

    console.log("MOVIE:");
    console.log(this.model.dataFromServer);

    this.view.mainView.makePrewiew(
      this.model.dataFromServer,
    );
  }

  async showPersonPreview(event) {
    const card = event.target.closest(
      "[data-actor-id]",
    );

    const id =
      card?.getAttribute("data-actor-id");

    if (!id) {
      return;
    }

    this.view.mainView.showLoader();

    const response = await this.model.getData({
      version: "1.4",
      chapter: "person",
      path: id,
    });

    this.view.mainView.removeLoader();

    this.model.setData(response);

    console.log("PERSON:");
    console.log(this.model.dataFromServer);

    this.view.mainView.makePersonPreview(
      this.model.dataFromServer,
    );
  }

  setListListener() {
    this.view.appContainer.addEventListener(
      "click",
      async (event) => {
        // жанры
        if (event.target.closest("[data-value]")) {
          const btnValue =
            this.view.headerView.getBtnValue(
              event,
            ) as string;

          this.view.mainView.showLoader();

          const responseData =
            await this.model.getData({
              version: "1.4",
              chapter: "movie",
              path: "",
              params: {
                "genres.name": btnValue,
                limit: 12,
              },
            });

          this.model.setData(responseData);

          this.model.sortRating(
            this.model.dataFromServer,
          );

          this.view.mainView.createImageList(
            this.model.dataFromServer,
          );

          this.view.mainView.removeLoader();

          this.view.headerView.toggleClasses();

          return;
        }

        // бургер
        if (event.target.closest("#burger")) {
          this.view.headerView.toggleClasses();

          return;
        }

        // актеры
        if (
          event.target.closest(
            "[data-actor-id]",
          )
        ) {
          this.view.mainView.removeList();

          await this.showPersonPreview(
            event,
          );

          return;
        }

        // фильмы
        if (event.target.closest("[data-id]")) {
          const isFromSlider =
            event.target.closest(
              "[data-slider-films]",
            );

          if (!isFromSlider) {
            this.view.mainView.removeList();
          }

          await this.showPrewiew(event);

          return;
        }
      },
    );
  }
}

// import { Model } from "../model/model";
// import { View } from "../view/view";

// export class Controller {
//   model = new Model();
//   view;

//   constructor() {
//     this.init();
//   }

//   async init() {
//     this.view = new View(await this.model.genresList);
//     this.setFormListener();
//     this.setListListener();
//   }

//   setFormListener() {
//     this.view.headerView.form.addEventListener("submit", (event) =>
//       this.formSubmit(event),
//     );
//   }

//   async formSubmit(event: SubmitEvent) {
//     event.preventDefault();
//     this.view.mainView.showLoader();
//     const formValue = new FormData(this.view.headerView.form).get("search");
//     console.log(formValue);

//     const response = await this.model.getData({
//       version: "1.4",
//       chapter: "movie",
//       path: "search",
//       params: {
//         page: 1,
//         limit: 12,
//         query: formValue,
//       },
//     });
//     this.model.setData(response);
//     this.model.sortRating(this.model.dataFromServer);
//     this.view.mainView.createImageList(this.model.dataFromServer);
//     this.view.mainView.removeLoader();
//   }

//   async showPrewiew(event) {
//     const isCard = event.target.closest("[data-id]");
//     const isId = isCard ? isCard.getAttribute("data-id") : null;
//     this.view.mainView.showLoader();

//     const response = await this.model.getData({
//       version: "1.4",
//       chapter: "movie",
//       path: isId,
//     });

//     this.view.mainView.removeLoader();
//     this.model.setData(response);
//     console.log(this.model.dataFromServer);
    
//     this.view.mainView.makePrewiew(this.model.dataFromServer);
//   }

//   setListListener() {
//     this.view.appContainer.addEventListener("click", async (event) => {
//       if (event.target.closest("[data-value]")) {
//         const btnValue = this.view.headerView.getBtnValue(event) as string;
//         this.view.mainView.showLoader();

//         const responseData = await this.model.getData({
//           version: "1.4",
//           chapter: "movie",
//           path: "",
//           params: {
//             "genres.name": `${btnValue}`,
//             limit: 12,
//           },
//         });

//         this.model.setData(responseData);
//         this.model.sortRating(this.model.dataFromServer);
//         this.view.mainView.createImageList(this.model.dataFromServer);
//         this.view.mainView.removeLoader();
//         this.view.headerView.toggleClasses();
//       }

//       if (event.target.closest("#burger")) {
//         this.view.headerView.toggleClasses();
//       }

//       if (event.target.closest("[data-id]")) {
//         const isFromSlider = event.target.closest("[data-slider-films]");

//         if (!isFromSlider) {
//           this.view.mainView.removeList();
//         }

//         await this.showPrewiew(event);
//       }

//       if (event.target.closest("[data-actor-id]")) {
//         await this.showPersonPreview(event);
//       }
//     });
//   }
  
//   async showPersonPreview(event) {
//     const card = event.target.closest("[data-actor-id]");
//     const id = card?.getAttribute("data-actor-id");

//     this.view.mainView.showLoader();

//     const response = await this.model.getData({
//         version: "1.4",
//         chapter: "person",
//         path: id,
//     });

//     this.view.mainView.removeLoader();

//     console.log(response);

//     this.view.mainView.makePersonPreview(response);
// }
// }
