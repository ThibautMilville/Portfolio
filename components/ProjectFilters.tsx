'use client';

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal } from 'lucide-react';

export interface ProjectFilterState {
  search: string;
  organization: string | 'all';
  techs: string[];
  years: string[];
  status: 'all' | 'Terminé' | 'En cours' | 'En pause';
  category: string | 'all';
}

interface ProjectFiltersProps {
  value: ProjectFilterState;
  onChange: (next: ProjectFilterState) => void;
  organizations: string[];
  technologies: string[];
  years: string[];
  categories: string[];
}

export default function ProjectFilters({ value, onChange, organizations, technologies, years, categories }: ProjectFiltersProps) {
  const techCount = value.techs.length;
  const yearCount = value.years.length;

  const clearAll = () =>
    onChange({ search: '', organization: 'all', techs: [], years: [], status: 'all', category: 'all' });

  const selectedSummary = useMemo(() => {
    const parts: string[] = [];
    if (value.organization !== 'all') parts.push(`Org: ${value.organization}`);
    if (value.category !== 'all') parts.push(`Cat: ${value.category}`);
    if (value.status !== 'all') parts.push(`Statut: ${value.status}`);
    if (techCount) parts.push(`${techCount} tech` + (techCount > 1 ? 's' : ''));
    if (yearCount) parts.push(`${yearCount} année` + (yearCount > 1 ? 's' : ''));
    return parts.join(' • ');
  }, [value, techCount, yearCount]);

  return (
    <div className="sticky top-16 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-xl p-4 mb-8">
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
        <div className="flex-1">
          <Input
            value={value.search}
            onChange={(e) => onChange({ ...value, search: e.target.value })}
            placeholder="Rechercher par nom..."
          />
        </div>

        <Select
          value={value.organization}
          onValueChange={(v) => onChange({ ...value, organization: v as ProjectFilterState['organization'] })}
        >
          <SelectTrigger className="w-full lg:w-[220px]">
            <SelectValue placeholder="Organisation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les organisations</SelectItem>
            {organizations.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.category}
          onValueChange={(v) => onChange({ ...value, category: v as ProjectFilterState['category'] })}
        >
          <SelectTrigger className="w-full lg:w-[200px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.status}
          onValueChange={(v) => onChange({ ...value, status: v as ProjectFilterState['status'] })}
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="Terminé">Terminé</SelectItem>
            <SelectItem value="En cours">En cours</SelectItem>
            <SelectItem value="En pause">En pause</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full lg:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Technologies {techCount ? <Badge variant="secondary" className="ml-2">{techCount}</Badge> : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              {technologies.map((tech) => {
                const checked = value.techs.includes(tech);
                return (
                  <label key={tech} className="flex items-center gap-2 text-sm">
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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full lg:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Années {yearCount ? <Badge variant="secondary" className="ml-2">{yearCount}</Badge> : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-col gap-2 max-h-60 overflow-auto pr-1">
              {years.map((y) => {
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

        <Button variant="ghost" onClick={clearAll} className="w-full lg:w-auto">Réinitialiser</Button>
      </div>

      {selectedSummary && (
        <div className="mt-3 text-xs text-muted-foreground">
          {selectedSummary}
        </div>
      )}
    </div>
  );
}


