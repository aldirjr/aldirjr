export default async function handler(req, res) {
    const BGG_USERNAME = 'jujunior';
    const BGG_TOKEN = process.env.BGG_TOKEN;

    // Safety check: Is the token actually there?
    if (!BGG_TOKEN) {
        console.error("ERROR: BGG_TOKEN is missing in Vercel Environment Variables");
        return res.status(500).json({ error: "Server configuration error: Missing Token" });
    }

    try {
        const bggUrl = `https://boardgamegeek.com/xmlapi2/collection?username=${BGG_USERNAME}&stats=1`;
        
        const response = await fetch(bggUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${BGG_TOKEN}`
            }
        });

        // BGG is still generating your list
        if (response.status === 202) {
            return res.status(202).send("Processing");
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error("BGG API responded with error:", response.status, errorText);
            return res.status(response.status).json({ error: "BGG API Error" });
        }

        const xmlData = await response.text();
        
        // Success!
        res.setHeader('Content-Type', 'application/xml');
        return res.status(200).send(xmlData);

    } catch (error) {
        console.error("Fetch Exception:", error);
        return res.status(500).json({ error: "Internal Server Exception" });
    }
}