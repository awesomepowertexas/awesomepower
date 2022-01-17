import axios from 'axios'

export async function getTduNameFromZipCode(
  zipCode: string,
): Promise<string | null> {
  const response: { data: { company_name: string }[] } = await axios.post(
    'http://powertochoose.com/en-us/service/v1/',
    {
      method: 'TduCompaniesByZip',
      zip_code: zipCode,
      language: 0,
      include_details: false,
    },
  )

  if (!response.data[0]) {
    return null
  }

  return response.data[0].company_name
}
