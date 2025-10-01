import React, { useState, useEffect } from "react";
import { Input, InputField } from "@gluestack-ui/themed";
import { currencyToNumber } from "@/helpers/currencyToNumber";

type MoneyInputProps = {
  handle: (val: number) => void;   // valor em REAIS
  initialValue?: number;           // exemplo: 200 ou 200.5
};

function formatCurrency(n: number) {
  if (isNaN(n)) return "R$ 0,00";
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatCurrencyFromText(text: string) {
  const onlyDigits = text.replace(/\D/g, "");
  const amount = Number(onlyDigits || "0") / 100; // aqui sim divide, pq é input cru
  return formatCurrency(amount);
}

export default function MoneyInput({ handle, initialValue }: MoneyInputProps) {
  const [value, setValue] = useState(
    initialValue != null ? formatCurrency(parseFloat(initialValue.toString())) : ""
  );

  useEffect(() => {
    if (initialValue != null) {
      const normalized = parseFloat(initialValue.toString());
      setValue(formatCurrency(normalized));
      handle(normalized);
    }
  }, [initialValue, handle]);

  function handleChange(text: string) {
    const formatted = formatCurrencyFromText(text);
    setValue(formatted);
    handle(currencyToNumber(formatted));
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
