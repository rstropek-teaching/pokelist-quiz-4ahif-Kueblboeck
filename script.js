var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var offset = 0;
var pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
var appendUrl = "?limit=20&offset=";
(function initialize() {
    return __awaiter(this, void 0, void 0, function () {
        var pokelist, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, $.get(pokeUrl)];
                case 1:
                    pokelist = _a.sent();
                    html = getPokeApi(pokelist);
                    offset = 20;
                    $('#pokemons')[0].innerHTML = html;
                    return [2 /*return*/];
            }
        });
    });
})();
function getPokeApi(pokelist) {
    var html = '';
    for (var _i = 0, _a = pokelist.results; _i < _a.length; _i++) {
        var pokemon = _a[_i];
        html += "<h4 class=\"has-text-black\">" + pokemon.name + "</h4><button class=\"button is-danger\" onclick=listDetails('" + pokemon.url + "')>Details</button>";
    }
    return html;
}
function navigate(navigation) {
    return __awaiter(this, void 0, void 0, function () {
        var pokelist, html, pokelist, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(navigation == 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, $.get(pokeUrl + appendUrl + offset)];
                case 1:
                    pokelist = _a.sent();
                    html = getPokeApi(pokelist);
                    $('#pokemons')[0].innerHTML = html;
                    offset += 20;
                    return [3 /*break*/, 4];
                case 2:
                    if (!(navigation == 2)) return [3 /*break*/, 4];
                    if (offset > 0) {
                        offset -= 20;
                    }
                    return [4 /*yield*/, $.get(pokeUrl + appendUrl + offset)];
                case 3:
                    pokelist = _a.sent();
                    html = getPokeApi(pokelist);
                    $('#pokemons')[0].innerHTML = html;
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listDetails(url) {
    return __awaiter(this, void 0, void 0, function () {
        var modal, pokeName, pokeWeight, pokeImage, pokeAbilities, response, pokemon, image, abilities, _i, _a, ability;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    modal = document.getElementById("myModal");
                    modal.style.display = "block";
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    };
                    pokeName = document.getElementById("pokeName");
                    pokeWeight = document.getElementById("pokeWeight");
                    pokeImage = document.getElementById("pokeImage");
                    pokeAbilities = document.getElementById("pokeAbilities");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    pokemon = _b.sent();
                    pokeName.innerHTML = pokemon.name;
                    pokeWeight.innerHTML = "Weight: " + pokemon.weight;
                    pokeImage.innerHTML = "";
                    image = document.createElement("img");
                    image.setAttribute("id", "image");
                    image.setAttribute("src", pokemon.sprites.front_default);
                    pokeImage.appendChild(image);
                    pokeAbilities.innerHTML = "";
                    abilities = "<h2> Abilities </h2><br/>";
                    for (_i = 0, _a = pokemon.abilities; _i < _a.length; _i++) {
                        ability = _a[_i];
                        abilities += ability.ability.name + "<br/>";
                    }
                    pokeAbilities.innerHTML = abilities;
                    return [2 /*return*/];
            }
        });
    });
}
