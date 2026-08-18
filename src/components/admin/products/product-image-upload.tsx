"use client";

import {
  useRef,
  useState,
} from "react";

import {
  ImageIcon,
  Loader2,
  Upload,
} from "lucide-react";

type ProductImageUploadProps = {
  images: string[];

  onChange: (
    images: string[],
  ) => void;

  maxImages?: number;
};

type SignatureResponse = {
  signature?: string;
  apiKey?: string;
  cloudName?: string;
  message?: string;
};

type CloudinaryResponse = {
  secure_url?: string;
  public_id?: string;
  error?: {
    message?: string;
  };
};

export default function ProductImageUpload({
  images,
  onChange,
  maxImages = 6,
}: ProductImageUploadProps) {
  const inputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const [isDragging, setIsDragging] =
    useState(false);

  const [isUploading, setIsUploading] =
    useState(false);

  const [message, setMessage] =
    useState<string | null>(null);

  const remaining =
    Math.max(
      maxImages - images.length,
      0,
    );

  async function uploadFile(
    file: File,
  ) {
    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      throw new Error(
        `${file.name} is not an image.`,
      );
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      throw new Error(
        `${file.name} is larger than 5MB.`,
      );
    }

    const timestamp =
      Math.round(
        Date.now() / 1000,
      );

    const folder =
      "shopco/products";

    const signResponse =
      await fetch(
        "/api/cloudinary/signature",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            paramsToSign: {
              timestamp,
              folder,
            },
          }),
        },
      );

    const signedData =
      (await signResponse.json()) as
        SignatureResponse;

    if (
      !signResponse.ok ||
      !signedData.signature ||
      !signedData.apiKey ||
      !signedData.cloudName
    ) {
      throw new Error(
        signedData.message ??
          "Could not authorize upload.",
      );
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );

    formData.append(
      "api_key",
      signedData.apiKey,
    );

    formData.append(
      "timestamp",
      String(timestamp),
    );

    formData.append(
      "signature",
      signedData.signature,
    );

    formData.append(
      "folder",
      folder,
    );

    const uploadResponse =
      await fetch(
        `https://api.cloudinary.com/v1_1/${signedData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

    const uploaded =
      (await uploadResponse.json()) as
        CloudinaryResponse;

    if (
      !uploadResponse.ok ||
      !uploaded.secure_url
    ) {
      throw new Error(
        uploaded.error?.message ??
          "Image upload failed.",
      );
    }

    return uploaded.secure_url;
  }

  async function uploadFiles(
    files: FileList | File[],
  ) {
    const selected =
      Array.from(files).slice(
        0,
        remaining,
      );

    if (
      selected.length === 0
    ) {
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const uploadedUrls: string[] =
        [];

      for (
        const file of selected
      ) {
        const url =
          await uploadFile(file);

        uploadedUrls.push(url);
      }

      onChange([
        ...images,
        ...uploadedUrls,
      ]);

      setMessage(
        `${uploadedUrls.length} image${
          uploadedUrls.length === 1
            ? ""
            : "s"
        } uploaded successfully.`,
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Image upload failed.",
      );
    } finally {
      setIsUploading(false);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }
    }
  }

  function handleDrop(
    event:
      React.DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    setIsDragging(false);

    if (
      isUploading ||
      remaining <= 0
    ) {
      return;
    }

    void uploadFiles(
      event.dataTransfer.files,
    );
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        hidden
        onChange={(event) => {
          if (
            event.target.files
          ) {
            void uploadFiles(
              event.target.files,
            );
          }
        }}
      />

      <div
        onDragEnter={(
          event,
        ) => {
          event.preventDefault();

          if (
            !isUploading &&
            remaining > 0
          ) {
            setIsDragging(true);
          }
        }}
        onDragOver={(
          event,
        ) => {
          event.preventDefault();
        }}
        onDragLeave={(
          event,
        ) => {
          event.preventDefault();

          if (
            event.currentTarget ===
            event.target
          ) {
            setIsDragging(false);
          }
        }}
        onDrop={handleDrop}
        onClick={() => {
          if (
            !isUploading &&
            remaining > 0
          ) {
            inputRef.current?.click();
          }
        }}
        className={`
          flex
          min-h-[210px]
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center

          rounded-[10px]

          border
          border-dashed

          px-[20px]
          py-[30px]

          text-center

          transition-colors

          ${
            isDragging
              ? "border-black bg-black/[0.04]"
              : "border-black/20 bg-white hover:bg-black/[0.015]"
          }

          ${
            isUploading ||
            remaining <= 0
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        `}
      >
        <div
          className="
            flex
            h-[46px]
            w-[46px]
            items-center
            justify-center

            rounded-full

            border
            border-black/10

            bg-white
          "
        >
          {isUploading ? (
            <Loader2
              className="
                size-[19px]
                animate-spin
                text-black
              "
            />
          ) : (
            <ImageIcon
              className="
                size-[19px]
                text-black/50
              "
            />
          )}
        </div>

        <p
          className="
            mt-[12px]

            text-[14px]
            font-medium
            text-black
          "
        >
          {isUploading
            ? "Uploading images..."
            : isDragging
              ? "Drop images here"
              : "Drop your images here"}
        </p>

        <p
          className="
            mt-[4px]

            text-[12px]
            text-black/45
          "
        >
          PNG, JPG or WEBP
          (max. 5MB)
        </p>

        {!isUploading &&
          remaining > 0 && (
            <>
              <span
                className="
                  my-[12px]

                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.08em]
                  text-black/30
                "
              >
                or
              </span>

              <button
                type="button"
                onClick={(
                  event,
                ) => {
                  event.stopPropagation();

                  inputRef.current?.click();
                }}
                className="
                  flex
                  h-[40px]
                  items-center
                  justify-center
                  gap-[8px]

                  rounded-[8px]

                  border
                  border-black/15

                  bg-white

                  px-[16px]

                  text-[12px]
                  font-medium
                  text-black

                  transition-colors

                  hover:bg-[#F7F7F7]
                "
              >
                <Upload className="size-[14px]" />

                Select images
              </button>
            </>
          )}

        {remaining <= 0 && (
          <p
            className="
              mt-[10px]
              text-[12px]
              text-black/50
            "
          >
            Maximum of{" "}
            {maxImages} images
            reached.
          </p>
        )}
      </div>

      <div
        className="
          mt-[8px]

          flex
          items-center
          justify-between
          gap-[12px]
        "
      >
        <p
          className="
            text-[11px]
            text-black/40
          "
        >
          {images.length} /{" "}
          {maxImages} images
        </p>

        {message && (
          <p
            className="
              text-right
              text-[11px]
              text-black/55
            "
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}