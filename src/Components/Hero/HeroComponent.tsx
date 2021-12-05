import "./HeroComponent.css"

export function HeroComponent(){
    return(
        <div className="hero-container">
                <div className="hero-text">
                    <div className="hero-title">How well you know about CryptoCurrency!</div>
                    <div className="hero-description">Check you knowledge about Cryptocurrency and Blockchain by taking our Quiz below</div>
                </div>
                <img className="hero-img" src="cryptocurrency.png" alt="cryptocurrency"/>
        </div>
    )
}