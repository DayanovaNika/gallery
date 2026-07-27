export class Model {
  genresList;
  dataFromServer;

    cache = new Map<string, unknown>();

    movieCache = new Map<number, unknown>();

    personCache = new Map<number, unknown>();

    filmPosterCache = new Map<number, unknown>();

    homeMovies = null;

  constructor() {
    this.dataFromServer = null;
    this.genresList = this.getData({
      version: "1",
      chapter: "movie",
      path: "possible-values-by-field",
      params: { field: "genres.name" },
    });
  }

  async getData({
    version = "", // версия
    chapter = "", // например "movie"
    path = "", // например "search" или "possible-values-by-field"
    params = {}, // страницы, количество items и д.р.
  } = {}) {
    const baseURL = "https://api.poiskkino.dev";

    const url = new URL(
      `${baseURL}/v${version}/${chapter}${path ? `/${path}` : ""}`,
    );
    console.log(url.toString());
    const cacheKey = url.toString();

    if (this.cache.has(cacheKey)) {
      console.log("Loaded from cache");
      return this.cache.get(cacheKey);
}

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "2YDRCN4-GJJ4VXC-HX99D0W-HDBNKW8",  
        //  XH5K03S-6N74G06-JGW60VQ-CX7EBB 

      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return null;
    }
  }

  async getMovie(id) {

    if (this.movieCache.has(id)) {

        console.log("Movie cache");

        return this.movieCache.get(id);
    }

    const movie = await this.getData({

        version: "1.4",

        chapter: "movie",

        path: id,

    });

    this.movieCache.set(id, movie);

    return movie;
}
  async getPerson(id) {

    if (this.personCache.has(id)) {

        console.log("Person cache");

        return this.personCache.get(id);
    }

    const person = await this.getData({

        version: "1.4",

        chapter: "person",

        path: id,

    });

    this.personCache.set(id, person);

    return person;
}
  async getMoviePoster(id) {

    if (this.filmPosterCache.has(id)) {

        return this.filmPosterCache.get(id);
    }

    const movie = await this.getMovie(id);

    this.filmPosterCache.set(id, movie);

    return movie;
}
  async loadHomeMovies() {

    if (this.homeMovies) {
        return this.homeMovies;
    }

    const randomPage = Math.floor(Math.random() * 10) + 1;

    const response = await this.getData({
        version: "1.4",
        chapter: "movie",
        params: {
            page: randomPage,
            limit: 12,

            type: "movie",

            "rating.kp": "7.5-10",

            sortField: "votes.kp",

            sortType: "-1",
        },
    });

    this.homeMovies = response;

    return response;
}

  async setData(data) {
    this.dataFromServer = data;
  }

  sortRating(data) {
    data.docs.sort((a, b) => {
        const ratingA = a.rating?.imdb ?? 0;
        const ratingB = b.rating?.imdb ?? 0;

        return ratingB - ratingA;
    });
}

  async getMoviesByIds(movieIds) {
      const requests = movieIds.map((id) =>
          this.getData({
              version: "1.4",
              chapter: "movie",
              path: id,
          }),
      );
  
      const movies = await Promise.all(requests);
  
      return movies.filter(Boolean);
  }

//   async getRandomMovies(count = 12) {
//     const requests = Array.from(
//         { length: count },
//         () =>
//             this.getData({
//                 version: "1.4",
//                 chapter: "movie",
//                 path: "random",
//                 params: {
//                     "rating.kp": "7.5-10",
//                     notNullFields: [
//                         "poster.url",
//                         "rating.kp",
//                         "name",
//                     ].join(","),
//                 },
//             }),
//     );

//     const movies = await Promise.all(requests);

//     return {
//         docs: movies.filter(Boolean),
//     };
// }
}
