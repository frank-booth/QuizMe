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
      this.get('api/todos', (schema) => {
        return schema.todos.all()
      })
      this.post('api/todos', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.todos.create(attrs)
      })
      this.delete('api/todos/:id', (schema, request) => {
        let id = request.params.id
        return schema.todos.find(id).destroy()
      })
    }
  })
}
