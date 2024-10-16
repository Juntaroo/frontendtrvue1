import type { Sesion } from '@/models/SesionModel'

export interface SesionState {
  loading: boolean
  data: Sesion | null // Si no hay sesion actica se lo pone como null
}
