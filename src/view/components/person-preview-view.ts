import Creator from "../../core/creator";

import {
    cardElementParams,
    headerParams,
    photoParams,
    personInfoParams,
    nameParams,
    enNameParams,
    infoWrapperParams,
    cellInfoParams,
    titleInfoParams,
    valueInfoParams,
    heroParams,
    heroColumnParams,
    heroFactsParams,
    blockTitleParams,
    factsListParams,
    factsItemParams,
    personalInfoListParams,
    personalInfoItemParams,
    statisticsParams,
    statCardParams,
    statValueParams,
    statTitleParams,
    sectionParams,
    sectionTitleParams,
    listMoviesParams,
    movieCardParams,
    movieNameParams,
    movieProfessionParams,
    listFamilyParams,
    familyCardParams,
    familyNameParams,
    familyRelationParams,
    familyChildrenParams,
} from "./params/person-preview-params";

export class PersonPreviewView {
    cardElement;
    headerElement;
    data;

    constructor(dataPreview) {
        this.data = dataPreview.docs
            ? dataPreview.docs[0]
            : dataPreview;

        this.cardElement =
            new Creator(cardElementParams).getElement();

        this.headerElement =
            new HeaderPersonPreview(this.data).getHeader();

        this.build();
    }

    build() {
        const hero =
        new HeroPersonPreview(
            this.data,
        ).getHero();

    const statistics =
        new StatisticsPersonPreview(
            this.data,
        ).getStatistics();

    const sliderBuilder =
        new SliderPersonPreview();

    const movies =
        sliderBuilder.createSection(
            "Filmography",
            sliderBuilder.sliderMovies(
                this.data.movies,
            ),
        );

    const family =
        sliderBuilder.createSection(
            "Family",
            sliderBuilder.sliderFamily(
                this.data.spouses,
            ),
        );

    this.cardElement.append(
        this.headerElement,
        hero,
        statistics,
        movies,
        family,
    );
    }

    getPreview() {
        return this.cardElement;
    }
}

export class HeaderPersonPreview {
    headerElement;

    constructor(dataPerson) {
        this.headerElement = null;
        this.build(dataPerson);
    }

    build(dataPerson) {
        const photo =
            dataPerson.photo || "/person-placeholder.jpg";

        const name =
            dataPerson.name ||
            dataPerson.enName ||
            "Unknown";

        const englishName =
            dataPerson.enName ||
            dataPerson.name ||
            "Unknown";

        const age = dataPerson.age ?? "Unknown";
        const sex = dataPerson.sex ?? "Unknown";
        const growth = dataPerson.growth ?? "Unknown";
        const awards = dataPerson.countAwards ?? 0;

        const professions =
            dataPerson.profession?.length
                ? dataPerson.profession
                    .map((item) => item.value)
                    .join(", ")
                : "Unknown";

        const dataInfo = {
            Age: age,
            Sex: sex,
            Height: growth,
            Profession: professions,
            Awards: awards,
        };

        this.headerElement =
            new Creator(headerParams).getElement();

        const photoConfig =
            structuredClone(photoParams);

        photoConfig.attributes.style = `
            background:
            linear-gradient(
                rgba(0,0,0,0.15),
                rgba(0,0,0,0.35)
            ),
            url(${photo})
            no-repeat center/cover;
        `;

        const photoElement =
            new Creator(photoConfig).getElement();

        const personInfo =
            new Creator(personInfoParams).getElement();

        const nameConfig =
            structuredClone(nameParams);

        nameConfig.text = name;

        const personName =
            new Creator(nameConfig).getElement();

        const enNameConfig =
            structuredClone(enNameParams);

        enNameConfig.text = englishName;

        const personEnName =
            new Creator(enNameConfig).getElement();

        const infoWrapper =
            new Creator(infoWrapperParams).getElement();

        Object.entries(dataInfo).forEach(
            ([title, value]) => {
                const cellInfo =
                    new Creator(cellInfoParams).getElement();

                const titleConfig =
                    structuredClone(titleInfoParams);

                titleConfig.text = title;

                const titleElement =
                    new Creator(titleConfig).getElement();

                const valueConfig =
                    structuredClone(valueInfoParams);

                valueConfig.text = String(value);

                const valueElement =
                    new Creator(valueConfig).getElement();

                cellInfo.append(
                    titleElement,
                    valueElement,
                );

                infoWrapper.append(cellInfo);
            },
        );

        personInfo.append(
            personName,
            personEnName,
            infoWrapper,
        );

        this.headerElement.append(
            photoElement,
            personInfo,
        );
    }

    getHeader() {
        return this.headerElement;
    }
}

export class HeroPersonPreview {
    heroElement;

    constructor(dataPerson) {
        this.heroElement =
            new Creator(heroParams).getElement();

        this.build(dataPerson);
    }

