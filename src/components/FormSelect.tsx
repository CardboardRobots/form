"use client";

import React, { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

export const SelectFormControl = styled(FormControl)({
  minWidth: 120,
});

type FormSelectProps<T extends FieldValues, TOption> = SelectProps & {
  labelId?: string;
  name: Path<T>;
  control: Control<T>;
  label: ReactNode;
  helperText?: ReactNode;
  layout?: "xs" | "sm";
  maxLength?: number;
  options: TOption[];
  optionKey?: keyof TOption | ((value: TOption) => string);
  optionValue?: keyof TOption | ((value: TOption) => string);
  optionName?: keyof TOption | ((value: TOption) => string);
  emptyKey?: string;
  emptyValue?: string;
  emptyName?: string;
  allowEmpty?: boolean;
};

export function FormSelect<T extends FieldValues, TOption>({
  variant = "filled",
  labelId,
  control,
  name,
  label,
  maxLength,
  inputProps,
  required,
  helperText,
  options,
  optionKey,
  optionValue,
  optionName,
  allowEmpty,
  emptyKey,
  emptyName,
  emptyValue,
  ...props
}: FormSelectProps<T, TOption>) {
  return (
    <SelectFormControl variant={variant} fullWidth>
      <InputLabel id={labelId} required={required}>
        {label}
      </InputLabel>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={{ required }}
        render={({ field: { value, ...field }, fieldState: { error } }) => (
          <>
            <Select
              {...props}
              required={required}
              value={value ?? ""}
              {...field}
              error={Boolean(error)}
            >
              {allowEmpty && (
                <MenuItem
                  key={emptyKey ?? emptyValue ?? emptyName ?? ""}
                  value={emptyValue ?? emptyKey ?? emptyName ?? ""}
                >
                  {emptyName ?? emptyValue ?? emptyKey ?? ""}
                </MenuItem>
              )}
              {options.map((option) => {
                const { key, value, name } = getKeyAndValue(
                  option,
                  optionKey,
                  optionValue,
                  optionName
                );
                return (
                  <MenuItem key={key} value={value}>
                    {name}
                  </MenuItem>
                );
              })}
            </Select>
            {error && (
              <FormHelperText>{error.message ?? helperText}</FormHelperText>
            )}
          </>
        )}
      />
    </SelectFormControl>
  );
}

function getKeyAndValue<TOption>(
  option: TOption,
  optionKey?: keyof TOption | ((value: TOption) => string),
  optionValue?: keyof TOption | ((value: TOption) => string),
  optionName?: keyof TOption | ((value: TOption) => string)
) {
  // eslint-disable-next-line no-nested-ternary
  const _key = optionKey
    ? typeof optionKey === "function"
      ? optionKey(option)
      : option[optionKey]
    : option;
  // eslint-disable-next-line no-nested-ternary
  const _value = optionValue
    ? typeof optionValue === "function"
      ? optionValue(option)
      : option[optionValue]
    : option;
  // eslint-disable-next-line no-nested-ternary
  const _name = optionName
    ? typeof optionName === "function"
      ? optionName(option)
      : option[optionName]
    : option;
  const key = (_key as string).toString();
  const value = (_value as string).toString();
  const name = (_name as string).toString();
  return { key, value, name };
}
