import {Repository} from "../utils/types";

interface RepositoryItemProps {
  repository: Repository
}
import '../styles/repository_item.scss'
export function RepositoryItem({repository: {name, description, html_url, owner}}: RepositoryItemProps) {
  return (
    <li>
      <img src={owner.avatar_url} alt={owner.login} />
      <strong>{name}</strong>
      <p>{description}</p>
      <a href={html_url} target="_blank">Acessar repositório</a>
    </li>
  );
}
