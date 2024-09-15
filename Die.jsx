import React, {useEffect, useState} from 'react'

export default function Die(props){
    const [highlight, setHighlight] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHighlight(true)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])
    

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div 
            className = {`die-face ${highlight ? 'highlight' : ''}`}
            style={styles} 
            onClick={props.holdDice}
        >
            <h2 className="'die-num'">{props.value}</h2>
        </div>
    )
}

