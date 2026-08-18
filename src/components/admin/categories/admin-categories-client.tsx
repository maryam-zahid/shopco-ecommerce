"use client";

import {
  useState,
  useTransition,
} from "react";

import {
  createCategoryAction,
  updateCategoryAction,
} from "@/actions/admin-category.actions";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
};

type Props = {
  initialCategories: Category[];
};

export default function AdminCategoriesClient({
  initialCategories,
}: Props) {
  const [categories, setCategories] =
    useState(initialCategories);

  const [message, setMessage] =
    useState<string | null>(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();

  function handleCreate(
    formData: FormData,
  ) {
    startTransition(async () => {
      const result =
        await createCategoryAction({
          name: String(
            formData.get("name") ?? "",
          ),

          slug: String(
            formData.get("slug") ?? "",
          ),

          description: String(
            formData.get("description") ?? "",
          ),
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (result.success) {
        window.setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
  }

  function handleToggle(
    category: Category,
  ) {
    startTransition(async () => {
      const result =
        await updateCategoryAction({
          id: category.id,

          name: category.name,

          description:
            category.description ?? "",

          isActive:
            !category.isActive,
        });

      setIsError(!result.success);
      setMessage(result.message);

      if (!result.success) {
        return;
      }

      setCategories((current) =>
        current.map((item) =>
          item.id === category.id
            ? {
                ...item,
                isActive:
                  !item.isActive,
              }
            : item,
        ),
      );
    });
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-[18px]

        min-[1000px]:grid-cols-[360px_1fr]
      "
    >
      {/* ADD CATEGORY */}

      <form
        action={handleCreate}
        className="
          rounded-[14px]
          border
          border-black/10
          bg-white
          p-[20px]
        "
      >
        <h2
          className="
            text-[18px]
            font-semibold
            text-black
          "
        >
          Add Category
        </h2>

        {message && (
          <div
            className={`
              mt-[14px]

              rounded-[8px]
              border

              px-[12px]
              py-[10px]

              text-[12px]

              ${
                isError
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }
            `}
          >
            {message}
          </div>
        )}

        <div className="mt-[16px] space-y-[14px]">
          <Field
            label="Name"
            name="name"
            placeholder="Men"
          />

          <Field
            label="Slug"
            name="slug"
            placeholder="men"
          />

          <label className="block">
            <span
              className="
                mb-[6px]
                block

                text-[12px]
                font-medium
                text-black
              "
            >
              Description
            </span>

            <textarea
              name="description"
              rows={4}
              className="
                w-full

                rounded-[8px]

                border
                border-black/20

                bg-white

                px-[12px]
                py-[10px]

                text-[13px]

                outline-none

                focus:border-black
              "
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            mt-[18px]

            h-[42px]
            w-full

            rounded-[8px]

            bg-black

            text-[13px]
            font-semibold
            text-white

            disabled:opacity-50
          "
          style={{
            backgroundColor: "#000000",
            color: "#FFFFFF",
          }}
        >
          {isPending
            ? "Saving..."
            : "Create Category"}
        </button>
      </form>

      {/* CATEGORY TABLE */}

      <div
        className="
          overflow-x-auto

          rounded-[14px]

          border
          border-black/10

          bg-white
        "
      >
        <table
          className="
            w-full
            min-w-[650px]
            border-collapse
          "
        >
          <thead className="bg-[#F8F8F8]">
            <tr>
              <Header>Name</Header>
              <Header>Slug</Header>
              <Header>Status</Header>
              <Header>Action</Header>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
  <tr
    key={category.id}
    className="
      border-t
      border-black/10
    "
  >
    <Cell>
      <span
        className="
          font-semibold
          text-black
        "
      >
        {category.name}
      </span>
    </Cell>

    <Cell>
      {category.slug}
    </Cell>

    <Cell>
      <span
        className={`
          inline-flex

          rounded-full

          px-[10px]
          py-[5px]

          text-[10px]
          font-semibold

          ${
            category.isActive
              ? "bg-green-50 text-green-700"
              : "bg-black/5 text-black/45"
          }
        `}
      >
        {category.isActive
          ? "Active"
          : "Inactive"}
      </span>
    </Cell>

    <Cell>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          handleToggle(category)
        }
        className="
          h-[34px]

          rounded-[7px]

          border
          border-black/20

          bg-white

          px-[12px]

          text-[11px]
          font-medium
          text-black

          disabled:opacity-50
        "
      >
        {category.isActive
          ? "Disable"
          : "Enable"}
      </button>
    </Cell>
  </tr>
))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="
                    px-[20px]
                    py-[60px]

                    text-center

                    text-[13px]
                    text-black/45
                  "
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-[6px]
          block

          text-[12px]
          font-medium
          text-black
        "
      >
        {label}
      </span>

      <input
        name={name}
        required
        placeholder={placeholder}
        className="
          h-[42px]
          w-full

          rounded-[8px]

          border
          border-black/20

          bg-white

          px-[12px]

          text-[13px]

          outline-none

          focus:border-black
        "
      />
    </label>
  );
}

function Header({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      className="
        px-[15px]
        py-[12px]

        text-left

        text-[11px]
        font-semibold
        uppercase
        text-black/50
      "
    >
      {children}
    </th>
  );
}

function Cell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <td
      className="
        px-[15px]
        py-[14px]

        text-[13px]
        text-black/60
      "
    >
      {children}
    </td>
  );
}