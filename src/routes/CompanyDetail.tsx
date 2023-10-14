import { Button, Heading, Link, Skeleton, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import { getCompany } from "../api";
import { ICompany, ICompanyStaff, IFactor } from "../types";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Seg from "../components/Seg";

export default function CompanyDetail() {
  const { companyPk } = useParams();
  const { isLoading, data } = useQuery<ICompany>(
    [`companies`, companyPk],
    getCompany
  );

  return (
    <>
      <VStack>
        <Button colorScheme="teal" variant="outline">
          <Link color="teal" href="http://localhost:3000/companies/1/upload">
            직원 명단 추가
          </Link>
        </Button>
      </VStack>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Heading mb="8" fontWeight="extrabold"></Heading>
        <TableContainer
          rounded="2xl"
          overflowX="inherit"
          overflowY="inherit"
          mx="auto"
        >
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>성명</Th>
                <Th>사무직 구분</Th>
                <Th>야간근무</Th>
                <Th>일반검진 실시 여부</Th>
                <Th>특수검진 실시 여부</Th>
                <Th>SEG</Th>
                <Th>유해물질</Th>
                <Th>입사&배치일</Th>
                <Th>배치전 검진 예정일</Th>
                <Th>배치후&직전 검진 예정일</Th>
                <Th>정기 검진 예정일</Th>
                <Th>비고</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.staffs.map((staff: ICompanyStaff) => {
                return (
                  <Tr>
                    <Td>{staff.name}</Td>
                    <Td>{staff.is_office ? "O" : "X"}</Td>
                    <Td>{staff.is_night ? "O" : "X"}</Td>
                    <Td>{staff.g_examination}</Td>
                    <Td>{staff.s_examination}</Td>
                    <Td>{staff.segs.name}</Td>
                    <Seg
                      pre_examination_date={staff.pre_examination_date}
                      is_night={staff.is_night}
                      join_date={staff.join_date}
                      staff={staff.segs}
                    />
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Skeleton>
    </>
  );
}
