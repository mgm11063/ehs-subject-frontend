import React from 'react';
import { useForm, SubmitHandler, useFieldArray, Control } from 'react-hook-form';
import { Box, Button, Input, VStack ,Checkbox, FormControl, Select, Stack, MenuItemOption, Tbody, Thead, Tr, Th, Text, HStack} from '@chakra-ui/react';

export interface FormData {
  dynamicFields: {
    name: string;
    is_office: boolean;
    seg_type: string;
    g_examination: string;
    s_examination: string;
    factors: string;
    is_night: boolean;
    join_date: string;
    examination_date: string;
  }[];
}

interface DynamicFieldsProps {
  control: Control<FormData>;
  onSubmit: SubmitHandler<FormData>;
  handleSubmit: any
  register: any;
}


const DynamicFields: React.FC<DynamicFieldsProps> = ({ control, onSubmit ,handleSubmit,register}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dynamicFields',
  });


  return (
    <FormControl onSubmit={handleSubmit(onSubmit)} className='hi'>
      <HStack spacing={4} align="stretch" display="flex">
          <Text fontSize='lg'maxW={"44"}>이름</Text>
          <Text fontSize='lg'maxW={"44"}>사무직</Text>
          <Text fontSize='lg'maxW={"44"}>야간 근무자</Text>
          <Text fontSize='lg'maxW={"44"}>일반검진 실시 여부</Text>
      </HStack>
      <VStack spacing={4} align="stretch">
        {fields.map((field, index) => (
          <Box key={field.id} display="flex" justifyContent="space-between">
            <Input {...register(`dynamicFields[${index}].name`)} placeholder={`이름`} maxW={"44"} />
            <Checkbox {...register(`dynamicFields[${index}].is_office`)} type='checkbox' maxW={"28"}>사무직</Checkbox>
            <Checkbox {...register(`dynamicFields[${index}].is_night`)} type='checkbox'  maxW={"28"}>야간 근무자</Checkbox>
            <Select {...register(`dynamicFields[${index}].g_examination`)} variant='g_examination' maxW={"52"} >
            <option value="" selected disabled hidden>일반검진 실시 여부</option>
            <option value='다른병원에서 일반검진'>다른병원에서 일반검진</option>
            <option value='고대에서 일반검진'>고대에서 일반검진</option>
            <option value='다른병원에서 일반검진'>다른병원에서 일반검진</option>
            <option value='센트럴에서 일반검진'>센트럴에서 일반검진</option>
            </Select>
            <Select {...register(`dynamicFields[${index}].s_examination`)} variant='s_examination' maxW={"52"}>
            <option value="" selected disabled hidden>특수검진 실시 여부</option>
            <option value='고대에서 특수검진'>고대에서 특수검진</option>
            <option value='센트럴에서 특수검진'>센트럴에서 특수검진</option>
            </Select>
            <Input {...register(`dynamicFields[${index}].seg_type`)} placeholder={`공정명(SEG)`} maxW={"56"}/>
            <Input {...register(`dynamicFields[${index}].factors`)} placeholder={`유해인자`} maxW={"64"}/>
            <Input {...register(`dynamicFields[${index}].join_date`)} type="date" placeholder={`입사일`} maxW={"36"}/>
            <Input {...register(`dynamicFields[${index}].examination_date`)} type="date" placeholder={`차기 검진일`} maxW={"36"}/>
            <Button bg={"red.400"} type="button" onClick={() => remove(index)} ml={4}>
              삭제
            </Button>
          </Box>

        ))}
        <Button type="button" onClick={() => append({
              name: "",
              is_office: false,
              is_night: false,
              g_examination: "",
              s_examination: "",
              seg_type: "",
              factors: "",
              join_date: "",
              examination_date: "",
        })}>
          Add Field
        </Button>
        <Button type="submit">Submit</Button>
      </VStack>
    </FormControl>
  );
};

export default DynamicFields;


// 