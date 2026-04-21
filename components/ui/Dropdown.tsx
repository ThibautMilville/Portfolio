"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  value?: string | null;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  searchable?: boolean;
  forceBelow?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = "Selectionner...",
  searchPlaceholder = "Rechercher...",
  label,
  disabled = false,
  error,
  className = "",
  searchable = false,
  forceBelow = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openUpward, setOpenUpward] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(240);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value) || null;
  const filteredOptions = searchable
    ? options.filter((option) => {
        if (!searchTerm.trim()) return true;
        if (typeof option.label !== "string") return true;
        return option.label.toLowerCase().includes(searchTerm.trim().toLowerCase());
      })
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        setSearchTerm("");
      }
      return next;
    });
  };

  const handleSelect = (option: DropdownOption) => {
    if (disabled || option.disabled) return;
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    const shouldOpenUpward = !forceBelow && spaceBelow < 220 && spaceAbove > spaceBelow;
    setOpenUpward(shouldOpenUpward);
    setMenuMaxHeight(Math.max(140, Math.min(320, shouldOpenUpward ? spaceAbove : spaceBelow)));
  }, [isOpen, forceBelow]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setActiveIndex(options.findIndex((opt) => opt.value === value) || 0);
        } else if (activeIndex != null && options[activeIndex] && !options[activeIndex].disabled) {
          handleSelect(options[activeIndex]);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) => {
          if (prev == null) return 0;
          const next = prev + 1;
          return next >= options.length ? 0 : next;
        });
        break;
      case "ArrowUp":
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) => {
          if (prev == null) return options.length - 1;
          const next = prev - 1;
          return next < 0 ? options.length - 1 : next;
        });
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative text-sm ${className}`}>
      {label ? (
        <label
          className={`mb-1 block text-sm font-medium text-foreground ${!disabled ? "cursor-pointer" : ""}`}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!disabled && isOpen) {
              setIsOpen(false);
              setSearchTerm("");
            }
          }}
        >
          {label}
        </label>
      ) : null}

      <button
        type="button"
        className={`flex h-[40px] w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors focus:outline-none ${
          disabled
            ? "cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-background text-foreground hover:bg-muted/20"
        } ${error ? "border-destructive" : "border-border"}`}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span
          className={`inline-flex h-5 items-center leading-none translate-y-[0.5px] ${
            selectedOption ? "truncate" : "text-muted-foreground"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          } ${disabled ? "text-muted-foreground/60" : "text-muted-foreground"}`}
        />
      </button>

      {isOpen ? (
        <ul
          className={`absolute z-[100000] w-full overflow-auto rounded-lg border border-border bg-background shadow-lg ${
            openUpward ? "bottom-full mb-1" : "top-full mt-1"
          }`}
          style={{ maxHeight: `${menuMaxHeight}px` }}
          role="listbox"
        >
          {searchable ? (
            <li className="sticky top-0 z-10 border-b border-border bg-background p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </li>
          ) : null}
          {filteredOptions.length === 0 ? (
            <li className="px-3 py-2 text-xs text-muted-foreground">Aucune option disponible</li>
          ) : null}
          {filteredOptions.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors ${
                  option.disabled
                    ? "cursor-default bg-muted text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    : isActive
                    ? "bg-primary/10 text-primary"
                    : isSelected
                    ? "bg-muted text-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  handleSelect(option);
                }}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && !option.disabled ? (
                  <span className="ml-2 text-xs text-primary">Selectionne</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
};

export default Dropdown;
