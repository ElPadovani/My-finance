export function currencyToNumber(value: string): number {
  if (!value) return 0;

  return Number(
    value
      .replace("R$", "")   // remove símbolo
      .replace(/\./g, "")  // remove pontos
      .replace(",", ".")   // troca vírgula por ponto
      .trim()
  );
}