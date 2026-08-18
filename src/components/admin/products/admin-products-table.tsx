"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Columns3,
  Copy,
  Eye,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Search,
  Star,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ProductStatus =
  | "DRAFT"
  | "ACTIVE"
  | "ARCHIVED";

type ProductRow = {
  id: string;
  name: string;
  slug: string;

  price: number;
  discountPrice: number | null;

  image: string | null;

  status: ProductStatus;

  isFeatured: boolean;
  isNewArrival: boolean;

  categoryName: string;
  dressStyleName: string;

  totalStock: number;
  variantCount: number;

  sku: string;
  rating: number;
};

type AdminProductsTableProps = {
  initialProducts: ProductRow[];
};

type ColumnKey =
  | "product"
  | "price"
  | "category"
  | "stock"
  | "sku"
  | "rating"
  | "status";

const PAGE_SIZE = 10;

export default function AdminProductsTable({
  initialProducts,
}: AdminProductsTableProps) {
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<ProductStatus | "ALL">("ALL");

  const [categoryFilter, setCategoryFilter] =
    useState("ALL");

  const [priceFilter, setPriceFilter] =
    useState("ALL");

  const [page, setPage] = useState(1);

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [categoryOpen, setCategoryOpen] =
    useState(false);

  const [columnsOpen, setColumnsOpen] =
    useState(false);

  const [actionMenuId, setActionMenuId] =
    useState<string | null>(null);

  const [copiedId, setCopiedId] =
    useState<string | null>(null);

  const [selectedIds, setSelectedIds] =
    useState<string[]>([]);

  const [visibleColumns, setVisibleColumns] =
    useState<Record<ColumnKey, boolean>>({
      product: true,
      price: true,
      category: true,
      stock: true,
      sku: true,
      rating: true,
      status: true,
    });

  const menuAreaRef =
    useRef<HTMLDivElement | null>(null);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          initialProducts.map(
            (product) =>
              product.categoryName,
          ),
        ),
      ).sort(),
    [initialProducts],
  );

  const filteredProducts = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return initialProducts.filter(
      (product) => {
        const matchesSearch =
          !query ||
          product.name
            .toLowerCase()
            .includes(query) ||
          product.sku
            .toLowerCase()
            .includes(query) ||
          product.categoryName
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "ALL" ||
          product.status === statusFilter;

        const matchesCategory =
          categoryFilter === "ALL" ||
          product.categoryName ===
            categoryFilter;

        const effectivePrice =
          product.discountPrice ??
          product.price;

        let matchesPrice = true;

        if (priceFilter === "0-100") {
          matchesPrice =
            effectivePrice < 100;
        }

        if (priceFilter === "100-200") {
          matchesPrice =
            effectivePrice >= 100 &&
            effectivePrice <= 200;
        }

        if (priceFilter === "200-500") {
          matchesPrice =
            effectivePrice > 200 &&
            effectivePrice <= 500;
        }

        if (priceFilter === "500+") {
          matchesPrice =
            effectivePrice > 500;
        }

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCategory &&
          matchesPrice
        );
      },
    );
  }, [
    initialProducts,
    search,
    statusFilter,
    categoryFilter,
    priceFilter,
  ]);

  const pageCount = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        PAGE_SIZE,
    ),
  );

  const safePage = Math.min(
    page,
    pageCount,
  );

  const pageProducts =
    filteredProducts.slice(
      (safePage - 1) * PAGE_SIZE,
      safePage * PAGE_SIZE,
    );

  useEffect(() => {
    setPage(1);
  }, [
    search,
    statusFilter,
    categoryFilter,
    priceFilter,
  ]);

  useEffect(() => {
    function closeMenus(
      event: MouseEvent,
    ) {
      if (
        menuAreaRef.current &&
        !menuAreaRef.current.contains(
          event.target as Node,
        )
      ) {
        setStatusOpen(false);
        setCategoryOpen(false);
        setColumnsOpen(false);
        setActionMenuId(null);
      }
    }

    document.addEventListener(
      "mousedown",
      closeMenus,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        closeMenus,
      );
    };
  }, []);

  const currentPageIds =
    pageProducts.map(
      (product) => product.id,
    );

  const allCurrentSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
      selectedIds.includes(id),
    );

  function toggleSelectAll() {
    if (allCurrentSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !currentPageIds.includes(id),
        ),
      );

      return;
    }

    setSelectedIds((current) =>
      Array.from(
        new Set([
          ...current,
          ...currentPageIds,
        ]),
      ),
    );
  }

  function toggleProductSelection(
    productId: string,
  ) {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter(
            (id) => id !== productId,
          )
        : [...current, productId],
    );
  }

  function toggleColumn(
    column: ColumnKey,
  ) {
    setVisibleColumns((current) => ({
      ...current,
      [column]: !current[column],
    }));
  }

  async function copyProductId(
    productId: string,
  ) {
    await navigator.clipboard.writeText(
      productId,
    );

    setCopiedId(productId);
    setActionMenuId(null);

    window.setTimeout(() => {
      setCopiedId(null);
    }, 1600);
  }

  return (
    <div
      ref={menuAreaRef}
      className="w-full"
      style={{
        fontFamily: "var(--font-satoshi)",
      }}
    >
      {/* ===================================================
          FILTER BAR
      ==================================================== */}

      <div
        className="
          mb-[16px]

          flex
          flex-col
          gap-[12px]

          min-[900px]:flex-row
          min-[900px]:items-center
          min-[900px]:justify-between
        "
      >
        <div
          className="
            flex
            flex-1
            flex-wrap
            items-center
            gap-[9px]
          "
        >
          {/* SEARCH */}

          <div
            className="
              relative

              h-[38px]
              w-full

              min-[700px]:w-[260px]
            "
          >
            <Search
              className="
                absolute
                left-[12px]
                top-1/2
                size-[15px]
                -translate-y-1/2
                text-black/45
              "
              strokeWidth={1.8}
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search products..."
              className="
                h-full
                w-full

                rounded-[6px]

                bg-white

                pl-[35px]
                pr-[12px]

                text-[13px]
                text-black

                outline-none

                placeholder:text-black/45

                focus:border-black
              "
              style={{
                border:
                  "1px solid #D9D9DE",
              }}
            />
          </div>

          {/* STATUS */}

          <div className="relative">
            <FilterButton
              label={
                statusFilter === "ALL"
                  ? "Status"
                  : formatStatus(
                      statusFilter,
                    )
              }
              onClick={() => {
                setStatusOpen(
                  (value) => !value,
                );
                setCategoryOpen(false);
                setColumnsOpen(false);
              }}
            />

            {statusOpen && (
              <Dropdown
                title="Status"
                width="210px"
              >
                <FilterOption
                  label="All Statuses"
                  checked={
                    statusFilter ===
                    "ALL"
                  }
                  onClick={() =>
                    setStatusFilter("ALL")
                  }
                />

                <FilterOption
                  label="Active"
                  checked={
                    statusFilter ===
                    "ACTIVE"
                  }
                  onClick={() =>
                    setStatusFilter(
                      "ACTIVE",
                    )
                  }
                />

                <FilterOption
                  label="Draft"
                  checked={
                    statusFilter ===
                    "DRAFT"
                  }
                  onClick={() =>
                    setStatusFilter(
                      "DRAFT",
                    )
                  }
                />

                <FilterOption
                  label="Archived"
                  checked={
                    statusFilter ===
                    "ARCHIVED"
                  }
                  onClick={() =>
                    setStatusFilter(
                      "ARCHIVED",
                    )
                  }
                />
              </Dropdown>
            )}
          </div>

          {/* CATEGORY */}

          <div className="relative">
            <FilterButton
              label={
                categoryFilter === "ALL"
                  ? "Category"
                  : categoryFilter
              }
              onClick={() => {
                setCategoryOpen(
                  (value) => !value,
                );
                setStatusOpen(false);
                setColumnsOpen(false);
              }}
            />

            {categoryOpen && (
              <Dropdown
                title="Category"
                width="220px"
              >
                <FilterOption
                  label="All Categories"
                  checked={
                    categoryFilter ===
                    "ALL"
                  }
                  onClick={() =>
                    setCategoryFilter(
                      "ALL",
                    )
                  }
                />

                {categories.map(
                  (category) => (
                    <FilterOption
                      key={category}
                      label={category}
                      checked={
                        categoryFilter ===
                        category
                      }
                      onClick={() =>
                        setCategoryFilter(
                          category,
                        )
                      }
                    />
                  ),
                )}
              </Dropdown>
            )}
          </div>

          {/* PRICE */}

          <div className="relative">
            <select
              value={priceFilter}
              onChange={(event) =>
                setPriceFilter(
                  event.target.value,
                )
              }
              className="
                h-[38px]
                min-w-[150px]

                cursor-pointer

                rounded-[6px]

                bg-white

                px-[12px]

                text-[13px]
                text-black

                outline-none

                focus:border-black
              "
              style={{
                border:
                  "1px solid #D9D9DE",
              }}
            >
              <option value="ALL">
                Price: All
              </option>

              <option value="0-100">
                Price: Under $100
              </option>

              <option value="100-200">
                Price: $100-$200
              </option>

              <option value="200-500">
                Price: $200-$500
              </option>

              <option value="500+">
                Price: $500+
              </option>
            </select>
          </div>
        </div>

        {/* COLUMNS */}

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => {
              setColumnsOpen(
                (value) => !value,
              );

              setStatusOpen(false);
              setCategoryOpen(false);
            }}
            className="
              inline-flex
              h-[38px]
              items-center
              justify-center
              gap-[8px]

              rounded-[6px]

              bg-white

              px-[13px]

              text-[13px]
              font-medium
              text-black

              shadow-[0_1px_2px_rgba(0,0,0,0.04)]
            "
            style={{
              border:
                "1px solid #D9D9DE",
            }}
          >
            Columns

            <Columns3
              className="size-[15px]"
              strokeWidth={1.7}
            />
          </button>

          {columnsOpen && (
            <div
              className="
                absolute
                right-0
                top-[44px]
                z-[100]

                w-[190px]

                overflow-hidden

                rounded-[7px]

                bg-white

                py-[6px]

                shadow-[0_5px_18px_rgba(0,0,0,0.14)]
              "
              style={{
                border:
                  "1px solid #E1E1E5",
              }}
            >
              {(
                [
                  ["product", "Product Name"],
                  ["price", "Price"],
                  ["category", "Category"],
                  ["stock", "Stock"],
                  ["sku", "SKU"],
                  ["rating", "Rating"],
                  ["status", "Status"],
                ] as [
                  ColumnKey,
                  string,
                ][]
              ).map(
                ([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      toggleColumn(key)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-[10px]

                      px-[12px]
                      py-[8px]

                      text-left
                      text-[13px]
                      text-black

                      hover:bg-[#F4F4F5]
                    "
                  >
                    <span className="flex h-[15px] w-[15px] items-center justify-center">
                      {visibleColumns[
                        key
                      ] && (
                        <Check
                          className="size-[14px]"
                          strokeWidth={2}
                        />
                      )}
                    </span>

                    {label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===================================================
          TABLE
      ==================================================== */}

      <div
        className="
          overflow-x-auto

          rounded-[7px]

          bg-white
        "
        style={{
          border: "1px solid #E1E1E5",
        }}
      >
        <table
          className="
            w-full
            min-w-[1050px]
            border-collapse
          "
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "1px solid #E5E5E8",
              }}
            >
              <th className="w-[42px] px-[10px] py-[11px]">
                <Checkbox
                  checked={
                    allCurrentSelected
                  }
                  onChange={
                    toggleSelectAll
                  }
                />
              </th>

              {visibleColumns.product && (
                <TableHeader>
                  Product Name
                </TableHeader>
              )}

              {visibleColumns.price && (
                <TableHeader sortable>
                  Price
                </TableHeader>
              )}

              {visibleColumns.category && (
                <TableHeader sortable>
                  Category
                </TableHeader>
              )}

              {visibleColumns.stock && (
                <TableHeader sortable>
                  Stock
                </TableHeader>
              )}

              {visibleColumns.sku && (
                <TableHeader>
                  SKU
                </TableHeader>
              )}

              {visibleColumns.rating && (
                <TableHeader>
                  Rating
                </TableHeader>
              )}

              {visibleColumns.status && (
                <TableHeader sortable>
                  Status
                </TableHeader>
              )}

              <th className="w-[52px]" />
            </tr>
          </thead>

          <tbody>
            {pageProducts.map(
              (product) => (
                <tr
                  key={product.id}
                  className="
                    transition-colors
                    hover:bg-black/[0.015]
                  "
                  style={{
                    borderBottom:
                      "1px solid #E8E8EA",
                  }}
                >
                  <td className="px-[10px] py-[8px] text-center">
                    <Checkbox
                      checked={selectedIds.includes(
                        product.id,
                      )}
                      onChange={() =>
                        toggleProductSelection(
                          product.id,
                        )
                      }
                    />
                  </td>

                  {visibleColumns.product && (
                    <td className="px-[12px] py-[8px]">
                      <div
                        className="
                          flex
                          min-w-[260px]
                          items-center
                          gap-[12px]
                        "
                      >
                        <div
                          className="
                            relative

                            h-[48px]
                            w-[48px]

                            shrink-0

                            overflow-hidden

                            rounded-[5px]

                            bg-[#F0EEED]
                          "
                        >
                          {product.image ? (
                            <Image
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              fill
                              sizes="48px"
                              className="object-contain"
                            />
                          ) : (
                            <div
                              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center

                                text-[10px]
                                text-black/30
                              "
                            >
                              No image
                            </div>
                          )}
                        </div>

                        <span
                          className="
                            max-w-[330px]
                            truncate

                            text-[13px]
                            font-medium
                            text-black
                          "
                        >
                          {product.name}
                        </span>
                      </div>
                    </td>
                  )}

                  {visibleColumns.price && (
                    <TableCell>
                      <div>
                        <span className="font-medium text-black">
                          $
                          {(
                            product.discountPrice ??
                            product.price
                          ).toFixed(2)}
                        </span>

                        {product.discountPrice !==
                          null && (
                          <span
                            className="
                              ml-[6px]
                              text-[10px]
                              text-black/40
                              line-through
                            "
                          >
                            $
                            {product.price.toFixed(
                              2,
                            )}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  )}

                  {visibleColumns.category && (
                    <TableCell>
                      {product.categoryName}
                    </TableCell>
                  )}

                  {visibleColumns.stock && (
                    <TableCell>
                      <span
                        className={
                          product.totalStock ===
                          0
                            ? "font-medium text-red-500"
                            : "text-black"
                        }
                      >
                        {product.totalStock}
                      </span>
                    </TableCell>
                  )}

                  {visibleColumns.sku && (
                    <TableCell>
                      <span className="text-black/75">
                        {product.sku}
                      </span>
                    </TableCell>
                  )}

                  {visibleColumns.rating && (
                    <TableCell>
                      <div
                        className="
                          flex
                          items-center
                          gap-[5px]
                        "
                      >
                        <Star
                          className="
                            size-[15px]
                            fill-[#FF9500]
                            text-[#FF9500]
                          "
                        />

                        <span className="text-black">
                          {product.rating > 0
                            ? product.rating.toFixed(
                                1,
                              )
                            : "—"}
                        </span>
                      </div>
                    </TableCell>
                  )}

                  {visibleColumns.status && (
                    <TableCell>
                      <ProductStatusBadge
                        status={
                          product.status
                        }
                        stock={
                          product.totalStock
                        }
                      />
                    </TableCell>
                  )}

                  <td
                    className="
                      relative

                      px-[10px]
                      py-[8px]

                      text-right
                    "
                  >
                    <button
                      type="button"
                      aria-label="Product actions"
                      onClick={() =>
                        setActionMenuId(
                          (current) =>
                            current ===
                            product.id
                              ? null
                              : product.id,
                        )
                      }
                      className="
                        inline-flex
                        h-[30px]
                        w-[30px]
                        items-center
                        justify-center

                        rounded-[5px]

                        text-black

                        hover:bg-[#F2F2F3]
                      "
                    >
                      <MoreHorizontal
                        className="size-[17px]"
                      />
                    </button>

                    {actionMenuId ===
                      product.id && (
                      <ActionMenu
                        product={product}
                        copied={
                          copiedId ===
                          product.id
                        }
                        onCopy={() =>
                          copyProductId(
                            product.id,
                          )
                        }
                      />
                    )}
                  </td>
                </tr>
              ),
            )}

            {pageProducts.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="
                    px-[20px]
                    py-[70px]

                    text-center

                    text-[13px]
                    text-black/45
                  "
                >
                  No products match your
                  filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* =================================================
            FOOTER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-[20px]

            px-[16px]
            py-[14px]
          "
        >
          <p
            className="
              text-[12px]
              text-black/55
            "
          >
            {selectedIds.length} of{" "}
            {filteredProducts.length} row(s)
            selected.
          </p>

          <div
            className="
              flex
              items-center
              gap-[8px]
            "
          >
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() =>
                setPage((current) =>
                  Math.max(
                    1,
                    current - 1,
                  ),
                )
              }
              className="
                inline-flex
                h-[34px]
                items-center
                justify-center
                gap-[5px]

                rounded-[6px]

                bg-white

                px-[12px]

                text-[12px]
                font-medium
                text-black

                disabled:cursor-not-allowed
                disabled:text-black/30
              "
              style={{
                border:
                  "1px solid #DFDFE3",
              }}
            >
              <ChevronLeft className="size-[14px]" />

              Previous
            </button>

            <span
              className="
                min-w-[58px]
                text-center
                text-[11px]
                text-black/50
              "
            >
              {safePage} / {pageCount}
            </span>

            <button
              type="button"
              disabled={
                safePage >= pageCount
              }
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    pageCount,
                    current + 1,
                  ),
                )
              }
              className="
                inline-flex
                h-[34px]
                items-center
                justify-center
                gap-[5px]

                rounded-[6px]

                bg-white

                px-[12px]

                text-[12px]
                font-medium
                text-black

                disabled:cursor-not-allowed
                disabled:text-black/30
              "
              style={{
                border:
                  "1px solid #DFDFE3",
              }}
            >
              Next

              <ChevronRight className="size-[14px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION MENU
========================================================= */

function ActionMenu({
  product,
  copied,
  onCopy,
}: {
  product: ProductRow;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className="
        absolute
        right-[8px]
        top-[42px]
        z-[150]

        w-[150px]

        overflow-hidden

        rounded-[6px]

        bg-white

        py-[5px]

        text-left

        shadow-[0_5px_18px_rgba(0,0,0,0.14)]
      "
      style={{
        border: "1px solid #DFDFE3",
      }}
    >
      <p
        className="
          px-[11px]
          py-[7px]

          text-[12px]
          font-medium
          text-black/60
        "
      >
        Actions
      </p>

      <div className="h-px bg-black/10" />

      <Link
href={`/admin/products/${product.id}`}        className="
          flex
          items-center
          gap-[8px]

          px-[11px]
          py-[8px]

          text-[12px]
          text-black

          hover:bg-[#F4F4F5]
        "
      >
        <Eye className="size-[14px]" />

        View details
      </Link>

      <Link
        href={`/admin/products/${product.id}/edit`}
        className="
          flex
          items-center
          gap-[8px]

          px-[11px]
          py-[8px]

          text-[12px]
          text-black

          hover:bg-[#F4F4F5]
        "
      >
        <Pencil className="size-[14px]" />

        Edit
      </Link>

      <button
        type="button"
        onClick={onCopy}
        className="
          flex
          w-full
          items-center
          gap-[8px]

          px-[11px]
          py-[8px]

          text-left
          text-[12px]
          text-black

          hover:bg-[#F4F4F5]
        "
      >
        {copied ? (
          <Check className="size-[14px]" />
        ) : (
          <Copy className="size-[14px]" />
        )}

        {copied ? "Copied" : "Copy ID"}
      </button>

      <Link
        href={`/admin/products/${product.id}/edit`}
        className="
          flex
          items-center
          gap-[8px]

          px-[11px]
          py-[8px]

          text-[12px]
          text-red-600

          hover:bg-red-50
        "
      >
        <X className="size-[14px]" />

        Archive
      </Link>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function ProductStatusBadge({
  status,
  stock,
}: {
  status: ProductStatus;
  stock: number;
}) {
  if (status === "ARCHIVED") {
    return (
      <Badge className="border-red-500 bg-red-500 text-white">
        Archived
      </Badge>
    );
  }

  if (status === "DRAFT") {
    return (
      <Badge className="border-orange-400 bg-orange-50 text-orange-600">
        Draft
      </Badge>
    );
  }

  if (stock <= 0) {
    return (
      <Badge className="border-orange-400 bg-orange-50 text-orange-600">
        Out Of Stock
      </Badge>
    );
  }

  return (
    <Badge className="border-emerald-500 bg-emerald-50 text-emerald-600">
      Active
    </Badge>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center

        whitespace-nowrap

        rounded-full

        border

        px-[9px]
        py-[3px]

        text-[10px]
        font-medium
        leading-none

        ${className}
      `}
    >
      {children}
    </span>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex
        h-[38px]
        items-center
        justify-center
        gap-[7px]

        rounded-[6px]

        bg-white

        px-[12px]

        text-[13px]
        font-medium
        text-black

        shadow-[0_1px_2px_rgba(0,0,0,0.03)]
      "
      style={{
        border: "1px solid #D9D9DE",
      }}
    >
      <PlusCircle
        className="size-[15px]"
        strokeWidth={1.8}
      />

      <span>{label}</span>
    </button>
  );
}

/* =========================================================
   DROPDOWN
========================================================= */

function Dropdown({
  title,
  width,
  children,
}: {
  title: string;
  width: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        absolute
        left-0
        top-[44px]
        z-[100]

        overflow-hidden

        rounded-[7px]

        bg-white

        shadow-[0_5px_18px_rgba(0,0,0,0.14)]
      "
      style={{
        width,
        border: "1px solid #E1E1E5",
      }}
    >
      <div
        className="
          flex
          h-[38px]
          items-center
          gap-[8px]

          px-[11px]
        "
        style={{
          borderBottom:
            "1px solid #E8E8EA",
        }}
      >
        <Search
          className="size-[14px] text-black/40"
        />

        <span className="text-[12px] text-black/55">
          {title}
        </span>
      </div>

      <div className="p-[5px]">
        {children}
      </div>
    </div>
  );
}

function FilterOption({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-[9px]

        rounded-[4px]

        px-[8px]
        py-[8px]

        text-left
        text-[12px]
        text-black

        ${
          checked
            ? "bg-[#E7E7EA]"
            : "hover:bg-[#F4F4F5]"
        }
      `}
    >
      <span
        className="
          flex
          h-[15px]
          w-[15px]
          items-center
          justify-center

          rounded-[3px]

          bg-white
        "
        style={{
          border:
            "1px solid #D6D6DA",
        }}
      >
        {checked && (
          <Check
            className="size-[11px]"
            strokeWidth={2}
          />
        )}
      </span>

      {label}
    </button>
  );
}

/* =========================================================
   TABLE HELPERS
========================================================= */

function TableHeader({
  children,
  sortable = false,
}: {
  children: React.ReactNode;
  sortable?: boolean;
}) {
  return (
    <th
      className="
        whitespace-nowrap

        px-[12px]
        py-[11px]

        text-left

        text-[11px]
        font-medium
        text-black
      "
    >
      <div className="flex items-center gap-[6px]">
        {children}

        {sortable && (
          <ChevronsUpDown
            className="size-[12px]"
            strokeWidth={1.7}
          />
        )}
      </div>
    </th>
  );
}

function TableCell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      className="
        whitespace-nowrap

        px-[12px]
        py-[8px]

        text-[12px]
        text-black/75
      "
    >
      {children}
    </td>
  );
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="
        inline-flex
        h-[16px]
        w-[16px]
        items-center
        justify-center

        rounded-[4px]

        bg-white
      "
      style={{
        border: checked
          ? "1px solid #111111"
          : "1px solid #D6D6DA",
        backgroundColor: checked
          ? "#111111"
          : "#FFFFFF",
      }}
    >
      {checked && (
        <Check
          className="size-[11px]"
          strokeWidth={2.3}
          style={{
            color: "#FFFFFF",
          }}
        />
      )}
    </button>
  );
}

function formatStatus(
  status: ProductStatus,
) {
  if (status === "ACTIVE") {
    return "Active";
  }

  if (status === "DRAFT") {
    return "Draft";
  }

  return "Archived";
}