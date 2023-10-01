import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
  HStack,
  Td,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadCompany } from "../api";
import { ICompanyStaff } from "../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UploadCompany() {
  const { register, handleSubmit } = useForm<ICompanyStaff>();
  const toast = useToast();
  const navigate = useNavigate();
  const mutation = useMutation(uploadCompany, {
    onSuccess: (data: ICompanyStaff) => {
      toast({
        status: "success",
        title: "Company created",
        position: "bottom-right",
      });
      navigate(`/companies/${data.pk}`);
    },
  });
  const onSubmit2 = (data: any) => {
    console.log(data);
  };
  const onSubmit = (data: ICompanyStaff) => {
    console.log(data);
    mutation.mutate(data);
  };
  const [counter, setCounter] = useState(0);
  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  return (
    <>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Company</Heading>

          <VStack>
            <Button onClick={handleClick} colorScheme="teal" size="sm">
              Button
            </Button>
          </VStack>

          <HStack spacing={10} as="form" onSubmit={onSubmit2} mt={5}>
            <FormControl>
              {Array.from(Array(counter)).map((c, index) => {
                return (
                  <Input
                    id={counter.toString()}
                    {...register("name", { required: true })}
                    type="text"
                  />
                );
              })}
              {mutation.isError ? (
                <Text color="red.500">Something went wrong</Text>
              ) : null}
              <Button
                type="submit"
                isLoading={mutation.isLoading}
                colorScheme={"red"}
                size="lg"
                w="100%"
              >
                Upload Company
              </Button>
            </FormControl>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
