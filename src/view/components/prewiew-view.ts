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
    starParams,
    wrapperParams,
    ratingParams,
    descriptionTitleParams,
    descriptionParams,
    descWrapperParams,
    factsTitleParams,
    factsListParams,
    factsWrapperParams,
    factsParams,
    heroInfoWrapperParams,
    prewiewHeroElementParams,
    boxParams,
    budgetParams,
    budgetTitleParams,
    datesParams,
    worldParams,
    russiaParams,
    worldTitleParams,
    russiaTitleParams,
    budgetWrapperParams,
    datesWrapperParams,
    russiaWrapperParams,
    worldWrapperParams,
} from "./params/prewiew-params";


class HeaderPrewiew {
    prewiewHeaderElement;

    constructor(dataPreview) {
        this.prewiewHeaderElement = null
        this.build(dataPreview)
    }

    build(dataPreview) {
        const bgTemplate = "/prewiewBg.png"
        let imgUrl = bgTemplate
        if (dataPreview.backdrop && dataPreview.backdrop.url) {
            imgUrl = dataPreview.backdrop.url
        }
        else if (dataPreview.poster && dataPreview.poster.url){
            imgUrl = dataPreview.poster.url
        }

        prewiewheaderElParams.attributes.style = `
        background: 
        linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), 
        url(${imgUrl}) no-repeat center/cover;`;

        const filmName = dataPreview.alternativeName
        const ratingKp = dataPreview.rating.kp || "none"
        const ratingImdb = dataPreview.rating.imdb || "none"
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
                const wrapper = new Creator(wrapperParams).getElement()
                const star = new Creator(starParams).getElement()

                ratingParams.text = element[1] 
                const rating = new Creator(ratingParams).getElement()
                wrapper.append(star, rating)
                cellInfo.append(titleInfo, wrapper)
            }
            else {
                titleInfo = new Creator(titleInfoParams).getElement()
                valueInfoParams.text = element[1]
                const valueInfo = new Creator(valueInfoParams).getElement()
                cellInfo.append(titleInfo,valueInfo)
            }
            infoWrapper.append(cellInfo)
        }) 
        this.prewiewHeaderElement.append(infoWrapper)
    }
    getHeader() {
        return this.prewiewHeaderElement;
    }
}
class HeroPrewiew {
    prewiewHeroElement; 
    constructor (dataPreview) {
        this.prewiewHeroElement = new Creator(prewiewHeroElementParams).getElement()
        this.build(dataPreview);
    }

    build(dataPreview) {
        const description = dataPreview.description
        const budget = dataPreview.budget
        const facts = dataPreview.facts
        const hero = this.createInfo(description,facts)
        const filmBudget = this.createCard(budget, dataPreview.premiere)

        this.prewiewHeroElement.append(hero, filmBudget)
    }
    createInfo(desc,facts) {
        const descriptionTitle = new Creator(descriptionTitleParams).getElement()
        descriptionParams.text = desc
        const description = new Creator(descriptionParams).getElement()
        const descWrapper = new Creator(descWrapperParams).getElement()
        descWrapper.append(descriptionTitle, description)

        const factsTitle = new Creator(factsTitleParams).getElement()
        const factsList = new Creator(factsListParams).getElement()

        facts.slice(0, 3).forEach(element => {
            factsParams.text = element.value;
            const facts = new Creator(factsParams).getElement();
            factsList.append(facts);
        })

        const factsWrapper = new Creator(factsWrapperParams).getElement()
        factsWrapper.append(factsTitle, factsList)
        const heroInfoWrapper = new Creator(heroInfoWrapperParams).getElement()
        heroInfoWrapper.append(descWrapper,factsWrapper)
        return heroInfoWrapper;
    }
    createCard(filmBudget, premiere) {
        const box = new Creator(boxParams).getElement()

        const budgetWrapper = new Creator(budgetWrapperParams).getElement()
        const budgetTitle = new Creator(budgetTitleParams).getElement()
        if (filmBudget && filmBudget.value) {
            budgetParams.text = `$${filmBudget.value}`
        }
        const budget = new Creator(budgetParams).getElement()
        budgetWrapper.append(budgetTitle,budget)

        const datesWrapper = new Creator(datesWrapperParams).getElement()
        const dates = new Creator(datesParams).getElement()

        if(premiere && premiere.world) {
            worldParams.text = new Date(premiere.world).toLocaleDateString("en-EN", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }   

        if(premiere && premiere.russia) {
            russiaParams.text = new Date(premiere.world).toLocaleDateString("en-EN", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }

        const worldWrapper = new Creator(worldWrapperParams).getElement()
        const worldTitle = new Creator(worldTitleParams).getElement()
        const world = new Creator(worldParams).getElement()
        worldWrapper.append(worldTitle, world)

        const russiaWrapper = new Creator(russiaWrapperParams).getElement()
        const russiaTitle = new Creator(russiaTitleParams).getElement()
        const russia = new Creator(russiaParams).getElement()
        russiaWrapper.append(russiaTitle,russia)

        datesWrapper.append(dates, worldWrapper, russiaWrapper)

        box.append(budgetWrapper, datesWrapper)
        return box;
    }
    
    getHero(){
        return this.prewiewHeroElement;
    }
}
class SliderPrewiew {
    constructor (data){
        this.persons = data.persons
        // this.prequels = data.sequelsAndPrequels
        // this.similarMovies = data.similarMovies
        console.log(data);
        this.sliderCrew(this.persons)
    }

    sliderCrew(personsArray){
        console.log(personsArray);
        
        
    }
}

// const slidercrew = SliderPrewiew().sliderCrew(dataPrewiew.persons)
// const slidercrew = SliderPrewiew(dataPrewiew).sliderCrew()
export class PreviewView {
    cardElement;
    headerElement;
    heroElement;
    sliderElement;

    constructor(dataPreview) {
        console.log(dataPreview);
        this.cardElement = new Creator(cardElementParams).getElement();
        this.headerElement = new HeaderPrewiew(dataPreview).getHeader();
        this.heroElement = new HeroPrewiew(dataPreview).getHero();
        this.sliderElement = new SliderPrewiew(dataPreview)
        this.build();
    }

    getPrewiew() {
        return this.cardElement;
    }

    build() {
        this.cardElement.append(this.headerElement, this.heroElement);
    }
}