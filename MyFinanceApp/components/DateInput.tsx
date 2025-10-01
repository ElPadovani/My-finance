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

const DateInputModal: React.FC<Props> = ({
  handle,
  initialValue = null,
  placeholder = "dd/mm/aaaa",
  minDate,
  maxDate,
  disabled = false,
  locale = "pt-BR",
  allowClear = false,                 // agora opcional (padrão false)
  title = "Selecionar data",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  const [value, setValue] = useState<Date | null>(initialValue ?? null);
  const [visible, setVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(initialValue ?? new Date());
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setValue(initialValue ?? null);
    setTempDate(initialValue ?? new Date());
  }, [initialValue]);

  const displayText = useMemo(() => formatDDMMYYYY(value), [value]);

  const open = useCallback(() => {
    if (disabled) return;
    setTempDate(value ?? new Date());
    inputRef.current?.blur?.();
    setVisible(true);
  }, [disabled, value]);

  const close = useCallback(() => setVisible(false), []);

  const confirmIOS = useCallback(() => {
    let chosen = tempDate;
    if (minDate && chosen < minDate) chosen = minDate;
    if (maxDate && chosen > maxDate) chosen = maxDate;
    setValue(chosen);
    handle(chosen);
    close();
  }, [tempDate, minDate, maxDate, handle, close]);

  const clear = useCallback(() => {
    setValue(null);
    handle(null);
  }, [handle]);

  // ANDROID: o próprio componente abre o diálogo nativo
  const onChangeAndroid = (event: DateTimePickerEvent, selected?: Date) => {
    if (event.type === "dismissed") {
      close();
      return;
    }
    if (selected) {
      let chosen = selected;
      if (minDate && chosen < minDate) chosen = minDate;
      if (maxDate && chosen > maxDate) chosen = maxDate;
      setValue(chosen);
      handle(chosen);
    }
    close();
  };

  // iOS: atualiza tempDate em tempo real dentro do Modal
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
        // ANDROID: sem Modal próprio — evita sobreposição do seu print
        visible ? (
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="calendar"
            minimumDate={minDate}
            maximumDate={maxDate}
            onChange={onChangeAndroid}
            // locale={locale}
          />
        ) : null
      ) : (
        // iOS: Modal com layout gluestack
        <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
          <Pressable
            onPress={close}
            sx={{ position: "absolute", inset: 0, bg: "rgba(0,0,0,0.45)" }}
          />
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