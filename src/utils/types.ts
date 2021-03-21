interface Owner {
  avatar_url: string
  login: string
}
export interface Repository {
  id: string;
  name: string;
  description: string;
  html_url: string;
  owner: Owner
}
