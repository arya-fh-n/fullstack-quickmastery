"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchData() {
    return __awaiter(this, arguments, void 0, function* (name = "bulbasaur") {
        try {
            const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
const searchButton = document.getElementById("search");
const searchInput = document.getElementById("input");
searchButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const name = searchInput.value.trim();
    if (name) {
        const data = yield fetchData(name);
        if (data) {
            updatePokemonDetails(data);
        }
    }
}));
function updatePokemonDetails(data) {
    const pkmnImage = document.getElementById("image");
    const pkmnName = document.getElementById("name");
    const pkmnType = document.getElementById("type");
    const pkmnWeight = document.getElementById("weight");
    const pkmnHeight = document.getElementById("height");
    if (pkmnImage) {
        pkmnImage.src = data.sprites.front_default;
        pkmnImage.alt = "Pokemon";
    }
    let name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    if (pkmnName) {
        pkmnName.textContent = name;
    }
    let types = data.types.map((type) => type.type.name);
    if (pkmnType) {
        pkmnType.textContent = `Types: ${types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(", ")}`;
    }
    if (pkmnWeight) {
        pkmnWeight.textContent = `Weight: ${data.weight}`;
    }
    if (pkmnHeight) {
        pkmnHeight.textContent = `Height: ${data.height}`;
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetchData();
    if (data) {
        updatePokemonDetails(data);
    }
}))();
