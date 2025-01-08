import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const randomCoctailAPI = "https://thecocktaildb.com/api/json/v1/1/random.php";
const searchCoctailAPI = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(randomCoctailAPI);
        const result = response.data;
        res.render("index.ejs", {content: result.drinks[0]} );
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500);
    }
});

app.get("/search", async (req, res) => {
    const coctail = req.query.findCoctail;
    try {
        const response = await axios.get(searchCoctailAPI + coctail);
        const result = response.data;
        res.render("index.ejs", {content: result.drinks[0]} );
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


