// Pequenas preferências guardadas só neste aparelho (tópicos estudados, rascunhos).
// Tudo protegido com try/catch: em janela anônima a página continua funcionando.

const PREFIX = "estudos5:";

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* sem armazenamento: tudo bem */
  }
}
