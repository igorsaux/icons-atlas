import { pick_icon, query } from './pkg'

export type QueryResult = {
  score: number
  fields: {
    icon_path_field: string
    icon_state_name: string
    icon_hashed_id: string
  }
}

export function makeQuery(message: string, limit: number): QueryResult[] {
  const queryResult = query(message, limit) as any[]

  return queryResult.map(result => {
    const fields = JSON.parse(result.fields)

    fields.icon_path_field = fields.icon_path[0]
    fields.icon_state_name = fields.icon_state_name[0]
    fields.icon_hashed_id = fields.icon_hashed_id[0]

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
