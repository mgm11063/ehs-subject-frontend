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
            <Text display={"block"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>

            <HStack spacing={1} alignItems="center">
              <FaStar size={12} />
              <Text fontSize={"sm"}>{pk}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {}
          </Text>
        </Box>
        <Text fontSize={"sm"} color={gray}>
          <Text as="b">{user}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
