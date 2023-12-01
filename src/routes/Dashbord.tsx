import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { get35DayStaffs, getCompany, getDashbord } from "../api";
import { ICompany, ICompanyStaff, IFactor, IOpinion } from "../types";
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
  const { isLoading: isLoading3, data: data3 } = useQuery<ICompany>(
    [`all_companies`, companyPk],
    getCompany
  );
  console.log(data3)
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
            <TabPanel>
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
                        Copyright 2023. EHS FRIENDS All pictures cannot be
                        copied without permission.
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
                          <Th
                            textAlign={"center"}
                            fontSize={"xl"}
                            color={"red.500"}
                          >
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
                        Copyright 2023. EHS FRIENDS All pictures cannot be
                        copied without permission.
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
                          <Th
                            textAlign={"center"}
                            fontSize={"xl"}
                            color={"red.500"}
                          >
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
                              <Td textAlign={"center"}>
                                {staff.pre_examination_date}
                              </Td>
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
            </TabPanel>
            <TabPanel>
              <Table variant="simple">
                <TableCaption>
                  Copyright 2023. EHS FRIENDS All pictures cannot be
                  copied without permission.
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
                      의사 소견
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data3?.staffs.map((staff: ICompanyStaff) => (
                    <Tr key={staff.pk}>
                      <Td textAlign="center">{staff.name}</Td>
                      <Td textAlign="center">{staff.segs.name}</Td>
                      {staff.opinions && staff.opinions.length > 0 ? (
                        staff.opinions.map((opinion: IOpinion) => (
                          <Td textAlign="center" key={opinion.year_and_month}>
                            {opinion.year_and_month}: {opinion.opinion}
                          </Td>
                        ))
                      ) : (
                        <Td colSpan={1} textAlign="center">
                          의견이 없습니다
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left'>
                        Section 1 title
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex='1' textAlign='left'>
                            Section 2 title
                          </Box>
                          {isExpanded ? (
                            <MinusIcon fontSize='12px' />
                          ) : (
                            <AddIcon fontSize='12px' />
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </TabPanel>


          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
