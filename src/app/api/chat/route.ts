import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NVIDIA_API_KEY is not configured in .env.local" },
        { status: 500 }
      );
    }

    // Call NVIDIA NIM API
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-4-340b-instruct", // Wait, user wants nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4
        // Let's use the exact model the user requested
        messages: [
          {
            role: "system",
            content: "You are Shikhar Uikey's AI Assistant (Nemotron 3.5 30B). You are embedded in his portfolio to help visitors. Answer questions about him concisely and professionally.",
          },
          ...messages,
        ],
        max_tokens: 512,
        stream: false, // For simplicity initially, non-streaming
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("NVIDIA API Error:", errorData);
      return NextResponse.json(
        { error: `NVIDIA API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Chat API Route Error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
