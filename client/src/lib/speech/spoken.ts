// Converte texto com notação matemática em frases que soam naturais quando lidas em voz alta.

const UNITS: Array<[RegExp, string]> = [
  [/(\d)\s?km²/g, "$1 quilômetros quadrados"],
  [/(\d)\s?cm²/g, "$1 centímetros quadrados"],
  [/(\d)\s?mm²/g, "$1 milímetros quadrados"],
  [/(\d)\s?m²/g, "$1 metros quadrados"],
  [/\bcm²/g, "centímetros quadrados"],
  [/\bm²/g, "metros quadrados"],
  [/(\d)\s?km\b/g, "$1 quilômetros"],
  [/(\d)\s?cm\b/g, "$1 centímetros"],
  [/(\d)\s?mm\b/g, "$1 milímetros"],
  [/(\d)\s?m\b/g, "$1 metros"],
  [/\bcm\b/g, "centímetros"],
  [/(\d)\s?°/g, "$1 graus"],
  [/°/g, " graus"],
];

const SUBSCRIPTS: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "ₙ": "n" };

export function toSpoken(input: string): string {
  let text = ` ${input} `;

  text = text.replace(/[₀-₉ₙ]/g, (char) => ` ${SUBSCRIPTS[char] ?? ""}`);
  text = text.replace(/R\$\s?([\d.]+)/g, "$1 reais");
  // 15.700 → 15700 (ponto de milhar) e 3,14 → 3 vírgula 14
  text = text.replace(/(\d)\.(\d{3})(?!\d)/g, "$1$2");
  text = text.replace(/(\d),(\d)/g, "$1 vírgula $2");

  for (const [pattern, replacement] of UNITS) text = text.replace(pattern, replacement);

  text = text
    .replace(/(\w)²/g, "$1 ao quadrado")
    .replace(/²/g, " ao quadrado")
    .replace(/√/g, " raiz quadrada de ")
    .replace(/π/g, " pi ")
    .replace(/×/g, " vezes ")
    .replace(/÷/g, " dividido por ")
    .replace(/≠/g, " é diferente de ")
    .replace(/≈/g, " aproximadamente ")
    .replace(/↔/g, " e o contrário, ")
    .replace(/→/g, ", então, ")
    .replace(/✔/g, ". Confere! ")
    .replace(/\s=\s/g, " é igual a ")
    .replace(/=/g, " é igual a ")
    .replace(/\s\+\s/g, " mais ")
    .replace(/\s[−-]\s/g, " menos ")
    .replace(/−/g, " menos ")
    .replace(/(\d)\s?x\b/g, "$1 xis")
    .replace(/\bx\b/g, "xis")
    .replace(/\.\.\./g, ", e assim por diante")
    .replace(/[[\]]/g, " ")
    .replace(/[()]/g, ", ")
    .replace(/['"“”‘’]/g, "")
    .replace(/\s*[·—–]\s*/g, ", ");

  return text
    .replace(/\s+,/g, ",")
    .replace(/,(\s*,)+/g, ",")
    .replace(/([.!?:;])\s*,/g, "$1")
    .replace(/,\s*([.!?:;])/g, "$1")
    .replace(/\s+([.!?:;,])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Divide o roteiro em frases curtas, para tocar uma de cada vez e destacar a frase atual. */
export function splitSentences(text: string): string[] {
  const pieces = text.match(/[^.!?…]+[.!?…]*/g) ?? [text];
  const sentences: string[] = [];
  for (const raw of pieces) {
    const sentence = raw.trim();
    if (!sentence) continue;
    // Frases muito longas são quebradas em vírgulas para a voz respirar.
    if (sentence.length > 220) {
      let current = "";
      for (const part of sentence.split(/(?<=,)\s+/)) {
        if ((current + " " + part).length > 200 && current) {
          sentences.push(current.trim());
          current = part;
        } else current = current ? `${current} ${part}` : part;
      }
      if (current.trim()) sentences.push(current.trim());
    } else sentences.push(sentence);
  }
  return sentences.filter((sentence) => /[A-Za-zÀ-ÿ0-9]/.test(sentence));
}
