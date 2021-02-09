export const modelInformation = {
    models: {
        //  PRZYKŁAD 
        // =================================

        // fixedModels: { // kategoria modeli
        //     "Substance-Wood-Floor":  { //Nazwa modelu
        //         folderName: "Substance-Wood-Floor", // Nazwa folderu w którym znajdują się modele w formacie gltf
        //         nameTheItem: "Podłoga", // polskie tłumaczenie do menu
        //         scale_x: 0.04,
        //         scale_y: 0.04,
        //         scale_z: 0.04,
        //         position_x: 0,
        //         position_y: 0,
        //         position_z: 0,
        //         rotation_x: 0,
        //         rotation_y: 0,
        //         rotation_z: 0,
        //         visible: true,
        //     },
        // },

        // =========================================
        fixedModels: {
            // "apartment-2":  {
            //     folderName: "apartment-2",
            //     nameTheItem: "apartment 2",
            //     imgName: "room",
            //     scale_x: 0.4,
            //     scale_y: 0.4,
            //     scale_z: 0.4,
            //     position_x: 0,
            //     position_y: 0,
            //     position_z: 0,
            //     rotation_x: 0,
            //     rotation_y: 0,
            //     rotation_z: 0,
            //     visible: false,
            // },
        },
        modelsToDisplay: {
            "apartment-2":  {
                folderName: "apartment-2",
                nameTheItem: "Mieszkanie 1",
                imgName: "Victorian-Lounge-Sofa", 
                floor: "3",
                area: "1",
                rooms: "5",
                scale_x: 0.1,
                scale_y: 0.1,
                scale_z: 0.1,
                position_x: 0,
                position_y: 0,
                position_z: 10,
                rotation_x: 0,
                rotation_y: 0,
                rotation_z: 0,
                visible: false,
            },
            // "apartment-12":  {
            //     folderName: "apartment-12",
            //     nameTheItem: "Mieszkanie 2",
            //     imgName: "apartment-12", 
            //     scale_x: 0.1,
            //     scale_y: 0.1,
            //     scale_z: 0.1,
            //     position_x: 40,
            //     position_y: 0,
            //     position_z: 100,
            //     rotation_x: 0,
            //     rotation_y: 0,
            //     rotation_z: 0,
            //     visible: false,
            // },
        }
    },

    backgrounds: {
        white: {
            color: "white",
            nameColor: "Biały"
        },
        sniezny: {
            color: "#cbcbcb",
            nameColor: "Śnieżny"
        }
    },
    lights: {
        DirectionalLight: {
            "centerLight": {
                color: "white",
                power: 0.2,
                position_x: 0,
                position_y: 35,
                position_z: 0
            },
            "rightLight": {
                color: "white",
                power: 0.4,
                position_x: 51,
                position_y: 35,
                position_z: 0
            },
            "leftLight": {
                color: "white",
                power: 0.4,
                position_x: -51,
                position_y: 35,
                position_z: 0
            },
            "frontLight": {
                color: "white",
                power: 0.4,
                position_x: 0,
                position_y: 35,
                position_z: -51
            },
            "backLight": {
                color: "white",
                power: 0.4,
                position_x: 0,
                position_y: 35,
                position_z: 51
            }
        },
        AmbientLight: {
            // "backLight1": {
            //     color: "white",
            //     power: 4,
            //     position_x: 0,
            //     position_y: 5,
            //     position_z: 30
            // }
        }
    },

    copiedItems: {
        //PRZYKŁAD 
                // ==============================
        // "nameOfTheClones1": { // wartośc bez znaczenia. 
        //     nameFolderOfTheItemToBeCoopied: "Substance-Wood-Floor", // nazwa folderu z którego trzeba przekopiować wartości
        //     cloneNameId: "default", // Name id które nadaje się po przekopiowaniu wartości. Można modyfikować klon posiadając jego wartość.
        //     scale_x: 0.04,
        //     scale_y: 0.04,
        //     scale_z: 0.04,
        //     position_x: 0,
        //     position_y: 0,
        //     position_z: -120,
        //     rotation_x: 0,
        //     rotation_y: 0,
        //     rotation_z: 0,
        //     visible: true
        // },
        // ==============================
    }
};
