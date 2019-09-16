"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classe responsável por encontrar os melhores candidatos de tamanho de chave.
// Separa o texto em substrings de 3 e 4 caracteres, e então calcula o máximo divisor comum
// entre as posições de substrings iguais. Os valores que mais se repetirem se tornam
// candidatos.
var KeyLengthFinder = /** @class */ (function () {
    function KeyLengthFinder() {
    }
    KeyLengthFinder.findKeyLengh = function (text) {
        var subStrings = [];
        // Busca por repetições de palavras com 3 e 4 caracteres
        for (var i = 3; i < 5; i++) {
            subStrings = subStrings.concat(KeyLengthFinder.findSubstrings(text, i));
        }
        // Ordena as substrings por ocorrência
        subStrings = subStrings.sort(function (s1, s2) { return s2.positions.length - s1.positions.length; });
        // Calcula o máximo divisor comum entre as posições das substrings repetidas
        return KeyLengthFinder.findSubStringsMDCs(subStrings);
    };
    // Método que busca e conta palavras repetidas no texto.
    // Retorna um array com essas palavras junto com as posições de cada ocorrência
    KeyLengthFinder.findSubstrings = function (text, subStringSize) {
        // Variável para usar nas iterações
        var s = "";
        // Dicionário com chave string e valor SubString para guardar cada subString e suas posições
        var subStrings = {};
        // Preenche subStrings com as subStrings do texto juntamente com suas posições
        for (var i = 0; i < text.length; i++) {
            s += text.charAt(i);
            if (s.length == subStringSize) {
                if (subStrings[s] == null) {
                    subStrings[s] = { value: s, positions: [i] };
                }
                else {
                    subStrings[s].positions.push(i);
                }
                s = "";
            }
        }
        // Array de retorno
        var result = [];
        // Mapeia o dicionário para um array de subStrings
        for (var key in subStrings)
            // Descarta as subStrings com apenas 1 ocorrência
            if (subStrings[key].positions.length > 1)
                result.push(subStrings[key]);
        return result;
    };
    // Método que procura pelos mdcs entre as posições das subStrings repetidas
    KeyLengthFinder.findSubStringsMDCs = function (subStrings) {
        // Dicionário para armazenar as ocorrências de cada mdc encontrado
        var gcds = {};
        // Percorre as subStrings encontradas
        for (var i = 0; i < subStrings.length; i++) {
            var positions = subStrings[i].positions;
            // Calcula e guarda o GCD (Greatest Common Divisor) de todas posições com todas posições
            // da mesma subString
            for (var j = 0; j < positions.length; j++) {
                for (var k = j + 1; k < positions.length; k++) {
                    var gcd = KeyLengthFinder.greatestCommonDivisor(positions[j], positions[k]);
                    if (gcds[gcd] == null) {
                        gcds[gcd] = 1;
                    }
                    else {
                        gcds[gcd]++;
                    }
                }
            }
        }
        // Array com os candidatos
        var candidates = [];
        //Transforma o dicionário em um array de candidatos
        for (var gcd in gcds) {
            candidates.push({ length: +gcd, count: gcds[gcd] });
        }
        // Retorna os 5 melhores candidatos para tamanho de chave
        return candidates.sort(function (d1, d2) { return d2.count - d1.count; }).slice(0, 5);
    };
    // Encontra o máximo divisor comum entre 2 valores
    KeyLengthFinder.greatestCommonDivisor = function (a, b) {
        if (b == 0) {
            return a;
        }
        return KeyLengthFinder.greatestCommonDivisor(b, a % b);
    };
    return KeyLengthFinder;
}());
exports.KeyLengthFinder = KeyLengthFinder;
