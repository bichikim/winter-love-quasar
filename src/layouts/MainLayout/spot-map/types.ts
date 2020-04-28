export interface Position {
  lat: number
  lng: number
}

export interface Spot {
  id: string
  name: string
  location: Position
  avatar?: string
}

export interface Shop extends Spot {

}

export interface ShopSearch extends Shop {
  targetProduct?: Product
}

export interface Product {
  id: string
  name: string
  price: number
  currency: string
}
