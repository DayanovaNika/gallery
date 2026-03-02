import Creator from "../../core/creator";
import {
    cardElementParams,
    prewiewheaderElParams,
    descFilmPrewiewParams,
    genresTypeParams,
    genresParams,
    filmNameParams,
    infoWrapperParams,
    cellInfoParams,
    titleInfoParams,
    valueInfoParams,
} from "./params/prewiew-params";

class HeaderPrewiew {
prewiewHeaderElement;
constructor(dataPreview) {
    console.log(dataPreview);

    
    const imgUrl = dataPreview.backdrop.url;
    prewiewheaderElParams.attributes.style = `background-image: url(${imgUrl});`;

    const filmName = dataPreview.alternativeName
    const ratingKp = dataPreview.rating.kp 
    const ratingImdb = dataPreview.rating.imdb
    const movieLength = dataPreview.movieLength
    const ratingMpaa = dataPreview.ratingMpaa
    const yearFilm = dataPreview.year
    const filmType = dataPreview.type
    const genres = dataPreview.genres

    const dataInfo = {
        ["кинопоиск"]: ratingKp ?? "none",
        ["IMDB"]: ratingImdb ?? "none",
        ["год"]: yearFilm ?? "none",
        ["продолжительность"]: movieLength ?? "none",
        ["возрастной рейтинг"]: ratingMpaa ?? "none",
    }
    // const description = dataPreview.description
    // const budget = dataPreview.budget
    // const facts = dataPreview.facts
    // const persons = dataPreview.persons
    // const premiereWorld = dataPreview.premiere.world
    // const premiereRussia = dataPreview.premiere.russia 
    // const sequels = dataPreview.sequelsAndPrequels
    // const similarMovies = dataPreview.similarMovies
    
    // 1 создать переменные в которые нужно вытащить данные

    const descFilmPrewiew = new Creator(descFilmPrewiewParams).getElement();
    genresTypeParams.text = filmType
    const typeElement = new Creator(genresTypeParams).getElement()
    this.prewiewHeaderElement = new Creator(prewiewheaderElParams).getElement();

    descFilmPrewiew.append(typeElement)

    genres.forEach(element => {
        genresParams.text = element.name 
        const genre = new Creator(genresParams).getElement()
        descFilmPrewiew.append(genre)
    });

    this.prewiewHeaderElement.append(descFilmPrewiew)
    filmNameParams.text = filmName
    const filmNameElement = new Creator(filmNameParams).getElement()
    this.prewiewHeaderElement.append(filmNameElement)

    const infoWrapper = new Creator(infoWrapperParams).getElement()

    Object.entries(dataInfo).forEach((element, i)=> {
        const cellInfo = new Creator(cellInfoParams).getElement()
        titleInfoParams.text = element[0]
        let titleInfo = {} as Node

        if (i<2) {
            const copyParams = structuredClone(titleInfoParams)
            copyParams.attributes.style = "font-weight: 600"
            titleInfo = new Creator(copyParams).getElement()
        }
        else {
            titleInfo = new Creator(titleInfoParams).getElement()
        }
        
        valueInfoParams.text = element[1]
        const valueInfo = new Creator(valueInfoParams).getElement()
        cellInfo.append(titleInfo,valueInfo)
        infoWrapper.append(cellInfo)
        
    }) 
    this.prewiewHeaderElement.append(infoWrapper)
}

getHeader() {
    return this.prewiewHeaderElement;
}
}

export class PreviewView {
    cardElement;
    headerElement;

    constructor(dataPreview) {
    this.cardElement = new Creator(cardElementParams).getElement();
    this.headerElement = new HeaderPrewiew(dataPreview).getHeader();
    this.build();
}

getPrewiew() {
    return this.cardElement;
}

build() {
    this.cardElement.append(this.headerElement);
}
}
