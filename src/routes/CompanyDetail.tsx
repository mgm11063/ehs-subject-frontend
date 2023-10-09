import { Button, Heading, Link, Skeleton, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import { getCompany } from "../api";
import { ICompany } from "../types";
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

export default function CompanyDetail() {
  const { companyPk } = useParams();
  const { isLoading, data } = useQuery<ICompany>(
    [`companies`, companyPk],
    getCompany
  );

  console.log(companyPk);

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
                <Th>유해인자</Th>
                <Th>23년 검진 실시일</Th>
                <Th>차기 검진일</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data?.staffs.map((staff) => {
                return (
                  <Tr>
                    <Td>{staff.name}</Td>
                    <Td>{staff.is_office ? "O" : "X"}</Td>
                    <Td>{staff.is_night ? "O" : "X"}</Td>
                    <Td>{staff.g_examination}</Td>
                    <Td>{staff.s_examination}</Td>
                    <Td>{staff.seg_type.name}</Td>
                    <Td>
                      {staff.factors.map((factor) => {
                        return factor.value + ",";
                      })}
                    </Td>
                    <Td>{staff.join_date}</Td>
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
