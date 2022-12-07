import {
  createServer,
  Model,
  hasMany,
  belongsTo,
  RestSerailizer
} from 'miragejs'

export default function () {
  createServer({
    seralizers: {
      toDos: RestSerailizer.extend({
        include: ['list'],
        embed: true
      })
    },
    models: {
      list: Model.extend({
        toDos: hasMany()
      }),
      toDos: Model.extend({
        list: belongsTo()
      })
    },
    routes() {
      this.get('api/lists', (schema, request) => {
        return schema.lists.all()
      })
      this.get('api/lists/:id/todos', (schema, request) => {
        let listId = request.params.id
        let list = schema.lists.find(listId)
        return list.todos
      })
    }
  })
}
