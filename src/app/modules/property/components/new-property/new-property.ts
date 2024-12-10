export const PropertyFormControls: PropertyFormControlTypes[] = [
  {
    title: 'Title',
    placeholder: 'Add the title of the advertisement',
    error: 'Title is required',
    formControlName: 'title',
    type: 'text'
  },
  {
    title: 'Country',
    placeholder: 'Add the country of the advertisement',
    error: 'Country is required',
    formControlName: 'country',
    type: 'text'
  },
  {
    title: 'City',
    placeholder: 'Add the city of the advertisement',
    error: 'City is required',
    formControlName: 'city',
    type: 'text'
  },
  {
    title: 'Postcode',
    placeholder: 'Add the postcode of the advertisement',
    error: 'Postcode is required',
    formControlName: 'postcode',
    type: 'text'
  },
  {
    title: 'Floor',
    placeholder: 'Add the floor of the advertisement',
    error: 'Floor is required',
    formControlName: 'floor',
    type: 'number'
  },
  {
    title: 'Area',
    placeholder: 'Add the area of the advertisement',
    error: 'Area is required',
    formControlName: 'area',
    type: 'number'
  },
  {
    title: 'No. of rooms',
    placeholder: 'Add the no. of rooms of the advertisement',
    error: 'No. of rooms is required',
    formControlName: 'rooms',
    type: 'number'
  },
  {
    title: 'Price',
    placeholder: 'Add the price of the advertisement',
    error: 'Price is required',
    formControlName: 'price',
    type: 'number'
  },
  {
    title: 'Telephone number',
    placeholder: 'Add the telephone number of the advertisement',
    error: 'Telephone number is required',
    formControlName: 'telephoneNumber',
    type: 'text'
  }
]

export interface PropertyFormControlTypes {
  title: string
  placeholder: string
  error: string,
  formControlName: string,
  type: string
}

export const AccepterFileTypes =
  'image/jpeg,image/png,image/svg+xml,'
