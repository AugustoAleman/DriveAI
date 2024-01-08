export interface Dealership {
  id: number,
  name: string
}

export interface EditManagerProps {
  open: boolean,
  handleClose: () => void,
  onSuccess?: () => void,
  managerId: number,
}

export interface FetchHandlingType {
  delete: boolean,
  add: boolean,
  dealerships: boolean
  user: boolean
}

export interface AgencyObj {
  value: number,
  label: string,
}

export interface User {
  id: number,
  name: string,
  surname: string,
  email: string
}