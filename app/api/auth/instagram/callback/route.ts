import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/onboarding?error=no_code", req.url));
  }

  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI;

  console.log("=== Instagram Callback Start ===");
  console.log("clientId present:", !!clientId);
  console.log("clientSecret present:", !!clientSecret);
  console.log("redirectUri:", redirectUri);

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Missing Instagram environment variables.");
    return NextResponse.redirect(
      new URL("/onboarding?error=missing_credentials", req.url)
    );
  }

  try {
    // Step 1: Exchange code for Instagram Access Token
    const formData = new URLSearchParams();
    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirectUri);
    formData.append("code", code);

    console.log("Exchanging code for token...");

    const tokenResponse = await fetch(
      "https://api.instagram.com/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log("Token response status:", tokenResponse.status);
    console.log("Token data keys:", Object.keys(tokenData));

    if (tokenData.error || !tokenData.access_token) {
      console.error("Instagram Token Error:", JSON.stringify(tokenData));
      return NextResponse.redirect(
        new URL("/onboarding?error=token_exchange_failed", req.url)
      );
    }

    const accessToken = tokenData.access_token;
    console.log("Token exchange success. Fetching profile...");

    // Step 2: Fetch profile — try multiple field combos for compatibility
    // Fields available under instagram_business_basic: id, name, username, biography, etc.
    const profileResponse = await fetch(
      `https://graph.instagram.com/v25.0/me?fields=id,name,username,biography&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    console.log("Profile response status:", profileResponse.status);
    console.log("Profile data:", JSON.stringify(profileData));

    if (profileData.error) {
      console.error("Profile API Error:", JSON.stringify(profileData.error));
      return NextResponse.redirect(
        new URL("/onboarding?error=profile_fetch_failed", req.url)
      );
    }

    // Use username if available, fall back to name, then to "user_" + id
    const igUsername =
      profileData.username ||
      profileData.name?.replace(/\s+/g, "_").toLowerCase() ||
      `user_${profileData.id}`;

    console.log("Resolved username:", igUsername);

    // Step 3: Redirect back to onboarding with success state
    const response = NextResponse.redirect(
      new URL(
        `/onboarding?step=4&method=instagram&handle=${encodeURIComponent(igUsername)}`,
        req.url
      )
    );

    // Store access token in a secure HTTP-only cookie
    response.cookies.set("ig_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });

    return response;
  } catch (error) {
    console.error("Instagram Auth Error:", error);
    return NextResponse.redirect(
      new URL("/onboarding?error=internal_server_error", req.url)
    );
  }
}