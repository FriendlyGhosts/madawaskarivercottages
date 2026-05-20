export const prerender = false;

export async function POST({ request }: { request: Request }) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }

  const { firstName, lastName, email, cabin, message } = body;

  if (!firstName || !email || !message) {
    return json({ error: 'Please fill in all required fields.' }, 400);
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: 'Server configuration error.' }, 500);
  }

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #241c0c;">
      <div style="background: #f2ece0; padding: 32px; border-bottom: 2px solid #2e6b8a;">
        <h1 style="margin: 0; font-size: 22px; color: #2e6b8a; letter-spacing: 0.05em;">New Enquiry</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #7a6540;">Madawaska River Cottages</p>
      </div>
      <div style="background: #fff; padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf; color: #7a6540; width: 130px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf; font-weight: bold;">${firstName} ${lastName || ''}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf; color: #7a6540; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf;"><a href="mailto:${email}" style="color: #2e6b8a;">${email}</a></td>
          </tr>
          ${cabin ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf; color: #7a6540; vertical-align: top;">Cabin</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e8e0cf;">${cabin}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #7a6540; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
          </tr>
        </table>
        <div style="margin-top: 28px; padding: 16px; background: #f2ece0; border-radius: 4px; font-size: 13px; color: #7a6540;">
          Reply directly to this email to respond to ${firstName}.
        </div>
      </div>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Madawaska River Cottages <onboarding@resend.dev>',
      to: ['madawaskarivercottages@gmail.com'],
      reply_to: email,
      subject: `Enquiry from ${firstName} ${lastName || ''}${cabin ? ` — ${cabin}` : ''}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return json({ error: 'Failed to send. Please try again or email us directly.' }, 500);
  }

  return json({ ok: true });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
