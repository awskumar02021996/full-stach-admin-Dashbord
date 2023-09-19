import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({

baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASR_URL}),
reducerPath:"adminApi",
tagTypes: ['User' ,
"Product" ,
"Customers" ,
"Transactions" ,
"Geography" ,
 "Sales" ,
 "Admins" ,
 "Performance",
 "Dashboard"],

endpoints:(build )=>({

// for getting user data//
    getUser:build.query({
        query:(id) => `general/user/${id}`,
        providesTags:["User"]
    }),
    // for getting product  data//
    getProduct : build.query({
        query:()=>"client/product",
        providesTags:["Product"]
    }),
        // for getting customer  data//

    getCustomers: build.query({
        query: () => "client/customers",
        providesTags: ["Customers"],
      }),

  // for getting from transactions  data//

      getTransactions: build.query({
        query: ({ page, pageSize, sort, search }) => ({
          url: "client/transactions",
          method: "GET",
          params: { page, pageSize, sort, search },
        }),
        providesTags: ["Transactions"],
      }),

      //for getting from Geography data//

      getGeography: build.query({
        query :()=>"client/geography",
        providesTags: ["Geography"],
      }),
      getSales: build.query({
        query:() => "sales/sales",
        providesTags :["Sales"]
      }),
// get data from admin// 
      getAdmins: build.query({
        query: () => "management/admins",
        providesTags: ["Admins"],
      }),
      getUserPerformance: build.query({
        query: (id) => `management/performance/${id}`,
        providesTags: ["Performance"],
      }),
      // get data from Dashboard // 

      getDashboard: build.query({
        query: () => "general/dashboard",
        providesTags: ["Dashboard"],
      }),
}),

});

export const{useGetUserQuery
    ,useGetProductQuery ,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery
  } = api;