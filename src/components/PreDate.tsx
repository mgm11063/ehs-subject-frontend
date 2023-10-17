import React from "react";
import { Box, Select as ChakraSelect, Td, Text } from "@chakra-ui/react";
import { FactorOption, IFactor, ISegType } from "../types";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getFactorsOptions } from "../api";
import { Controller } from "react-hook-form";
import { addMonths, format } from "date-fns";

interface SegProps {
  staff: ISegType;
  pre_examination_date: string;
}
const animatedComponents = makeAnimated();
const PreDate: React.FC<SegProps> = ({ staff, pre_examination_date }) => {
  const comparisonList: number[] = [];
  const pre_date = new Date(pre_examination_date);
  staff.factors.forEach((factor: IFactor) => {
    comparisonList.push(factor.check_cycle, factor.regular_check_cycle);
  });

  const minCycle = Math.min(...comparisonList);
  const addOMDate = addMonths(pre_date, minCycle);
  const Oresult = format(addOMDate, "yyyy-MM-dd");
  return (
    <>
      <Box>
        <div>{Oresult}</div>
      </Box>
    </>
  );
};

export default PreDate;
