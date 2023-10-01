import { Grid, useEditable } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getCompanies } from "../api";
import Company from "../components/Company";
import CompanySkeleton from "../components/CompanySkeleton";
import { ICompanyList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<ICompanyList[]>(
    ["companies"],
    getCompanies
  );
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
          <CompanySkeleton />
        </>
      ) : null}

      {data?.map((company) => (
        <Company
          key={company.pk}
          pk={company.pk}
          name={company.name}
          user={company.user}
        />
      ))}
    </Grid>
  );
}
