"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alphabet_1 = require("./alphabet");
var Decoder = /** @class */ (function () {
    function Decoder() {
    }
    // Retorna o texto decodificado com a chave informada.
    // textLimit é usado para limitar o número de caracteres que se deseja decodificar
    Decoder.decode = function (cipherText, key, textLimit) {
        var text = "";
        var keySize = key.length;
        var alphabetSize = alphabet_1.Alphabet.alphabetLength;
        textLimit = textLimit != null && textLimit < cipherText.length ? textLimit : cipherText.length;
        for (var i = 0; i < textLimit; i++) {
            // Valor numérico correspondente à letra do texto cifrado
            var cipherNumber = alphabet_1.Alphabet.getNumberForLetter(cipherText.charAt(i));
            // Valor numérico correspondente à letra da chave
            var keyNumber = alphabet_1.Alphabet.getNumberForLetter(key.charAt(i % keySize));
            // Resultado do cálculo para decifrar o caracter
            var resultNumber = cipherNumber - keyNumber;
            if (resultNumber < 0)
                resultNumber += alphabetSize;
            text = text + alphabet_1.Alphabet.getLetterForNumber(resultNumber);
        }
        return text;
    };
    return Decoder;
}());
exports.Decoder = Decoder;
