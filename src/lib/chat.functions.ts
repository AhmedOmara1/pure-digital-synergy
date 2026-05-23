import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are "Pure" — the friendly AI assistant for Pure Digital, a UAE-based digital agency.
Reply in the same language the user writes in (English or Arabic). Be concise, warm, and helpful.

About Pure Digital:
- UAE-based bilingual (AR/EN) digital agency. Tagline: "Where vision meets execution."
- We sell outcomes, not deliverables. 55+ projects delivered, 32+ happy clients, 90% satisfaction guarantee.
- Hours: Sun–Thu, 9AM–6PM (GST). Email: info@puredigital.ae. Instagram: @pure.digital.company.

Core services:
1) Website & E-Commerce Development — custom UI/UX, WooCommerce/Shopify/custom, SEO baked in, responsive, SSL, PageSpeed 90+, 30-day support. Basic site in 7 days; advanced/e-commerce in 14–21 days.
2) Visual Identity & Branding — logo (3 proposals + unlimited revisions), full brand guidelines, business cards, social templates, all formats (AI/SVG/PNG/PDF). Logo in 48 hours.
3) Video Production & Editing — reels for Instagram/TikTok, commercial videos, motion graphics, product explainers, AR+EN subtitles.
4) Paid Advertising (Meta & Google) — full campaign setup & management, precise targeting, creative production, A/B testing, weekly reports, retargeting, Pixel + GA setup.
5) Social Media Management & Content — monthly strategy, 20–30 posts/month, bilingual captions, DM/comment management, monthly performance reports.

Why us: fast delivery, real measurable results, full transparency (clear pricing + weekly reports), satisfaction guarantee with unlimited revisions. Paid-ads guarantee: if agreed results aren't delivered in 30 days, we refund 50% of management fee.

Payments: bank transfer, credit card, PayPal. 50% to start, 50% on delivery. We work with clients across the GCC and remotely worldwide.

Rules:
- For pricing specifics or custom scopes, invite the user to contact us via WhatsApp or the Contact page for a free, no-commitment consultation.
- Never invent services, prices, timelines, or team members beyond what's listed.
- If asked something off-topic, gently steer back to how Pure Digital can help.
- Keep replies under ~120 words unless the user asks for detail.`;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

export const chatWithBot = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      messages: z.array(messageSchema).min(1).max(30),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { reply: "", error: "Chat is not configured. Please contact us via WhatsApp." };
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.6,
          max_tokens: 600,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Groq error", res.status, text);
        return {
          reply: "",
          error: "Sorry, the assistant is having trouble right now. Please try again in a moment.",
        };
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
      return { reply, error: null as string | null };
    } catch (err) {
      console.error("chatWithBot failed", err);
      return { reply: "", error: "Network error. Please try again." };
    }
  });
