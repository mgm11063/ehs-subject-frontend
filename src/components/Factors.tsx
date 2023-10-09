import React from "react";
import { Select as ChakraSelect } from "@chakra-ui/react";
import { FactorOption } from "../types";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { getFactorsOptions } from "../api";
import { Controller } from "react-hook-form";

interface FactorsProps {
  register: any;
  index: number;
  setValue: any;
  control: any;
}
const animatedComponents = makeAnimated();
const Factors: React.FC<FactorsProps> = ({register,index,setValue,control}) => {
  const { isLoading, data: factors, } = useQuery<FactorOption[]>(["factors"], getFactorsOptions);
  const selectOptions = factors?.map((option:FactorOption) => ({
    value: option.value,
    label: option.label,
  }));
  return (
    <>
      <Controller
        name="selectField"
        control={control}
        render={({ field }) => (
          <Select
            {...register(`dynamicFields[${index}].factors`)}
            components={animatedComponents}
            options={selectOptions}
            isSearchable={true}
            isMulti
            placeholder="옵션을 선택하세요"
            onChange={(selectedOption) => { setValue(`dynamicFields[${index}].factors`, selectedOption); }}
          />
        )}
      />
    </>
  );
};



export default Factors;
