import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
// imporating data

// import User from "./server/model/user.js";
// import Product from "./server/model/product.js";
// import ProductStat from "./server/model/productStat.js";
// import Transaction from "./server/model/Transaction.js";
// import OverallStat from "./server/model/OverAllStat.js";
// import AffiliateStat from "./server/model/AffiliateStat.js";
// import { dataUser, 
//   dataProduct,
//    dataProductStat  , 
//    dataTransaction ,
//    dataAffiliateStat,
//    dataOverallStat} from "./server/data/index.js";

// CONFIGURATION //

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES //

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// MONGOOSE SETUP //

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log("server is connect @@##>>>>>>>>"));

    // Only add data one time ...//
  //AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
//   Transaction.insertMany(dataTransaction);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser);
  })
  .catch((err) => {
    console.log(err, "server did not connect >>>>>>><<<<<<<<<<<<<");
  });