    build(dataPerson) {
        const leftColumn =
            new Creator(heroColumnParams).getElement();

        const personalTitle =
            structuredClone(blockTitleParams);

        personalTitle.text = "Personal Information";

        leftColumn.append(
            new Creator(personalTitle).getElement(),
        );

        const personalInfo =
            new Creator(
                personalInfoListParams,
            ).getElement();

        const birthDate =
            dataPerson.birthday
                ? new Date(
                    dataPerson.birthday,
                ).toLocaleDateString()
                : "Unknown";

        const birthPlace =
            dataPerson.birthPlace?.length
                ? dataPerson.birthPlace
                    .map((item) => item.value)
                    .join(", ")
                : "Unknown";

        const deathDate =
            dataPerson.death
                ? new Date(
                    dataPerson.death,
                ).toLocaleDateString()
                : "Alive";

        const deathPlace =
            dataPerson.deathPlace?.length
                ? dataPerson.deathPlace
                    .map((item) => item.value)
                    .join(", ")
                : "—";

        const info = {
            "Birth Date": birthDate,
            "Birth Place": birthPlace,
            "Death Date": deathDate,
            "Death Place": deathPlace,
        };

        Object.entries(info).forEach(
            ([key, value]) => {
                const item =
                    new Creator(
                        personalInfoItemParams,
                    ).getElement();

                item.innerHTML = `
                    <strong>${key}</strong><br>
                    ${value}
                `;

                personalInfo.append(item);
            },
        );

        leftColumn.append(personalInfo);

        const factsBlock =
            new Creator(heroFactsParams).getElement();

        const factsTitle =
            structuredClone(blockTitleParams);

        factsTitle.text = "Facts";

        factsBlock.append(
            new Creator(factsTitle).getElement(),
        );

        const factsList =
            new Creator(
                factsListParams,
            ).getElement();

        dataPerson.facts
            ?.slice(0, 5)
            .forEach((fact) => {
                const itemConfig =
                    structuredClone(
                        factsItemParams,
                    );

                itemConfig.text =
                    fact.value;

                factsList.append(
                    new Creator(
                        itemConfig,
                    ).getElement(),
                );
            });

        factsBlock.append(factsList);

        this.heroElement.append(
            leftColumn,
            factsBlock,
        );
    }

    getHero() {
        return this.heroElement;
    }
}

export class StatisticsPersonPreview {
    statisticsElement;

    constructor(dataPerson) {
        this.statisticsElement =
            new Creator(
                statisticsParams,
            ).getElement();

        this.build(dataPerson);
    }

    build(dataPerson) {
        const stats = {
            Movies:
                dataPerson.movies?.length || 0,

            Awards:
                dataPerson.countAwards || 0,

            Family:
                dataPerson.spouses?.length || 0,
        };

        Object.entries(stats).forEach(
            ([title, value]) => {
                const card =
                    new Creator(
                        statCardParams,
                    ).getElement();

                const valueCfg =
                    structuredClone(
                        statValueParams,
                    );

                valueCfg.text =
                    String(value);

                const titleCfg =
                    structuredClone(
                        statTitleParams,
                    );

                titleCfg.text =
                    title;

                card.append(
                    new Creator(
                        valueCfg,
                    ).getElement(),
                    new Creator(
                        titleCfg,
                    ).getElement(),
                );

                this.statisticsElement.append(
                    card,
                );
            },
        );
    }

    getStatistics() {
        return this.statisticsElement;
    }
}

export class SliderPersonPreview {
    createSection(
        titleText,
        content,
    ) {
        const section =
            new Creator(sectionParams).getElement();

        const titleCfg =
            structuredClone(
                sectionTitleParams,
            );

        titleCfg.text =
            titleText;

        section.append(
            new Creator(
                titleCfg,
            ).getElement(),
            content,
        );

        return section;
    }

sliderMovies(movies) {
    const list =
        new Creator(listMoviesParams).getElement();

    movies.forEach((movie) => {

        const config =
            structuredClone(movieCardParams);

        let img = "/zaglushka.jpg";

        if (
            movie.poster &&
            movie.poster.previewUrl
        ) {
            img = movie.poster.previewUrl;
        }

        config.attributes.style = `
            background:
            linear-gradient(
                rgba(0,0,0,.2),
                rgba(0,0,0,.55)
            ),
            url(${img})
            center/cover;
        `;

        config.attributes["data-id"] =
            movie.id;

        const card =
            new Creator(config).getElement();

        const movieName =
            new Creator(movieNameParams).getElement();

        movieName.innerText =
            movie.name ||
            movie.alternativeName ||
            "Unknown";

        const profession =
            new Creator(
                movieProfessionParams,
            ).getElement();

        profession.innerText =
            movie.year ??
            "";

        card.append(
            movieName,
            profession,
        );

        list.append(card);
    });

    return list;
}

