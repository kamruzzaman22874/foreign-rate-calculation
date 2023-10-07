import { gql } from "@apollo/client";
import { client } from "../../apollo-client";


const GET_RATE_DATA = gql`
    query GetRate($country: String!, $service: String!, $carrier: String!, $weight: Float!) {
    getRate(country: $country, service: $service, carrier: $carrier, weight: $weight) {
    result
  }
}
`

const ratesData = async(initialData) =>{
    const { country, service, carrier, weight } = initialData;
    const {data} = await client.query({
        query: GET_RATE_DATA,
        variables: { country, service, carrier, weight }
    });
    return data?.getRate.result
}
export default ratesData;


