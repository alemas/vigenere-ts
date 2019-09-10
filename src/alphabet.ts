export class Alphabet {
    
    private static letters:String[] = "abcdefghijklmnopqrstuvwxyz".split("");

    //Retorna o valor numérico correspondente à letra desejada
    private static getLetterForNumber(number: number): String {
        return Alphabet.letters[number];
    }

    //Retorna a letra correspondete ao valor numérico desejado
    private static getNumberForLetter(letter: String): number {
        return Alphabet.letters.indexOf(letter);
    }

}