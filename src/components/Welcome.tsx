import '../styles/welcome.scss'
export function Welcome() {
  return (
    <div className="welcome">
      <h2>Bem vindo(a) ao Github Explorer</h2>
      <img src="https://github.com/vinibispo.png" />
      <div className="card">
        <span>Meu nome é Vinícius Bispo e fiz esse projeto a fim de exercitar meu css</span>

        <h3>Como funciona?</h3>
        <p>Digite o nome de um repositório e observe a mágica :-{')'}</p>
      </div>
    </div>
  )
}
