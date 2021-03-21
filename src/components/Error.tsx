import '../styles/error.scss'
interface ErrorProps {
  message: string
}
export function Error({message}: ErrorProps) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  )
}
