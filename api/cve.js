export default async function handler(req, res) {
  const year = req.query.year;

  if (!year) {
    return res.status(400).json({ error: "Missing year parameter" });
  }

  const apiUrl = `https://services.nvd.nist.gov/rest/json/cves/2.0?pubStartDate=${year}-01-01T00:00:00:000`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-Api-Key": "524f4305-dc03-48b7-ad03-e3c7cf5b32df"
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
