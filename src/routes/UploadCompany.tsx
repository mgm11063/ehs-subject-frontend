import { Box, Container, Heading, useToast, HStack } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { uploadCompany } from "../api";
import { ICompanyStaff } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import DynamicFields, { FormData } from "../components/StaffUploadInput";

export default function UploadCompany() {
  const { handleSubmit, control, register, setValue } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Container maxW={"100vw"}>
        <Heading textAlign={"center"}>Upload Company</Heading>
        <HStack spacing={10} mt={5}>
          <Container mt={10} maxW={"100vw"}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <DynamicFields
                control={control}
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                setValue={setValue}
              />
            </Box>
          </Container>
        </HStack>
      </Container>
    </Box>
  );
}
