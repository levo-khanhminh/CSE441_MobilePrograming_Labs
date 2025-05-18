export type Contact = {
  login: {
    uuid: string;
    username: string;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  favourite: boolean;
};
