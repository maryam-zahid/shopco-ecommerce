import { cloudinary } from "@/lib/cloudinary";

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const {
      paramsToSign,
    } = body;

    if (
      !paramsToSign ||
      typeof paramsToSign !==
        "object"
    ) {
      return Response.json(
        {
          message:
            "Missing Cloudinary parameters.",
        },
        {
          status: 400,
        },
      );
    }

    const apiSecret =
      process.env
        .CLOUDINARY_API_SECRET;

    const apiKey =
      process.env
        .CLOUDINARY_API_KEY;

    const cloudName =
      process.env
        .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (
      !apiSecret ||
      !apiKey ||
      !cloudName
    ) {
      return Response.json(
        {
          message:
            "Cloudinary environment variables are missing.",
        },
        {
          status: 500,
        },
      );
    }

    const signature =
      cloudinary.utils.api_sign_request(
        paramsToSign,
        apiSecret,
      );

    return Response.json({
      signature,
      apiKey,
      cloudName,
    });
  } catch {
    return Response.json(
      {
        message:
          "Unable to sign Cloudinary upload.",
      },
      {
        status: 500,
      },
    );
  }
}