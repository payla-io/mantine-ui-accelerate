import { Stack } from '@mantine/core'
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


export default function CPhoneInput(props: Readonly<PhoneInputProps>) {

  return <Stack>
          <PhoneInput
            country={'de'}
            inputStyle={{width: '100%'}}
            {...props}
          />
          </Stack>
}
