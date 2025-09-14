export async function GET(request, context) {
  const { resource } = await context.params;

  const url = new URL(request.url);
  const index = url.searchParams.get("index");
  let apiUrl = `https://www.dnd5eapi.co/api/2014/${resource}`;
  if (index) {
    apiUrl += `/${index}`;
  }

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const res = await fetch(apiUrl, {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  });

  if (!res.ok) {
    return Response.json({ error: "Resource not found" }, { status: 404 });
  }
  const data = await res.json();
  return Response.json(data);
}
