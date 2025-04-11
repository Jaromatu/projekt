exports.handler = async function (event, context) {
  const params = event.queryStringParameters;

  const name = params.nazwa || "Nieznany Szachista";
  const opis = params.opis || "Brak opisu.";
  const linkInfo = params.link_info || "#";
  const partie = (params.partie || "")
    .split("\n")
    .filter((l) => l.trim() !== "")
    .slice(0, 3);

  const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>${name}</h1>
  <p>${opis}</p>
  <p><strong>Więcej informacji:</strong> <a href="${linkInfo}" target="_blank">${linkInfo}</a></p>
  <h2>Najciekawsze partie</h2>
  <ul>
    ${partie
      .map((link) => `<li><a href="${link}" target="_blank">${link}</a></li>`)
      .join("")}
  </ul>
</body>
</html>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: html,
  };
};
