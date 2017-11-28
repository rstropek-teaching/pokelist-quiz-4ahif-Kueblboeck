let offset = 0;
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const appendUrl = "?limit=20&offset=";

(async function initialize() {
    const pokelist = await $.get(pokeUrl);

    let html = getPokeApi(pokelist);

    offset = 20;
    $('#pokemons')[0].innerHTML = html;
})();

function getPokeApi(pokelist: any) {
    let html = '';
    for (const pokemon of pokelist.results) {
        html += `<h4 class="has-text-black">${pokemon.name}</h4><button class="button is-danger" onclick=listDetails('${pokemon.url}')>Details</button>`
    }
    return html;
}

async function navigate(navigation: number) {
    if (navigation == 1) {
        const pokelist = await $.get(pokeUrl + appendUrl + offset);

        const html = getPokeApi(pokelist);

        $('#pokemons')[0].innerHTML = html;
        offset += 20;
    } else if (navigation == 2) {
        if (offset > 0) {
            offset -= 20;
        }
        const pokelist = await $.get(pokeUrl + appendUrl + offset);

        const html = getPokeApi(pokelist);

        $('#pokemons')[0].innerHTML = html;
    }

}

async function listDetails(url: string) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    let pokeName = document.getElementById("pokeName");
    let pokeWeight = document.getElementById("pokeWeight");
    let pokeImage = document.getElementById("pokeImage");
    let pokeAbilities = document.getElementById("pokeAbilities");

    const response = await fetch(url);
    const pokemon = await response.json();

    pokeName.innerHTML = pokemon.name;

    pokeWeight.innerHTML = "Weight: " + pokemon.weight;

    pokeImage.innerHTML = "";
    let image = document.createElement("img");
    image.setAttribute("id", "image");
    image.setAttribute("src", pokemon.sprites.front_default);
    pokeImage.appendChild(image);

    pokeAbilities.innerHTML = "";
    let abilities: string = "<h2> Abilities </h2><br/>";
    for (const ability of pokemon.abilities) {
        abilities += ability.ability.name + "<br/>";
    }
    pokeAbilities.innerHTML = abilities;
}
