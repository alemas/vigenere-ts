export class Alphabet {
    
    // Letras dos alfabeto a ser utilizado
    static readonly letters:string[] = "abcdefghijklmnopqrstuvwxyz".split("");

    // Número de caracteres do alfabeto (usado para cálculos de módulo na classe Decoder)
    static alphabetLength:number = Alphabet.letters.length;

    //Retorna o valor numérico correspondente à letra desejada
    static getLetterForNumber(number: number): string {
        return Alphabet.letters[number];
    }

    //Retorna a letra correspondente ao valor numérico desejado
    static getNumberForLetter(letter: string): number {
        return Alphabet.letters.indexOf(letter);
    }

}