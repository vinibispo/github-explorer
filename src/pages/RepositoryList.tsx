import '../styles/repositories.scss'
import {useCallback, useEffect, useReducer, useState} from "react";
import {Repository, STATUS_TYPE} from "../utils/types";
import {api} from "../services/api";
import debounce from 'lodash/debounce'
import {RepositoryListCase} from "../components/RepositoryListCase";
import logoImg from '../assets/logo.png'

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
    error: null,
    ...initialState
  })
  const handleSearch = useCallback(debounce((value: string) => {
      api.get<{items: Repository[]}>('search/repositories', {
        params: {
          q: value
        }
      }).then(res => dispatch({type: 'RESOLVED', data: res.data.items, error: null}))
      .catch(err => {
        console.log(err)
        return dispatch({type: 'REJECTED', data: [], error: err.message})})
    }, 1000)
  , [])
  const fetchRepos = useCallback((search: string) => {
    if(!search) {
      return dispatch({type: 'IDLE', data: [], error: null})
    }
    dispatch({type: 'PENDING', data: [], error: null})
    handleSearch(search)
  }, [handleSearch])
  return {...currentState, fetchRepos}
}
export function RepositoryList() {
  const [search, setSearch] = useState('')
  const {data: repositories, fetchRepos, status} = useAsync({status: 'IDLE', data: [], error: null})
  useEffect(() => {
    return fetchRepos(search)
  }, [search])
  return (
    <section className="repository-list">
      <div className="flex">
        <img className={'logo'} src={logoImg} alt="" />
        <h1>Github Explorer</h1>
      </div>
      <input value={search} placeholder="Digite um repositório" onChange={(e) => setSearch(e.target.value)} />
      <RepositoryListCase status={status} repositories={repositories} />
    </section>
  )
}

