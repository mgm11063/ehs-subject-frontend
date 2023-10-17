import { Box, Button, Heading, Link, Skeleton, VStack } from "@chakra-ui/react";
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

export default function CompanyDetail(props: any) {
  const { companyPk } = useParams();
  const { history } = props;
  const { isLoading, data } = useQuery<ICompany>(
    [`companies`, companyPk],
    getCompany
  );

  const fuck = "Hello from Component A";

  const handleClick = () => {
    history.push({
      pathname: "/component-b",
      state: { data: fuck },
    });
  };
  return (
    <>
      <Skeleton height={"43px"} width="25%" isLoaded={!isLoading}>
        <Box ml={"42"} mt={"10"}>
          <TableContainer
            rounded="2xl"
            overflowX="inherit"
            overflowY="inherit"
            mx="auto"
          >
            <Heading mb="8" fontWeight="extrabold">
              버슘머트리얼즈
            </Heading>
            <Table variant="simple">
              <TableCaption>
                Copyright 2023. EHS FRIENDS All pictures cannot be copied
                without permission.
              </TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize={"lg"}>성명</Th>
                  <Th fontSize={"lg"}>사무직 구분</Th>
                  <Th fontSize={"lg"}>야간근무</Th>
                  <Th fontSize={"lg"}>일반검진 실시 여부</Th>
                  <Th fontSize={"lg"}>특수검진 실시 여부</Th>
                  <Th fontSize={"lg"} textAlign={"center"}>
                    SEG
                  </Th>
                  <Th fontSize={"lg"} textAlign={"center"}>
                    유해물질
                  </Th>
                  <Th fontSize={"lg"}>이전&이후 기록 검진일</Th>
                  <Th fontSize={"lg"}>배치후&직전 검진 예정일</Th>
                  <Th fontSize={"lg"}>정기 검진 예정일</Th>
                  <Th fontSize={"lg"}>입사&배치일</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.staffs.map((staff: ICompanyStaff) => {
                  return (
                    <Tr>
                      <Td textAlign={"center"}>{staff.name}</Td>
                      <Td textAlign={"center"}>
                        {staff.is_office ? "O" : "X"}
                      </Td>
                      <Td textAlign={"center"}>{staff.is_night ? "O" : "X"}</Td>
                      <Td textAlign={"center"}>{staff.g_examination}</Td>
                      <Td textAlign={"center"}>{staff.s_examination}</Td>
                      <Td textAlign={"center"}>{staff.segs.name}</Td>
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
        </Box>
        <Box display={"flex"} justifyContent={"center"} w={"310px"}>
          <Button colorScheme="teal" variant="outline">
            <Link color="teal" href="http://localhost:3000/companies/1/staffs">
              정기검진 보고서로 이동
            </Link>
          </Button>
        </Box>
      </Skeleton>
    </>
  );
}
