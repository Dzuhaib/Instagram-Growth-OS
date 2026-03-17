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

  try {
    // 1. Exchange code for Facebook User Access Token
    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${encodeURIComponent(redirectUri || "")}&code=${code}`;
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("Facebook Token Error:", tokenData.error);
      return NextResponse.redirect(new URL("/onboarding?error=token_exchange_failed", req.url));
    }

    const accessToken = tokenData.access_token;

    // 2. Fetch User's Pages to find the Linked Instagram Business Account
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?fields=instagram_business_account{id,username,name,profile_picture_url}&access_token=${accessToken}`
    );
    const pagesData = await pagesResponse.json();

    if (!pagesData.data || pagesData.data.length === 0) {
      console.error("No pages found for this user.");
      return NextResponse.redirect(new URL("/onboarding?error=no_pages_found", req.url));
    }

    // Find the first page with a linked Instagram Business Account
    const pageWithIg = pagesData.data.find((page: any) => page.instagram_business_account);

    if (!pageWithIg) {
      console.error("No Instagram Business Account linked to the user's Facebook pages.");
      return NextResponse.redirect(new URL("/onboarding?error=no_ig_business_account", req.url));
    }

    const igAccount = pageWithIg.instagram_business_account;
    const igUsername = igAccount.username;

    // 3. Return to onboarding with success state and data
    const response = NextResponse.redirect(
      new URL(`/onboarding?step=4&method=instagram&handle=${igUsername}`, req.url)
    );
    
    // Store access token in a secure cookie
    response.cookies.set("ig_access_token", accessToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60 // 60 days
    });

    return response;
  } catch (error) {
    console.error("Instagram Auth Error:", error);
    return NextResponse.redirect(new URL("/onboarding?error=internal_server_error", req.url));
  }
}
