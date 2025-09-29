import React, { useState } from "react";
import { Input, InputField } from "@gluestack-ui/themed";
import { currencyToNumber } from "@/helpers/currencyToNumber";

export default function MoneyInput({ handle, initialValue }: { handle: (val: number) => void, initialValue?: number }) {
  const [value, setValue] = useState(initialValue?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? "");

  function formatCurrency(text: string) {
    // remove caracteres não numéricos
    const numericValue = text.replace(/\D/g, "");

    // divide por 100 para colocar as casas decimais
    const amount = (Number(numericValue) / 100).toFixed(2);

    // formata para BRL
    return "R$ " + amount.replace(".", ",");
  }

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
