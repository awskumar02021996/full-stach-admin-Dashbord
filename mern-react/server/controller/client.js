import Product from "../model/Product.js";
import ProductStat from "../model/ProductStat.js";
import User from "../model/user.js";
import Transaction from "../model/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// Products 
export const getProduct =async(req , res) =>{
    try{
  const product = await Product.find();
//   console.log(product, "@#<><>");

  const productWithStats = await Promise.all(
    product.map(async(data)=>{
        console.log(data._id ,"rajan kumar");
        const stat = await ProductStat.find({
            productId : data._id
        })
        return {
            ...data._doc,
            stat
        }
    })
  )
  res.status(200).json(productWithStats);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

// Costomer 
export const getCustomers =async( req , res)=>{
  try{
const customers = await User.find({role: "user"}).select("-password");
res.status(200).json(customers);

  }catch(error){
    res.status(404).json({ message: error.message });
  }
}


// Transaction
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//  Geography data 
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
