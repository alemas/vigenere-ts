// Estrutura de dados para contar as ocorrências de cada palavra repetida no texto.
// value sendo a palavra e positions os locais que elas aparecem/
interface SubString {
    value: string;
    positions: number[];
}

// Estrutura de dados para representar as possibilidades de tamanho de chave encontradas.
// length sendo o tamanho e chance o número de ocorrências que foi encontradas entre as palavras analisadas.
interface KeyLengthCandidate {
    length: number;
    chance: number;
}

export class KeyLengthFinder {

    static findKeyLengh(text:string): KeyLengthCandidate[] {

        let subStrings:SubString[] = [];

        // Busca por repetições de palavras com 3 e 4 caracteres
        for (var i = 3; i < 5; i++) {
            subStrings = subStrings.concat(KeyLengthFinder.findSubstrings(text, i));
        }

        // Ordena as substrings por ocorrência
        subStrings = subStrings.sort((s1, s2) => s2.positions.length - s1.positions.length);

        return KeyLengthFinder.findSubStringsDistances(subStrings);
    }

    // Método que busca e conta palavras repetidas no texto.
    // Retorna um array com essas palavras junto com as posições de cada ocorrência
    private static findSubstrings(text:string, subStringSize:number): SubString[] {

        // Variável para usar nas iterações
        let s:string = "";

        // Dicionário com chave string e valor SubString para guardar cada subString e suas posições
        let subStrings:{[subString: string] : SubString} = {};

        for (let i = 0; i < text.length; i++) {
            s += text.charAt(i);
            if (s.length == subStringSize) {
                if (subStrings[s] == null) {
                    subStrings[s] = {value:s, positions:[i]};
                } else {
                    subStrings[s].positions.push(i);
                }
                s = "";
            }
        }

        // Array de retorno
        let result:SubString[] = [];

        // Mapeia o dicionário para um array e subStrings
        for (const key in subStrings)
            // Descarta as subStrings com apenas 1 ocorrência
            if (subStrings[key].positions.length > 1)
                result.push(subStrings[key]);

        return result;
    }

    // Método que procura pelo intervalo de caracteres entre cada uma das subStrings encontradas
    private static findSubStringsDistances(subStrings: SubString[]): KeyLengthCandidate[] {

        // Dicionário para armazenar distâncias e número de ocorrências de cada uma delas
        let distances: {[distance: number]: number} = {};

        // Percorre as subStrings encontradas
        for (let i = 0; i < subStrings.length; i++) {
            let positions = subStrings[i].positions;

            // Calcula e guarda o GCD (Greatest Common Divisor) de todas posições com todas
            for (let j = 0; j < positions.length; j++) {
                for (let k = j+1; k < positions.length; k++) {
                    let gcd = KeyLengthFinder.greatestCommonDivisor(positions[j], positions[k]);
                    if (distances[gcd] == null) {
                        distances[gcd] = 1;
                    } else {
                        distances[gcd]++;
                    }
                }
            }
        }

        let result: KeyLengthCandidate[] = [];

        for (const gcd in distances) {
            result.push({length: +gcd, chance:distances[gcd]});
        }

        return result.sort((d1, d2) => d2.chance - d1.chance).filter(d => d.chance > 10);
    }

    // Encontra o máximo divisor comum entre 2 valores
    private static greatestCommonDivisor(a: number, b: number): number {
        if (b == 0) {
            return a;
        }
        return KeyLengthFinder.greatestCommonDivisor(b, a % b);
    }

}