import {
  Box,
  Container,
  Heading,
  HStack,
  Tr,
  Td,
  Text,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCompanyStaffs, uploadCompany } from "../api";
import { ICompanyStaff } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import DynamicFields, { FormData } from "../components/StaffUploadInput";
import StaffNotificatInput from "../components/StaffNotificatInput";
import PreDate from "../components/PreDate";
import { format, startOfDay } from "date-fns";
import axios from "axios";

export interface StaffFormData {
  dynamicFields: {
    pk: number;
    name: string;
    is_office: boolean;
    seg_type: string;
    g_examination: string;
    s_examination: string;
    is_night: boolean;
    join_date: string;
    pre_examination_date: string;
  }[];
}
interface Data {
  pk: string;
  pre_examination_date: string;
}

export default function StaffNotificat() {
  const { companyPk } = useParams();
  const { isLoading, data } = useQuery<ICompanyStaff[] | undefined>(
    [`staffs`, companyPk],
    getCompanyStaffs
  );

  const { handleSubmit, register } = useForm<StaffFormData>();
  const onSubmit: SubmitHandler<StaffFormData> = async (data) => {
    const Rdata = data["dynamicFields"].slice(1);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/companies/1/staffs`,
        Rdata
      );
      console.log("Data updated successfully:", response.data);
      window.location.href = "http://localhost:3000/companies/1";
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mx={"auto"}>
        <Text
          align={"center"}
          fontSize={"4xl"}
          mb={"16"}
          mt={"10"}
          fontWeight={"bold"}
        >
          {currentYear}년{currentMonth}월 직원 정기검진 보고서
        </Text>
        <HStack
          pb={"1rem"}
          display="flex"
          fontWeight={"semibold"}
          justifyContent={"center"}
          textAlign={"center"}
          mx={"auto"}
        >
          <Text fontSize="xl" w="32" mr={"32"} pl={"14"}>
            이름
          </Text>
          <Text fontSize="xl" w="32" mr={"28"}>
            공정명
          </Text>
          <Text fontSize="xl" maxW={"80"} mr={"28"}>
            배치후&직전 검진 예정일
          </Text>
          <Text fontSize="xl" w={"80"}>
            배치후&직전 검진 최종 확정일
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch" mt={"5"} fontWeight={"medium"}>
          {data.map((staff) => (
            <Box
              key={staff.pk}
              display="flex"
              justifyContent={"center"}
              textAlign={"center"}
            >
              <Text w={"32"} align={"center"} mr={"28"}>
                {staff.name}
              </Text>
              <Text w={"32"} align={"center"} mr={"28"}>
                {staff.segs.name}
              </Text>
              <Input
                maxW={"52"}
                {...register(`dynamicFields.${staff.pk}.pk`)}
                type="hidden" // 숨김 필드로 staff.pk 값을 서버에 전달할 수 있음
                value={staff.pk} // staff.pk 값을 숨김 필드의 값으로 설정
              />
              <Text align={"center"} w={"52"} mr={"28"} textAlign={"center"}>
                <PreDate
                  pre_examination_date={staff.pre_examination_date}
                  staff={staff.segs}
                />
              </Text>
              <Input
                w={"80"}
                {...register(`dynamicFields.${staff.pk}.pre_examination_date`)}
                type="date"
                defaultValue={format(startOfDay(new Date()), "yyyy-MM-dd")}
              />
            </Box>
          ))}
        </VStack>
        <Box display={"flex"} justifyContent={"center"}>
          <Button mt={"10"} type="submit">
            제출
          </Button>
        </Box>
      </Box>
    </form>
  );
}
