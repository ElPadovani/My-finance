import React, { useState } from "react";
import { Input, InputField } from "@gluestack-ui/themed";
import { currencyToNumber } from "@/helpers/currencyToNumber";

export function formatCurrency(text: string | number) {
  if (typeof text === "number") {
    return text.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // remove caracteres não numéricos
  const numericValue = text.replace(/\D/g, "");

  if (!numericValue) return "R$ 0,00";

  // divide por 100 para colocar as casas decimais
  const amount = (Number(numericValue) / 100).toFixed(2);

  // formata para BRL
  return (
    "R$ " +
    amount
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") // adiciona separador de milhar
  );
};

export default function MoneyInput({ handle, initialValue }: { handle: (val: number) => void, initialValue?: number }) {

  const [value, setValue] = useState(
    initialValue !== undefined ? formatCurrency(initialValue) : ""
  );

  function handleChange(text: string) {
    const formatted = formatCurrency(text);
    setValue(formatted);
    handle(currencyToNumber(formatted))
  }

  return (
    <Input>
      <InputField
        keyboardType="numeric"
        placeholder="R$ 0,00"
        value={value}
        onChangeText={handleChange}
      />
    </Input>
  );
}
