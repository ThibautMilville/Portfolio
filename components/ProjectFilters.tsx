"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
}

export default function ProjectFilters({
  value,
  onChange,
  organizations,
  technologies,
  years,
  categories,
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
      status: "all",
      category: "all",
    });

  const selectedSummary = useMemo(() => {
    const parts: string[] = [];
    if (value.organization !== "all") parts.push(`Org: ${value.organization}`);
    if (value.category !== "all") parts.push(`Cat: ${value.category}`);
    if (value.status !== "all") parts.push(`Statut: ${value.status}`);
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
            placeholder="Rechercher un projet, une techno, une catégorie..."
            className="w-full h-14 lg:h-16 text-base lg:text-lg pl-12 pr-12 rounded-full shadow-sm"
          />
          {value.search && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Effacer la recherche"
              onClick={() => onChange({ ...value, search: "" })}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {/* Ligne 2 : filtres sous la barre (grid responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 items-center">
        <Select
          value={value.organization}
          onValueChange={(v) =>
            onChange({
              ...value,
              organization: v as ProjectFilterState["organization"],
            })
          }
        >
          <SelectTrigger className="w-full rounded-full h-11 justify-center text-center focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
            <SelectValue placeholder="Organisation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Organisation</SelectItem>
            {organizations.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
              {value.category === "all" ? "Catégorie" : value.category}
              {value.category !== "all" ? (
                <Badge variant="secondary" className="ml-2">
                  1
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="mb-2">
              <Input
                value={catQuery}
                onChange={(e) => setCatQuery(e.target.value)}
                placeholder="Rechercher une catégorie..."
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
                Toutes les catégories
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

        <Select
          value={value.status}
          onValueChange={(v) =>
            onChange({ ...value, status: v as ProjectFilterState["status"] })
          }
        >
          <SelectTrigger className="w-full rounded-full h-11 justify-center text-center focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Statut</SelectItem>
            <SelectItem value="Terminé">Terminé</SelectItem>
            <SelectItem value="En cours">En cours</SelectItem>
            <SelectItem value="En pause">En pause</SelectItem>
          </SelectContent>
        </Select>

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
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Technologies{" "}
              {techCount ? (
                <Badge variant="secondary" className="ml-2">
                  {techCount}
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="mb-2">
              <Input
                value={techQuery}
                onChange={(e) => setTechQuery(e.target.value)}
                placeholder="Rechercher une techno..."
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
                      className="flex items-center gap-2 text-sm"
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
              className="w-full rounded-full h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Années{" "}
              {yearCount ? (
                <Badge variant="secondary" className="ml-2">
                  {yearCount}
                </Badge>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="mb-2">
              <Input
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                placeholder="Filtrer une année..."
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
                    <label key={y} className="flex items-center gap-2 text-sm">
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
          Réinitialiser
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
          <Badge variant="secondary" className="px-3 py-1">
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
        {value.status !== "all" && (
          <Badge variant="secondary" className="px-3 py-1">
            {value.status}
            <button
              className="ml-2"
              onClick={() => onChange({ ...value, status: "all" })}
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
