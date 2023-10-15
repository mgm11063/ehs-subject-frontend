import React from "react";
import { ISegType, IFactor } from "../types";
import { addMonths, format } from "date-fns";
import { Td } from "@chakra-ui/react";

interface SegProps {
  staff: ISegType;
  join_date: string;
  pre_examination_date: string;
  is_night: boolean;
}

const Seg: React.FC<SegProps> = ({
  staff,
  join_date: in_date,
  is_night,
  pre_examination_date,
}) => {
  const comparisonList: number[] = [];

  staff.factors.forEach((factor: IFactor) => {
    comparisonList.push(factor.check_cycle, factor.regular_check_cycle);
  });

  const minCycle = Math.min(...comparisonList);
  const maxCycle = Math.max(...comparisonList);

  console.log(minCycle, maxCycle);

  const pre_date = new Date(pre_examination_date);
  const addOMDate = addMonths(pre_date, minCycle);
  const addSMDate = addMonths(addOMDate, maxCycle);
  const Oresult = format(addOMDate, "yyyy-MM-dd");
  const Sresult = format(addSMDate, "yyyy-MM-dd");
  console.log(addOMDate);
  return (
    <>
      <Td>
        {staff.factors.map((factor: IFactor, index: number) => (
          <div key={index}>
            {factor.value} ( 배치후 주기 : {factor.check_cycle}개월 |
            정기검진주기 : {factor.regular_check_cycle}개월)
          </div>
        ))}
        {is_night ? <div>야간작업</div> : null}
      </Td>
      <Td textAlign={"center"}>{in_date}</Td>
      <Td textAlign={"center"}>{Oresult}</Td>
      <Td textAlign={"center"}>{Sresult}</Td>
    </>
  );
};

export default Seg;
