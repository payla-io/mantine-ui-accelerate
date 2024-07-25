import { CForm } from ".";

export interface CLocationInputProps {
  form: any;
  value: Record<string, unknown>;
  name: string;
  noFooter?: boolean;
}

export function CLocationInput(props: Readonly<CLocationInputProps>) {
  const fields = [
    "street",
    "house_number",
    "zipcode",
    "city",
    "state",
    "country",
  ];
  return (
    <CForm
      noFormTag
      data={[
        {
          inputType: "text",
          name: "street",
          initialValue: props.value?.street,
          inputProps: {
            placeholder: "Street name",
          },
        },
        {
          inputType: "number",
          label: "House number",
          name: "house_number",
          initialValue: props.value?.house_number,
        },
        {
          inputType: "number",
          label: "Zip code",
          name: "zipcode",
          initialValue: props.value?.zipcode,
        },
        {
          inputType: "text",
          label: "City",
          name: "city",
          initialValue: props.value?.city,
        },
        {
          inputType: "text",
          label: "State",
          name: "state",
          initialValue: props.value?.state,
        },
        {
          inputType: "text",
          label: "Country",
          name: "country",
          initialValue: props.value?.country,
        },
      ]}
      onValueChange={(values) => {
        if (fields.every((field) => values[field]) && props.value !== values) {
          props.form.setFieldValue(props.name, values);
        }
      }}
      hideSubmit
      noFooter={props.noFooter}
    />
  );
}
