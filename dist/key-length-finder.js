"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyLengthFinder = (function () {
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
        return KeyLengthFinder.findSubStringsDistances(subStrings);
    };
    // Método que busca e conta palavras repetidas no texto.
    // Retorna um array com essas palavras junto com as posições de cada ocorrência
    KeyLengthFinder.findSubstrings = function (text, subStringSize) {
        // Variável para usar nas iterações
        var s = "";
        // Dicionário com chave string e valor SubString para guardar cada subString e suas posições
        var subStrings = {};
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
    // Método que procura pelo intervalo de caracteres entre cada uma das subStrings encontradas
    KeyLengthFinder.findSubStringsDistances = function (subStrings) {
        // Dicionário para armazenar distâncias e número de ocorrências de cada uma delas
        var distances = {};
        // Percorre as subStrings encontradas
        for (var i = 0; i < subStrings.length; i++) {
            var positions = subStrings[i].positions;
            // Calcula e guarda o GCD (Greatest Common Divisor) de todas posições com todas
            for (var j = 0; j < positions.length; j++) {
                for (var k = j + 1; k < positions.length; k++) {
                    var gcd = KeyLengthFinder.greatestCommonDivisor(positions[j], positions[k]);
                    if (distances[gcd] == null) {
                        distances[gcd] = 1;
                    }
                    else {
                        distances[gcd]++;
                    }
                }
            }
        }
        var result = [];
        for (var gcd in distances) {
            result.push({ length: +gcd, chance: distances[gcd] });
        }
        // Retorna os 5 melhores candidatos para tamanho de chave
        return result.sort(function (d1, d2) { return d2.chance - d1.chance; }).filter(function (d) { return d.chance > 10; }).slice(0, 4);
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
