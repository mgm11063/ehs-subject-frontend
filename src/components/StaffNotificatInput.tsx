import React from "react";
import { SubmitHandler, useFieldArray, Control } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  VStack,
  Checkbox,
  FormControl,
  Select,
  Stack,
  MenuItemOption,
  Tbody,
  Thead,
  Tr,
  Th,
  Text,
  HStack,
} from "@chakra-ui/react";
import Factors from "./Factors";
import { FactorOption } from "../types";

export interface FormData {
  dynamicFields: {
    name: string;
    is_office: boolean;
    seg_type: string;
    g_examination: string;
    s_examination: string;
    factors: [FactorOption];
    is_night: boolean;
    join_date: string;
  }[];
}

interface StaffNotificatInputFieldsProps {
  control: Control<FormData>;
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: any;
  register: any;
  setValue: any;
}

const StaffNotificatInput: React.FC<StaffNotificatInputFieldsProps> = ({
  control,
  onSubmit,
  handleSubmit,
  register,
  setValue,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack
          pb={"1rem"}
          display="flex"
          justifyContent="space-between"
          fontWeight={"bold"}
        >
          <Text fontSize="xl" pr={"36"}>
            이름
          </Text>
          <Text fontSize="xl" pr={"6.2rem"}>
            입사일
          </Text>
        </HStack>
        <VStack spacing={4} align="stretch">
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" justifyContent="flex-start">
              <Input
                {...register(`dynamicFields[${index}].join_date`)}
                type="date"
                placeholder={`입사일`}
                maxW={"36"}
              />
              <Button
                bg={"red.400"}
                type="button"
                onClick={() => remove(index)}
                ml={4}
              >
                삭제
              </Button>
            </Box>
          ))}

          <Button type="submit">Submit</Button>
        </VStack>
      </form>
    </>
  );
};

export default StaffNotificatInput;
