export interface Iaccount {
  nickname: string,
  banned?: boolean,
  bannedTo?: string,
  _id?: string
}

export interface ItimeToUnban {
  days?: number,
  hours: number,
  minutes: number,
  seconds: number
}