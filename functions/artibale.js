const Airtable = require("airtable-node");
require("dotenv").config();
const airtable = new Airtable({ apiKey: process.env.ARTABLE_API_KEY })
  .base("appA05ZtqbhTAvzB0")
  .table("products");
exports.handler = async (event, context, callback) => {
  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const { name, description, price, image } = product.fields;
      const url = image[0].url;
      return { id, name, url, price };
    });
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
