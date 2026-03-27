export default async function handler(req, res) {
  const year = req.query.year;

  if (!year) {
    return res.status(400).json({ error: "Missing year parameter" });
  }

  const apiUrl = `https://cve.circl.lu/api/last`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // فلترة النتائج حسب السنة
    const filtered = data.filter(item => {
      if (!item.last_modified) return false;
      return item.last_modified.startsWith(year);
    });

    return res.status(200).json(filtered);

  } catch (err) {
    return res.status(500).json({
      error: "Proxy error",
      details: err.message
    });
  }
}
