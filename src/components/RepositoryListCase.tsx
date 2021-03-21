import {Loader} from "./Loader"
import {RepositoryItem} from "./RepositoryItem"
import {Welcome} from "./Welcome"
import {Error as ErrorComponent} from './Error'
import {Repository, STATUS_TYPE} from "../utils/types"
interface RepositoryListCaseProps {
  status: STATUS_TYPE
  repositories: Repository[]
}
export function RepositoryListCase({status, repositories}: RepositoryListCaseProps) {
  switch(status ) {
    case 'RESOLVED':
      return (
        <ul>
          {repositories.map(repository => (
            <RepositoryItem key={repository.id} repository={repository} />
          ))}
        </ul>
    )
    case 'PENDING':
      return (
        <Loader />
    )
    case 'IDLE':
      return (
        <Welcome />
    )
    case 'REJECTED':
      return (
        <ErrorComponent message={'Erro na API'} />
    )
    default:
      throw new Error(`Unhandled status ${status}`)
  }
}
