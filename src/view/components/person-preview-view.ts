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
        this.cardElement.append(
            this.headerElement,
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