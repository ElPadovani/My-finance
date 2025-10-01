import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Platform, Modal, TextInput } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import {
  Box, HStack, Pressable, Input, InputField, Button, ButtonText, Text,
} from "@gluestack-ui/themed";

type Props = {
  handle: (val: Date | null) => void;
  initialValue?: Date | null;
  placeholder?: string;      // "dd/mm/aaaa"
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  locale?: string;           // "pt-BR"
  allowClear?: boolean;      // opcional
  title?: string;
  confirmText?: string;
  cancelText?: string;
};

const formatDDMMYYYY = (d: Date | null) => {
  if (!d) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const getTimeOrNull = (d: Date | null) => (d ? d.getTime() : null);

const DateInputModal: React.FC<Props> = ({
  handle,
  initialValue = null,
  placeholder = "dd/mm/aaaa",
  minDate,
  maxDate,
  disabled = false,
  locale = "pt-BR",
  allowClear = false,  // padrão false (opcional)
  title = "Selecionar data",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  const [value, setValue] = useState<Date | null>(initialValue ?? null);
  const [visible, setVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(initialValue ?? new Date());
  const inputRef = useRef<TextInput>(null);

  // sincroniza props -> estado, sem setar igual ao que já está
  useEffect(() => {
    const nextValue = initialValue ?? null;
    if (getTimeOrNull(nextValue) !== getTimeOrNull(value)) {
      setValue(nextValue);
    }
    const nextTemp = initialValue ?? new Date();
    if (tempDate.getTime() !== nextTemp.getTime()) {
      setTempDate(nextTemp);
    }
  }, [initialValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayText = useMemo(() => formatDDMMYYYY(value), [value]);

  const open = useCallback(() => {
    if (disabled) return;
    setTempDate(value ?? new Date());
    inputRef.current?.blur?.();
    setVisible(true);
  }, [disabled, value]);

  const close = useCallback(() => setVisible(false), []);

  const coerceRange = useCallback((d: Date) => {
    let chosen = d;
    if (minDate && chosen < minDate) chosen = minDate;
    if (maxDate && chosen > maxDate) chosen = maxDate;
    return chosen;
  }, [minDate, maxDate]);

  const confirmIOS = useCallback(() => {
    const chosen = coerceRange(tempDate);
    // só envia se mudou
    if (getTimeOrNull(chosen) !== getTimeOrNull(value)) {
      setValue(chosen);
      handle(chosen);
    }
    close();
  }, [coerceRange, tempDate, value, handle, close]);

  const clear = useCallback(() => {
    if (value !== null) {
      setValue(null);
      handle(null);
    }
  }, [handle, value]);

  const onChangeAndroid = (event: DateTimePickerEvent, selected?: Date) => {
    if (event.type === "dismissed") {
      close();
      return;
    }
    if (selected) {
      const chosen = coerceRange(selected);
      if (getTimeOrNull(chosen) !== getTimeOrNull(value)) {
        setValue(chosen);
        handle(chosen);
      }
    }
    close();
  };

  const onChangeIOS = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) setTempDate(selected);
  };

  return (
    <>
      <Input>
        <InputField
          ref={inputRef as any}
          value={displayText}
          placeholder={placeholder}
          editable={!disabled}
          caretHidden
          showSoftInputOnFocus={false}
          onFocus={open}
          onPressIn={open}
          accessibilityLabel="Selecionar data"
        />
      </Input>

      {allowClear && (
        <Button mt="$2" variant="outline" onPress={clear} isDisabled={disabled || !value}>
          <ButtonText>Limpar</ButtonText>
        </Button>
      )}

      {Platform.OS === "android" ? (
        visible ? (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="calendar"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={onChangeAndroid}
          />
        ) : null
      ) : (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
          <Pressable onPress={close} sx={{ position: "absolute", inset: 0, bg: "rgba(0,0,0,0.45)" }} />
          <Box
            sx={{
              position: "absolute",
              left: 16,
              right: 16,
              top: "20%",
              borderRadius: 16,
              bg: "$background0",
              p: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            {!!title && (
              <Text mb="$3" size="lg" fontWeight="$bold">
                {title}
              </Text>
            )}
            <Box sx={{ borderWidth: 1, borderColor: "$border300", borderRadius: 12, overflow: "hidden" }}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                minimumDate={minDate}
                maximumDate={maxDate}
                onChange={onChangeIOS}
                locale={locale}
              />
            </Box>
            <HStack mt="$4" space="sm" justifyContent="flex-end">
              <Button variant="outline" onPress={close}>
                <ButtonText>{cancelText}</ButtonText>
              </Button>
              <Button onPress={confirmIOS}>
                <ButtonText>{confirmText}</ButtonText>
              </Button>
            </HStack>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default DateInputModal;