    sliderFamily(spouses) {
        const list =
            new Creator(
                listFamilyParams,
            ).getElement();

        spouses?.forEach((person) => {
            const card =
                new Creator(
                    familyCardParams,
                ).getElement();

            const nameCfg =
                structuredClone(
                    familyNameParams,
                );

            nameCfg.text =
                person.name ||
                "Unknown";

            const relationCfg =
                structuredClone(
                    familyRelationParams,
                );

            relationCfg.text =
                person.relation ||
                "Unknown";

            const childrenCfg =
                structuredClone(
                    familyChildrenParams,
                );

            childrenCfg.text =
                `Children: ${person.children || 0}`;

            card.append(
                new Creator(
                    nameCfg,
                ).getElement(),

                new Creator(
                    relationCfg,
                ).getElement(),

                new Creator(
                    childrenCfg,
                ).getElement(),
            );

            list.append(card);
        });

        return list;
    }
}


// import Creator from "../../core/creator";
// import {
//     headerParams,
//     photoParams,
//     personInfoParams,
//     nameParams,
//     enNameParams,
//     infoWrapperParams,
//     cellInfoParams,
//     titleInfoParams,
//     valueInfoParams,
// } from "./params/person-preview-params";


// export class PersonPreviewView {
//     cardElement;

//     constructor(data) {
//         this.cardElement = document.createElement("div");
//         this.cardElement.textContent = "PERSON PREVIEW";
//     }

//     getPreview() {
//         return this.cardElement;
//     }

//     cardElement;
//     headerElement;
//     data;

//     constructor(dataPreview) {
//         this.data = dataPreview.docs
//             ? dataPreview.docs[0]
//             : dataPreview;

//         this.cardElement =
//             new Creator(cardElementParams).getElement();

//         this.headerElement =
//             new HeaderPersonPreview(this.data).getHeader();

//         this.build();
//     }

// }


// export class HeaderPersonPreview {
//     headerElement;

//     constructor(dataPerson) {
//         this.headerElement = null;
//         this.build(dataPerson);
//     }

//     build(dataPerson) {
//         const photo =
//             dataPerson.photo || "/person-placeholder.jpg";

//         const name =
//             dataPerson.name ||
//             dataPerson.enName ||
//             "Unknown";

//         const englishName =
//             dataPerson.enName ||
//             dataPerson.name ||
//             "Unknown";

//         const age = dataPerson.age ?? "Unknown";
//         const sex = dataPerson.sex ?? "Unknown";
//         const growth = dataPerson.growth ?? "Unknown";
//         const awards = dataPerson.countAwards ?? 0;

//         const professions =
//             dataPerson.profession?.length
//                 ? dataPerson.profession
//                         .map((item) => item.value)
//                         .join(", ")
//                 : "Unknown";

//         const dataInfo = {
//             Age: age,
//             Sex: sex,
//             Height: growth,
//             Profession: professions,
//             Awards: awards,
//         };

//         this.headerElement = new Creator(
//             headerParams,
//         ).getElement();

//         const photoConfig = structuredClone(photoParams);

//         photoConfig.attributes.style = `
//             background:
//             linear-gradient(
//                 rgba(0,0,0,0.15),
//                 rgba(0,0,0,0.35)
//             ),
//             url(${photo})
//             no-repeat center/cover;
//         `;

//         const photoElement =
//             new Creator(photoConfig).getElement();

//         const personInfo =
//             new Creator(personInfoParams).getElement();

//         const nameConfig = structuredClone(nameParams);
//         nameConfig.text = name;

//         const personName =
//             new Creator(nameConfig).getElement();

//         const enNameConfig = structuredClone(enNameParams);
//         enNameConfig.text = englishName;

//         const personEnName =
//             new Creator(enNameConfig).getElement();

//         const infoWrapper =
//             new Creator(infoWrapperParams).getElement();

//         Object.entries(dataInfo).forEach(([title, value]) => {
//             const cellInfo =
//                 new Creator(cellInfoParams).getElement();

//             const titleConfig =
//                 structuredClone(titleInfoParams);

//             titleConfig.text = title;

//             const titleElement =
//                 new Creator(titleConfig).getElement();

//             const valueConfig =
//                 structuredClone(valueInfoParams);

//             valueConfig.text = String(value);

//             const valueElement =
//                 new Creator(valueConfig).getElement();

//             cellInfo.append(
//                 titleElement,
//                 valueElement,
//             );

//             infoWrapper.append(cellInfo);
//         });

//         personInfo.append(
//             personName,
//             personEnName,
//             infoWrapper,
//         );

//         this.headerElement.append(
//             photoElement,
//             personInfo,
//         );
//     }

//     getHeader() {
//         return this.headerElement;
//     }
// }