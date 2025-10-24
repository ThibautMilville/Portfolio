"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

// Constantes pour les statuts
const STATUS_VALUES = {
  ALL: "all",
  COMPLETED: "Terminé",
  IN_PROGRESS: "En cours", 
  PAUSED: "En pause"
} as const;
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Search, X } from "lucide-react";

export interface ProjectFilterState {
  search: string;
  organization: string | "all";
  techs: string[];
  years: string[];
  status: "all" | "Terminé" | "En cours" | "En pause";
  category: string | "all";
}

interface ProjectFiltersProps {
  value: ProjectFilterState;
  onChange: (next: ProjectFilterState) => void;
  organizations: string[];
  technologies: string[];
  years: string[];
  categories: string[];
  t: any;
}

export default function ProjectFilters({
  value,
  onChange,
  organizations,
  technologies,
  years,
  categories,
  t,
}: ProjectFiltersProps) {
  const techCount = value.techs.length;
  const yearCount = value.years.length;

  // Recherches locales dans les popovers
  const [techQuery, setTechQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const [catQuery, setCatQuery] = useState("");

  const clearAll = () =>
    onChange({
      search: "",
      organization: "all",
      techs: [],
      years: [],
      status: STATUS_VALUES.ALL,
      category: "all",
    });

  const selectedSummary = useMemo(() => {
    const parts: string[] = [];
    if (value.organization !== "all") parts.push(`Org: ${value.organization}`);
    if (value.category !== "all") parts.push(`Cat: ${value.category}`);
    if (value.status !== STATUS_VALUES.ALL) parts.push(`${t('filters.status')}: ${value.status}`);
    if (techCount) parts.push(`${techCount} tech` + (techCount > 1 ? "s" : ""));
    if (yearCount)
      parts.push(`${yearCount} année` + (yearCount > 1 ? "s" : ""));
    return parts.join(" • ");
  }, [value, techCount, yearCount]);

  return (
    <div className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-2xl p-4 mb-8">
      {/* Ligne 1 : barre de recherche pleine largeur */}
      <div className="mb-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder={t('filters.search')}
            className="w-full h-14 lg:h-16 text-base lg:text-lg pl-12 pr-12 rounded-full shadow-sm"
          />
          {value.search && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={t('filters.clearAll')}
              onClick={() => onChange({ ...value, search: "" })}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {/* Ligne 2 : filtres sous la barre (grid responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 items-center">
        <Popover
          onOpenChange={(open) => {
            if (!open) {
              try {
                (document.activeElement as HTMLElement)?.blur?.();
              } catch {}
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              {value.organization === "all" ? t('filters.organization') : value.organization}
              {value.organization !== "all" ? (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] sm:max-w-md md:max-w-lg">
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.organization === "all" ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, organization: "all" })}
              >
                {t('filters.allOrganizations')}
              </button>
              {organizations.map((org) => (
                <button
                  key={org}
                  className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                    value.organization === org ? "bg-accent" : ""
                  }`}
                  onClick={() =>
                    onChange({
                      ...value,
                      organization: org as ProjectFilterState["organization"],
                    })
                  }
                >
                  {org}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Catégories avec recherche */}
        <Popover
          onOpenChange={(open) => {
            if (!open) {
              try {
                (document.activeElement as HTMLElement)?.blur?.();
              } catch {}
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {value.category === "all" ? t('filters.category') : value.category}
              {value.category !== "all" ? (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] sm:max-w-md md:max-w-lg">
            <div className="mb-2">
              <Input
                value={catQuery}
                onChange={(e) => setCatQuery(e.target.value)}
                placeholder={t('filters.searchCategory')}
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.category === "all" ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, category: "all" })}
              >
                {t('filters.allCategories')}
              </button>
              {categories
                .filter((c) => c.toLowerCase().includes(catQuery.toLowerCase()))
                .map((cat) => (
                  <button
                    key={cat}
                    className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                      value.category === cat ? "bg-accent" : ""
                    }`}
                    onClick={() =>
                      onChange({
                        ...value,
                        category: cat as ProjectFilterState["category"],
                      })
                    }
                  >
                    {cat}
                  </button>
                ))}
            </div>
          </PopoverContent>
        </Popover>

        <Popover
          onOpenChange={(open) => {
            if (!open) {
              try {
                (document.activeElement as HTMLElement)?.blur?.();
              } catch {}
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              {value.status === STATUS_VALUES.ALL ? t('filters.status') : value.status}
              {value.status !== STATUS_VALUES.ALL ? (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] sm:max-w-md md:max-w-lg">
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.status === STATUS_VALUES.ALL ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, status: STATUS_VALUES.ALL })}
              >
                {t('filters.allStatuses')}
              </button>
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.status === STATUS_VALUES.COMPLETED ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, status: STATUS_VALUES.COMPLETED })}
              >
                {t('filters.completed')}
              </button>
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.status === STATUS_VALUES.IN_PROGRESS ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, status: STATUS_VALUES.IN_PROGRESS })}
              >
                {t('filters.inProgress')}
              </button>
              <button
                className={`text-left text-sm px-2 py-1 rounded hover:bg-accent ${
                  value.status === STATUS_VALUES.PAUSED ? "bg-accent" : ""
                }`}
                onClick={() => onChange({ ...value, status: STATUS_VALUES.PAUSED })}
              >
                {t('filters.paused')}
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Technologies avec recherche intégrée */}
        <Popover
          onOpenChange={(open) => {
            if (!open) {
              try {
                (document.activeElement as HTMLElement)?.blur?.();
              } catch {}
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none cursor-pointer"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {t('filters.technologies')}{" "}
              {techCount ? (
                <Badge variant="secondary" className="ml-2">
                  {techCount}
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] sm:max-w-md md:max-w-lg">
            <div className="mb-2">
              <Input
                value={techQuery}
                onChange={(e) => setTechQuery(e.target.value)}
                placeholder={t('filters.searchTechnologies')}
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              {technologies
                .filter((t) =>
                  t.toLowerCase().includes(techQuery.toLowerCase())
                )
                .map((tech) => {
                  const checked = value.techs.includes(tech);
                  return (
                  <label
                      key={tech}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => {
                          const next = new Set(value.techs);
                          if (c) next.add(tech);
                          else next.delete(tech);
                          onChange({ ...value, techs: Array.from(next) });
                        }}
                      />
                      {tech}
                    </label>
                  );
                })}
            </div>
          </PopoverContent>
        </Popover>

        {/* Années (optionnel) */}
        <Popover
          onOpenChange={(open) => {
            if (!open) {
              try {
                (document.activeElement as HTMLElement)?.blur?.();
              } catch {}
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none cursor-pointer"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {t('filters.years')}{" "}
              {yearCount ? (
                <Badge variant="secondary" className="ml-2">
                  {yearCount}
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto max-w-[90vw] sm:max-w-md md:max-w-lg">
            <div className="mb-2">
              <Input
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                placeholder={t('filters.searchYears')}
                className="h-9"
              />
            </div>
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              {years
                .filter((y) =>
                  y.toLowerCase().includes(yearQuery.toLowerCase())
                )
                .map((y) => {
                  const checked = value.years.includes(y);
                  return (
                  <label key={y} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => {
                          const next = new Set(value.years);
                          if (c) next.add(y);
                          else next.delete(y);
                          onChange({ ...value, years: Array.from(next) });
                        }}
                      />
                      {y}
                    </label>
                  );
                })}
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          onClick={clearAll}
          className="w-full h-11 rounded-full"
        >
          {t('filters.clearAll')}
        </Button>
      </div>

      {/* Ligne 3 : tags sélectionnés (chips dismissibles) */}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.organization !== "all" && (
          <Badge variant="secondary" className="px-3 py-1">
            {value.organization}
            <button
              className="ml-2"
              onClick={() => onChange({ ...value, organization: "all" })}
              aria-label="Supprimer"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {value.category !== "all" && (
          <Badge variant="secondary" className="px-3 py-1 dark:bg-black dark:text-white">
            {value.category}
            <button
              className="ml-2"
              onClick={() => onChange({ ...value, category: "all" })}
              aria-label="Supprimer"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {value.status !== STATUS_VALUES.ALL && (
          <Badge variant="secondary" className="px-3 py-1">
            {value.status}
            <button
              className="ml-2"
              onClick={() => onChange({ ...value, status: STATUS_VALUES.ALL })}
              aria-label="Supprimer"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {value.techs.map((t) => (
          <Badge key={t} variant="outline" className="px-3 py-1">
            {t}
            <button
              className="ml-2"
              onClick={() =>
                onChange({
                  ...value,
                  techs: value.techs.filter((x) => x !== t),
                })
              }
              aria-label={`Retirer ${t}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {value.years.map((y) => (
          <Badge key={y} variant="outline" className="px-3 py-1">
            {y}
            <button
              className="ml-2"
              onClick={() =>
                onChange({
                  ...value,
                  years: value.years.filter((x) => x !== y),
                })
              }
              aria-label={`Retirer ${y}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
