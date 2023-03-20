export interface Content {
  _id: string
  id: string
  name: string
  rating: number
  numberOfViews: number
  gender: string
  type: string
  dayPick: boolean
  __v:1
  views: Array<string>
  reviews: Array<any>
}