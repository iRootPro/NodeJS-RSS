const uuid = require('uuid');

class Task {
  constructor({
                id = uuid(),
                title = 'title',
                order = 0,
                description = 'desc',
                userId = 'string',
                boardId = 'string',
                columnId = 'string'
              } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
