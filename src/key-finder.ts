import { Alphabet } from "./alphabet";
import { LetterFrequencies } from "./letter-frequencies";

// Classe responsável por encontrar os caracteres mais prováveis da chave.
// O texto é dividido em x partes, sendo x o tamanho da chave, e em cada parte
// é feita uma comparação de frequência dos caracteres com as frequências da
// língua portuguesa

export class KeyFinder {

    public static findKey(text: string, keyLength: number): {[char: string]: number}[] {

        // Array de dicionários onde cada posição representa uma letra da chave
        // e cada dicionário representa o número de ocorrências de cada caracter
        let charOccurrences:{[char: string] : number}[] = [];

        // Array para guardar os melhores cadidatos para cada
        // letra da chave
        let bestCandidates:{[char: string]: number}[] = [];

        // Inicia charOccurrences com todas letras e número de ocorrências em 0 e
        // inicia bestCandidates com dicionários vazios
        for (let i = 0; i < keyLength; i++) {
            charOccurrences[i] = {};
            bestCandidates[i] = {};
            for (let j = 0; j < Alphabet.letters.length; j++) {
                charOccurrences[i][Alphabet.letters[j]] = 0;
            }
        }

        // Preenche as ocorrências de cada caracter para cada letra da chave
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            charOccurrences[i % keyLength][char]++;
        }

        // Número total de caracteres que cada letra da chave cifrou
        let totalLetters = text.length/keyLength;

        // Array com as frequências de cada letra na língua portuguesa
        const langFrequencies = LetterFrequencies.portuguese;

        // Para cada letra da chave
        for (let i = 0; i < keyLength; i++) {
            // Dicionário contendo as ocorrências de cada caracter naquela letra
            let keyPos = charOccurrences[i];
            
            // Calcula-se a frequência de cada caracter naquela parte do texto e compara-se com as frequências de
            // cada caracter na língua portuguesa deslocados de 0 a 25 posições.
            // Aquela comparação que houver menor diferença de frequências se torna candidato de caracter da chave

            // j serve como o deslocamento para cada letra do alfabeto
            for (let j = 0; j < Alphabet.alphabetLength; j++) {
                // Representa a soma de diferenças entre a frequência das letras no texto e na língua portuguesa
                let difference = 0;
                for (const char in keyPos) {
                    // Frequência que aparece o caracter nessa posição da chave pelo texto
                    let freq = keyPos[char] / totalLetters * 100;
                    // Caracter deslocado segundo o valor de j
                    let shiftedChar = Alphabet.getLetterForNumber((Alphabet.getNumberForLetter(char) + j) % Alphabet.alphabetLength);
                    // Frequência que aparece o caracter na língua portuguesa
                    let langFreq = langFrequencies[shiftedChar];

                    difference += Math.abs(freq - langFreq);
                }

                // Salva os melhores candidatos no array;
                // 50 foi um valor arbitrário definido após vários testes com textos de tamanhos diferentes
                if (difference < 50) {
                    let decodedLetter = Math.abs(j - Alphabet.alphabetLength) % Alphabet.alphabetLength;
                    bestCandidates[i][Alphabet.getLetterForNumber(decodedLetter)] = difference;
                }
            }
        }
        return bestCandidates;
    }

}