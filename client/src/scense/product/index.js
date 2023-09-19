import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductQuery } from "state/api";
import Productsss from "./productsss";

const Product = () => {
  const { data, isLoading } = useGetProductQuery();
  const isNonMobile = useMediaQuery("min-width: 1000px");
  console.log(data, "<><>");
  // const calback = (axy)=>{
  //     console.log(axy,"hi m inparent ");
  // }
  return (
    <Box m="1.5rem  2.5rem">
      <Header
        title="Products"
        subtitle="See your List of Products."
        // moreTile={calback}
      />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& div": { gridColumn: isNonMobile ? undefined : "span" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Productsss
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <>isLoading....</>
      )}
    </Box>
  );
};

export default Product;
