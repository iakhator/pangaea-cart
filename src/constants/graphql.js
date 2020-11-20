import gql from 'graphql-tag';

export const PRODUCTS_QUERY = gql`query productList ($currency: Currency) {
  products {
    id,
    title,
    image_url,
    price(currency: $currency)
  }
}`

export const CURRENCY_QUERY = gql`query currencyList{
  currency
}`
