"use client";

import React, { FC } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { InputAdornment } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export type FormInputProps<T extends FieldValues = FieldValues> =
  TextFieldProps & {
    name: Path<T>;
    control: Control<T>;
    layout?: "xs" | "sm" | "all";
    maxLength?: number;
    suggestions?: string[];
    unit?: any;
  };

export function FormInput<T extends FieldValues = FieldValues>({
  control,
  name,
  maxLength,
  required,
  helperText,
  suggestions,
  unit,
  slotProps,
  variant = "filled",
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={{ required }}
      render={({
        field: { value, onChange, ...field },
        fieldState: { error },
      }) => (
        <>
          <TextField
            variant={variant}
            required={required}
            slotProps={{
              ...slotProps,
              htmlInput: {
                maxLength,
                ...slotProps?.htmlInput,
              },
              input: unit
                ? {
                    startAdornment: (
                      <InputAdornment position="start">{unit}</InputAdornment>
                    ),
                    ...slotProps?.input,
                  }
                : undefined,
            }}
            helperText={error?.message ?? helperText}
            error={Boolean(error)}
            {...props}
            value={value ?? ""}
            onChange={onChange}
            {...field}
          />
          <Suggestions
            suggestions={suggestions}
            onClick={(suggestion: string) => {
              onChange(suggestion);
            }}
          />
        </>
      )}
    />
  );
}

const SuggestionContainer = styled("div")(({ theme }) => ({
  display: "flex",
  margin: theme.spacing(1, 0),
  gap: theme.spacing(1),
}));

const Suggestions: FC<{
  suggestions?: string[];
  onClick: (suggestion: string) => void;
}> = ({ suggestions, onClick }) => {
  if (!suggestions?.length) {
    return null;
  }
  return (
    <SuggestionContainer>
      {suggestions.map((suggestion) => (
        <Chip
          key={suggestion}
          label={suggestion}
          onClick={onClick.bind(null, suggestion)}
        />
      ))}
    </SuggestionContainer>
  );
};
