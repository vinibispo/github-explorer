import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
import {useEffect, useState} from "react";
import {Repository} from "../utils/types";

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
    .then(res => res.json())
    .then(data => setRepositories(data))
  }, [])
  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>
      <ul>
        {repositories.map(repository => (
          <RepositoryItem key={repository.id} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
