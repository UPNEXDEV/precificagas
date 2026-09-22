/** Illustrative values for the visual mockups only — not product data. */
export const exampleProduct = "Bolo de Chocolate"

export const exampleCosts = [
  { label: "Ingredientes", value: 28.4 },
  { label: "Embalagem", value: 4.5 },
  { label: "Mão de obra", value: 15.0 },
  { label: "Outros custos", value: 6.1 },
] as const

export const exampleTotal = exampleCosts.reduce((sum, c) => sum + c.value, 0) // 54,00
export const examplePrice = 90
export const exampleMargin = (examplePrice - exampleTotal) / examplePrice // 0,40

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 })

export const pct = (n: number) => `${Math.round(n * 100)}%`
