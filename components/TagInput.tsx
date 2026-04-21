"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TagInputProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "value" | "onChange"> {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder = "Add tag...",
  maxTags = 10,
  disabled = false,
  className,
  ...props
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim().toLowerCase();
      if (
        trimmedTag &&
        !value.includes(trimmedTag) &&
        value.length < maxTags
      ) {
        onChange([...value, trimmedTag]);
        setInputValue("");
      }
    },
    [value, onChange, maxTags]
  );

  const removeTag = React.useCallback(
    (tagToRemove: string) => {
      onChange(value.filter((tag) => tag !== tagToRemove));
    },
    [value, onChange]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
      }
      if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeTag(value[value.length - 1]);
      }
    },
    [inputValue, addTag, removeTag, value]
  );

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  }, [inputValue, addTag]);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleContainerClick = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleTagButtonClick = React.useCallback(
    (e: React.MouseEvent, tag: string) => {
      e.stopPropagation();
      if (!disabled) {
        removeTag(tag);
      }
    },
    [disabled, removeTag]
  );

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 p-3 bg-slate-900 border border-slate-800 rounded-lg",
        "min-h-[48px] transition-colors",
        isFocused && "border-emerald-500/50 ring-1 ring-emerald-500/20",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleContainerClick}
      {...props}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className={cn(
            "inline-flex items-center gap-1 px-3 py-1",
            "bg-emerald-500/10 text-emerald-400 text-sm rounded-full",
            "border border-emerald-500/20",
            "transition-colors"
          )}
        >
          #{tag}
          <button
            type="button"
            onClick={(e) => handleTagButtonClick(e, tag)}
            disabled={disabled}
            className={cn(
              "hover:text-emerald-300 transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            aria-label={`Remove tag ${tag}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {!disabled && value.length < maxTags && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          placeholder={value.length === 0 ? placeholder : ""}
          className={cn(
            "flex-1 min-w-[120px] bg-transparent text-slate-50",
            "placeholder:text-slate-500 outline-none",
            "text-sm"
          )}
          disabled={disabled}
        />
      )}
      {disabled && value.length >= maxTags && (
        <span className="flex items-center text-xs text-slate-500 self-center">
          Maksimal {maxTags} tag
        </span>
      )}
    </div>
  );
}