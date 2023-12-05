export const userPresent = (email: string, data: [any]): boolean => {
  return data.some((user) => (user.email === email ? true : false));
};

export const userAlreadyExist = (email: string, data: [any]): boolean => {
  return data.some((user) => (user.email === email ? true : false));
};

export const search = (posts: [], searchText: string) => {
  return posts.filter(
    (post: any) =>
      post.title.toLowerCase().includes(searchText.toLowerCase()) ||
      post.content.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const setState = (state: any, value: any , ...props: any) => {
    state(value);
}