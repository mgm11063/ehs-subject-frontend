import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

interface ICompanyProps {
  pk: number;
  name: string;
  user: number;
}

export default function Company({ pk, name, user }: ICompanyProps) {
  const gray = useColorModeValue("gray.600", "gray.300");

  return (
    <Link to={`/companies/${pk}`}>
      <VStack alignItems={"flex-start"}>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Box>
              <Image src="https://pds.saramin.co.kr/company/logo/201905/22/prw8k9_dl6f-2rxid7_logo.jpg" />
              <Text
                display={"block"}
                as="b"
                fontSize="lg"
                textAlign={"center"}
                mt={"5"}
              >
                {name}
              </Text>
            </Box>
          </Grid>
        </Box>
      </VStack>
    </Link>
  );
}
