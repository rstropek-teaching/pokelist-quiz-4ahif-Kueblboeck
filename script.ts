(async function () {
    const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/');

    let html = '';
    for (const pokemon of pokelist.results) {
        html += `<li>${pokemon.name}</li><button onclick=detailsPage('${pokemon.url}')>Details</button>`
    }

    $('#pokemons')[0].innerHTML = html;
})();

var offset = 20;

function nextPage() {
    (async function () {
        const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + offset);

        let html = '';
        for (const pokemon of pokelist.results) {
            html += `<li>${pokemon.name}</li><button onclick=detailsPage('${pokemon.url}')>Details</button>`
        }

        $('#pokemons')[0].innerHTML = html;
        offset += 20;
    })();
}

function previousPage() {
    if (offset > 0) {
        offset -= 20;
    } else {

    }

    (async function () {
        const pokelist = await $.get('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=' + offset);

        let html = '';
        for (const pokemon of pokelist.results) {
            html += `<li>${pokemon.name}</li><button onclick=detailsPage('${pokemon.url}')>Details</button>`
        }

        $('#pokemons')[0].innerHTML = html;
    })();
}

function detailsPage(url){
    var newWindow = window.open('');
    newWindow.document.body.innerHTML = "<html><div id=details>Test</div></html>";
    (async function () {
        const pokelist = await $.get(url);

        let html = '';
        for (const pokemon of pokelist.results) {
            html += `<li>Name: ${pokemon.name}</li>`
            html += `<li>Weight: ${pokemon.weight}</li>`
            html += `<li>Abilities: ${pokemon.abilitites}</li>`
            html += `<div>lorem ipsum</div>`
        }

        newWindow.document.body.innerHTML = html;
    })();
}
