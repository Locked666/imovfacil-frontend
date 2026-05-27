export function formatCurrency(value: number, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export function formatArea(value: number) {
  return `${formatNumber(value)} m²`
}

export function formatHectares(value?: number) {
  if (typeof value !== "number") {
    return "N/A"
  }

  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} ha`
}

