import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface LeadRequest {
  email: string;
  type: "waitlist" | "demo";
  institution?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get D1 database binding
    const { env } = getCloudflareContext();
    const db = env.TUTORIA_LEADS_DB;

    if (!db) {
      console.error("TUTORIA_LEADS_DB binding not found");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Parse and validate request
    const body: LeadRequest = await request.json();
    const { email, type, institution, notes } = body;

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (type !== "waitlist" && type !== "demo") {
      return NextResponse.json(
        { error: "Type must be 'waitlist' or 'demo'" },
        { status: 400 }
      );
    }

    if (type === "demo" && !institution) {
      return NextResponse.json(
        { error: "Institution is required for demo requests" },
        { status: 400 }
      );
    }

    // Get IP address for spam detection
    const ip = request.headers.get("cf-connecting-ip") ||
               request.headers.get("x-forwarded-for") ||
               "unknown";

    // Insert into D1
    try {
      await db
        .prepare(
          `INSERT INTO leads (email, type, institution, notes, ip_address, created_at)
           VALUES (?, ?, ?, ?, ?, datetime('now'))`
        )
        .bind(
          email.toLowerCase().trim(),
          type,
          institution || null,
          notes || null,
          ip
        )
        .run();

      return NextResponse.json(
        {
          success: true,
          message: type === "waitlist"
            ? "You're on the waitlist! We'll be in touch soon."
            : "Demo request received! We'll contact you shortly."
        },
        { status: 201 }
      );
    } catch (dbError: unknown) {
      // Handle duplicate email
      if (dbError instanceof Error && dbError.message?.includes("UNIQUE constraint")) {
        return NextResponse.json(
          { error: "This email is already registered" },
          { status: 409 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
