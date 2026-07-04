const leads = [];

function generateId() {
  return "HG-" + Date.now().toString(36).toUpperCase();
}

export async function POST(request) {
  const body = await request.json();

  const newLead = {
    ...body,
    id: generateId(),
    submittedAt: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  leads.unshift(newLead);
  return Response.json(newLead, { status: 201 });
}

export async function GET() {
  return Response.json(leads);
}
