export enum Status {
  ALIVE = 'VIVO',
  DEAD = 'MUERTO',
  UNKNOWN = 'DESCONOCIDO',
}

export function getStatusFromValue(status: string): Status {
  const statusMap = { vivo: Status.ALIVE, fallecido: Status.DEAD }
  return statusMap[status?.toLowerCase()] || Status.UNKNOWN
}

export interface CharacterDB {
  id: string
  name: string
  url: string
}

export interface Character {
  id: string
  name: string
  race: string
  bounties: number[]
  birthday: string
  status: Status
  bloodType: string
  roles: string[]
  affiliations: string[]
}
