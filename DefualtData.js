const cartsdatas = require("./default/data");
const productSchema = require("./models/productSchema");

const Defaultdata = async () => {
  try {
    await productSchema.deleteMany({});
    const data = await productSchema.insertMany(cartsdatas);
    // console.log(data);
  } catch (error) {
    console.error("Error: " + error.message);
  }
};
module.exports = Defaultdata;
