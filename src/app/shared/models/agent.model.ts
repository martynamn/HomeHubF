export interface AgentType {
  _id: string
  firstName: string
  lastName: string
  telephoneNumber: string
  gender: string
  email: string
  country: string
  city: string
  description: string
  agencyName: string
  agentLicenseId: string
  premium: boolean
  images: ImageType[]
}

export interface ImageType {
  filename: string
  imageData: string
}