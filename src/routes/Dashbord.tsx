import {
  Box,
  Button,
  Heading,
  Link,
  List,
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import { get35DayStaffs, getDashbord } from "../api";
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
import { addMonths, format } from "date-fns";

export default function Dashbord() {
  const { companyPk } = useParams();
  const { isLoading, data } = useQuery<ICompanyStaff[]>(
    [`35companies`, companyPk],
    get35DayStaffs
  );
  const { isLoading: isLoading2, data: data2 } = useQuery<ICompanyStaff[]>(
    [`companies`, companyPk],
    getDashbord
  );

  return (
    <>
      <Box>
        <Tabs position="relative" variant="unxstyled">
          <TabList>
            <Tab>검진실시현황</Tab>
            <Tab>업커밍</Tab>
            {/* 7일 /30일 */}
            <Tab>사후관리</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>검진실시현황내용들어올곳</TabPanel>
            <TabPanel>업커밍들어올곳</TabPanel>
            <TabPanel>사후관리들어올곳</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Tabs position="relative" variant="unxstyled">
        <TabList>
          <Tab>신규입사자</Tab>
          <Tab>기존입사자</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Table variant="simple">
              <TableCaption>
                Copyright 2023. EHS FRIENDS All pictures cannot be copied
                without permission.
              </TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    성명
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    공정명
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    입사&배치일
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    배치후&직전 검진 예정일
                  </Th>
                  <Th textAlign={"center"} fontSize={"xl"} color={"red.500"}>
                    남은 검진 예정일
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((staff: ICompanyStaff) => {
                  const joinDateObj: Date = new Date(staff.join_date);
                  const newDate = addMonths(
                    joinDateObj,
                    staff.segs.once_cycle_date
                  );

                  const newDateObj: Date = new Date(newDate);

                  const resultDate = format(newDateObj, "yyyy-MM-dd");
                  const timeDifference: number =
                    newDateObj.getTime() - joinDateObj.getTime();
                  const daysDifference: number =
                    timeDifference / (1000 * 60 * 60 * 24);

                  return (
                    <Tr>
                      <Td textAlign={"center"}>{staff.name}</Td>
                      <Td textAlign={"center"}>{staff.segs.name}</Td>
                      <Td textAlign={"center"}>{staff.join_date}</Td>
                      <Td textAlign={"center"}>{resultDate}</Td>
                      <Td textAlign={"center"} fontSize={"xl"}>
                        {daysDifference + "일"}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table variant="simple">
              <TableCaption>
                Copyright 2023. EHS FRIENDS All pictures cannot be copied
                without permission.
              </TableCaption>
              <Thead>
                <Tr>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    성명
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    공정명
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    이전 검진일
                  </Th>
                  <Th textAlign={"center"} fontSize={"lg"}>
                    정기 검진 예정일
                  </Th>
                  <Th textAlign={"center"} fontSize={"xl"} color={"red.500"}>
                    남은 검진 예정일
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data2?.map((staff: ICompanyStaff) => {
                  const joinDateObj: Date = new Date(
                    staff.pre_examination_date
                  );
                  const newDate = addMonths(
                    joinDateObj,
                    staff.segs.regular_cycle_date
                  );

                  const newDateObj: Date = new Date(newDate);

                  const resultDate = format(newDateObj, "yyyy-MM-dd");
                  const timeDifference: number =
                    newDateObj.getTime() - joinDateObj.getTime();
                  const daysDifference: number =
                    timeDifference / (1000 * 60 * 60 * 24);

                  return (
                    <Tr>
                      <Td textAlign={"center"}>{staff.name}</Td>
                      <Td textAlign={"center"}>{staff.segs.name}</Td>
                      <Td textAlign={"center"}>{staff.pre_examination_date}</Td>
                      <Td textAlign={"center"}>{resultDate}</Td>
                      <Td textAlign={"center"} fontSize={"xl"}>
                        {daysDifference + "일"}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
