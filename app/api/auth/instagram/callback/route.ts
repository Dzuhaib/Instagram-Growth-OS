import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/onboarding?error=no_code", req.url));
  }

  const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
  
  // Construct redirectUri dynamically from the current request to ensure a 100% match
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("host");
  const redirectUri = `${protocol}://${host}/api/auth/instagram/callback`;
  
  console.log("Constructed Backend Redirect URI:", redirectUri);

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

    if (tokenData.error || !tokenData.access_token) {
      console.error("Instagram Token Error:", tokenData);
      return NextResponse.redirect(
        new URL("/onboarding?error=token_exchange_failed", req.url)
      );
    }

    const accessToken = tokenData.access_token;

    // Step 2: Fetch Instagram Profile from Graph API
    const profileResponse = await fetch(
      `https://graph.instagram.com/v19.0/me?fields=id,username,name,profile_picture_url&access_token=${accessToken}`
    );
    const profileData = await profileResponse.json();

    if (profileData.error || !profileData.username) {
      console.error("Profile Fetch Error:", profileData);
      return NextResponse.redirect(
        new URL("/onboarding?error=profile_fetch_failed", req.url)
      );
    }

    const igUsername = profileData.username;

    // Step 3: Redirect back to onboarding with success state
    const response = NextResponse.redirect(
      new URL(
        `/onboarding?step=4&method=instagram&handle=${igUsername}`,
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