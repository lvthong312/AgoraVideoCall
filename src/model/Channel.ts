export interface IChannel {
  id: String;
  channel: String;
  title: String;
  description: String;
  passCode: String;
  image: String;
  duration: String;
  user: {
    userId: String;
    username: String;
    email: String;
    avatar: String;
    birthdate: String;
    registeredAt: String;
  };
}
