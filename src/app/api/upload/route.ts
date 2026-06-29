import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "portfolio";
    const resourceType = (formData.get("resource_type") as string) || "image";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (resourceType === "image" && !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }
    if (resourceType === "raw" && file.type !== "application/pdf") {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }

    // Max file size: 10 MB for images, 20 MB for PDFs
    const maxSize = resourceType === "raw" ? 20 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const mb = maxSize / (1024 * 1024);
      return NextResponse.json({ error: `File size exceeds ${mb}MB limit` }, { status: 400 });
    }

    // Convert file to base64 data URI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string; format: string; bytes: number }>(
      (resolve, reject) => {
        cloudinary.uploader.upload(
          dataUri,
          {
            folder: `portfolio/${folder}`,
            resource_type: resourceType as "image" | "raw" | "auto",
            // Generate a unique public_id from original filename
            public_id: `${Date.now()}_${file.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}`,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string; format: string; bytes: number });
          }
        );
      }
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed. Please check your Cloudinary credentials." },
      { status: 500 }
    );
  }
}
