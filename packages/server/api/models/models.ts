// Модели в БД

export type Topic = {
  id: string;
  title: string;
  author_id: number;
  created_at: Date;
  comments_ids: number[];
};

export type Comment = {
  id: string;
  text: string;
  author_id: number;
  created_at: Date;
  topic_id: number;
  parent_comment_id: string | null;
  reactions_ids: number[];
};

export type User = {
  id: string;
  name: string;
  avatar_url: string;
  // не понимаю как этот юзер соотносится с тем, что на яндексовском бэке, возможно тут еще другие поля: name, secondname, displayName..., уточню
};

export type Reaction = {
  id: string;
  code: string; //не очень понимаю что вообше такое эта реакция, тут наверно какой-то код emoji
  user_id: string;
  comment_id: string;
};

//Модели

type UserModel = {
  id: string;
  name: string;
  avatarUrl: string;
  // не понимаю как этот юзер соотносится с тем, что на яндексовском бэке, возможно тут еще другие поля: name, secondname, displayName..., уточню
};

type ReactionModel = {
  id: string;
  code: string;
  author: UserModel;
};

type CommentModel = {
  id: string;
  text: string;
  author: UserModel;
  createdAt: Date;
  parent?: CommentModel;
  reactions: ReactionModel[];
};

export type TopicModel = {
  id: string;
  author: UserModel;
  members: UserModel[];
  title: string;
  comments: CommentModel[];
};

// API

// //User
// пока не знаю

// //Comment
// POST ('/', {authorID, text, parentCommentID, topicID}) // написать сообщение

// //Reaction
// POST ('/', {authorID, reactionID, commentID}) // поставить реакцию сообщению
// DELETE ('/', {authorID, reactionID, commentID}) // удалить реакцию // не знаю нужен ли

// //Topic
// GET('/') => {id:string, name:string}[] //получаем список топиков без комментариев
// POST('/', {authorID, name}) //создать топик
// GET ('/{id}') => { members: UserModel[], comments:CommentModel[] } // получить все сообщения и всех участников в топике

//PS во всех запросах на создание чего-либо я отсылаю authorID возможно должен быть механизм чтобы его не отсылать а он проставлялся автоматически
