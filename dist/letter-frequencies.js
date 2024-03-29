"use strict";
// Classe responsável por fornecer as frequências dos caracteres presentes em cada língua.
// TODO - Adicionar suporte a mais línguas
Object.defineProperty(exports, "__esModule", { value: true });
var LetterFrequencies = /** @class */ (function () {
    function LetterFrequencies() {
    }
    LetterFrequencies.portuguese = { 'a': 14.634, 'b': 1.043, 'c': 3.882, 'd': 4.992, 'e': 12.570, 'f': 1.023, 'g': 1.303,
        'h': 0.781, 'i': 6.186, 'j': 0.397, 'k': 0.015, 'l': 2.779, 'm': 4.738, 'n': 4.446,
        'o': 9.735, 'p': 2.523, 'q': 1.204, 'r': 6.530, 's': 6.805, 't': 4.336, 'u': 3.639,
        'v': 1.575, 'w': 0.037, 'x': 0.253, 'y': 0.006, 'z': 0.470 };
    return LetterFrequencies;
}());
exports.LetterFrequencies = LetterFrequencies;
