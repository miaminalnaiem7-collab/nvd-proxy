export default async function handler(req, res) {
  const year = req.query.year;

  if (!year) {
    return res.status(400).json({ error: "Missing year parameter" });
  }

  const apiUrl = `https://cve.circl.lu/api/query?time_modified=${year}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "Proxy error",
      details: err.message
    });
  }
}
