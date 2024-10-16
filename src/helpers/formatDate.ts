export function useTime(timestamp: Date | number) {
  const date = new Date(timestamp) //estoy convirtiendo el timestamp a un objeto Date
  const hours = String(date.getHours()).padStart(2, '0') //acá agrego ceros a la izquierda
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  //estoy obteniendo las horas, minutos y segundos
  return `${hours}:${minutes}:${seconds}` //formateao la hora
}
