import React from "react";
import { ISegType, IFactor } from "../types";
import { addMonths, format } from "date-fns";
import { Td } from "@chakra-ui/react";

interface SegProps {
  staff: ISegType;
  join_date: string;
  pre_examination_date: string | null;
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

  const minNumber = Math.min(...comparisonList);
  const maxNumber = Math.max(...comparisonList);

  let parsedDate: Date;

  if (pre_examination_date) {
    parsedDate = new Date(pre_examination_date);
  } else {
    parsedDate = new Date(in_date);
  }
  const date = new Date(in_date);
  const newDate1 = addMonths(parsedDate, minNumber);
  const newDate2 = addMonths(parsedDate, maxNumber);

  const join_date = format(parsedDate, "yyyy년MM월dd일");
  const join_date2 = format(parsedDate, "yyyy년MM월dd일");
  const formattedDate1 = format(newDate1, "yyyy년MM월dd일");
  // const formattedDate2 = format(newDate2, "yyyy년MM월dd일");
  const formattedDate5 = format(date, "yyyy년MM월dd일");

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
      <Td>{formattedDate5}</Td>
      <Td>{pre_examination_date != null ? "정기검진대상자" : join_date}</Td>
      <Td>{formattedDate1}</Td>
      <Td>{}</Td>
      <Td>{pre_examination_date != null ? "기존 작업자" : "신규 작업자"}</Td>
    </>
  );
};

export default Seg;
