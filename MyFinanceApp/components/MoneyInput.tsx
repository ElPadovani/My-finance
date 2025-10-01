import React, { useEffect, useRef, useState } from "react";
import { Input, InputField } from "@gluestack-ui/themed";

type MoneyInputProps = {
  handle: (val: number) => void;   // valor em REAIS
  initialValue?: number;           // exemplo: 200 ou 200.5
};

function formatCurrency(n: number) {
  if (isNaN(n)) return "R$ 0,00";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function digitsToAmount(text: string) {
  const onlyDigits = text.replace(/\D/g, "");
  return Number(onlyDigits || "0") / 100;
}

function formatCurrencyFromText(text: string) {
  return formatCurrency(digitsToAmount(text));
}

export default function MoneyInput({ handle, initialValue = 0 }: MoneyInputProps) {
  const [value, setValue] = useState<string>(formatCurrency(initialValue));

  const prevInitial = useRef<number | null>(null);
  const lastEmitted = useRef<number | null>(null);

  // Sincroniza visual com mudanças externas, sem reemitir para o pai
  useEffect(() => {
    if (initialValue !== prevInitial.current) {
      prevInitial.current = initialValue;
      setValue(formatCurrency(initialValue));
    }
  }, [initialValue]);

  const onChangeText = (text: string) => {
    // formata ao digitar
    const formatted = formatCurrencyFromText(text);
    setValue(formatted);

    // emite apenas se o número mudou
    const numeric = digitsToAmount(text);
    if (numeric !== lastEmitted.current) {
      lastEmitted.current = numeric;
      handle(numeric);
    }
  };

  return (
    <Input>
      <InputField
        keyboardType="numeric"
        placeholder="R$ 0,00"
        value={value}
        onChangeText={onChangeText}
      />
    </Input>
  );
}
