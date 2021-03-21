import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
import {useCallback, useEffect, useReducer, useState} from "react";
import {Repository, STATUS_TYPE} from "../utils/types";
import {api} from "../services/api";
import {Loader} from "./Loader";
import debounce from 'lodash/debounce'
import {RepositoryListCase} from "../components/RepositoryListCase";

interface ActionRepositoryList {
  type: STATUS_TYPE
  data: Repository[]
  error: string | null
}
interface RepositoryListState {
  data: Repository[],
  error: string | null
  status: STATUS_TYPE
}
const reducer = (state: RepositoryListState, action: ActionRepositoryList) => {
  switch (action.type) {
    case 'PENDING':
      return {
      ...state,
      status: 'PENDING' as STATUS_TYPE,
      error: null
    }
    case 'RESOLVED':
      return {
      status: 'RESOLVED' as STATUS_TYPE,
      data: action.data,
      error: null
    }
    case 'REJECTED':
      return {
      ...state,
      status: 'REJECTED' as STATUS_TYPE,
      error: action.error
    }
    default:
      return {
      ...state,
      status: action.type,
      error: action.error,
      data: action.data
    }
  }
}
function useAsync(initialState: RepositoryListState) {
  const [currentState, dispatch] = useReducer(reducer, {
    status: 'IDLE',
    data: [] as Repository[],
    error: null,
    ...initialState
  })
  const fetchRepos = useCallback((search: string) => {
    if(!search) {
      return dispatch({type: 'IDLE', data: [], error: null})
    }
    dispatch({type: 'PENDING', data: [], error: null})
    debounce((value: string) => {
      api.get<{items: Repository[]}>('search/repositories', {
        params: {
          q: value
        }
      }).then(res => dispatch({type: 'RESOLVED', data: res.data.items, error: null}))
      .catch(err => {
        console.log(err)
        return dispatch({type: 'REJECTED', data: [], error: err.message})})
    }, 3000)(search)
  }, [])
  return {...currentState, fetchRepos}
}
export function RepositoryList() {
  const [search, setSearch] = useState('')
  const {data: repositories, fetchRepos, status, error} = useAsync({status: 'IDLE', data: [], error: null})
  useEffect(() => {
    return fetchRepos(search)
  }, [search])
  return (
    <section className="repository-list">
      <h1>Github Explorer</h1>
      <input value={search} placeholder="Digite um repositório" onChange={(e) => setSearch(e.target.value)} />
      <RepositoryListCase status={status} repositories={repositories} />
    </section>
  )
}

