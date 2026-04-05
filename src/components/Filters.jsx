"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, ListFilter as FilterXIcon } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSearchQuery,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
} from "@/redux/filtersSlice";
import { ALL_CATEGORIES } from "@/utils/categories";

export function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[200px] flex-1">
            <label className="mb-2 block text-sm font-medium">Search</label>
            <div className="relative">
              <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                placeholder="Search transactions..."
                value={filters.searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-9"
              />
            </div>
          </div>

          <div className="min-w-[150px]">
            <label className="mb-2 block text-sm font-medium">Type</label>
            <Select
              value={filters.typeFilter}
              onValueChange={(value) => dispatch(setTypeFilter(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[180px]">
            <label className="mb-2 block text-sm font-medium">Category</label>
            <Select
              value={filters.categoryFilter}
              onValueChange={(value) => dispatch(setCategoryFilter(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {ALL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[150px]">
            <label className="mb-2 block text-sm font-medium">Sort By</label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => dispatch(setSortBy(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[150px]">
            <label className="mb-2 block text-sm font-medium">Order</label>
            <Select
              value={filters.sortOrder}
              onValueChange={(value) => dispatch(setSortOrder(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Descending</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            onClick={() => dispatch(resetFilters())}
            className="whitespace-nowrap"
          >
            <FilterXIcon />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
