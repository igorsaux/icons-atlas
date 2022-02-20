import { pick_icon, query } from './pkg'

export type QueryResult = {
  score: number
  fields: {
    path: string
    state: string
    id: string
  }
}

export function makeQuery(message: string, limit: number): QueryResult[] {
  const queryResult = query(message, limit) as any[]

  return queryResult.map(result => {
    const fields = JSON.parse(result.fields)

    fields.path = fields.path[0]
    fields.state = fields.state[0]
    fields.id = fields.id[0]

    return {
      ...result,
      fields
    }
  })
}

export function pickIcon(iconId: string): {
  [key: string]: string
} {
  return pick_icon(iconId)
}
