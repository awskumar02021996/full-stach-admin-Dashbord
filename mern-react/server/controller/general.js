import User from '../../server/model/user.js';
import OverallStat from "../model/OverallStat.js";
import Transaction from "../model/Transaction.js";


export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const getDashboardStats = async (req, res) => {
    try {
      // hardcoded values
      const currentMonth = "November";
      const currentYear = 2021;
      const currentDay = "2021-11-15";
  
      /* Recent Transactions */
      const transactions = await Transaction.find()
        .limit(50)
        .sort({ createdOn: -1 });
        // console.log(transactions ,"@@@@@@@@@@@@@@@");
  
      /* Overall Stats */
      const overallStat = await OverallStat.find({ year: currentYear });
      // console.log(overallStat,"############");
  
      const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
      } = overallStat[0];
  
      console.log(overallStat[0].monthlyData,"helloStatt");
      const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
        
        return month === currentMonth;
      });
      // console.log(thisMonthStats,"$$$$$$$$$$$$$$$");
  
      const todayStats = overallStat[0].dailyData.find(({ date }) => {
        
        return date === currentDay;
      });
      // console.log(todayStats,"&&&&&&&&&&&&&");
    console.log('==================',totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions);
      res.status(200).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
