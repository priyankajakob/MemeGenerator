import './Meme.css'

import { useState } from 'react'

const Meme = ()=>{

    const [ meme , setMeme ] = useState({})
    const [ values, setValues ]=useState({
        textTop:"",
        textBottom:""
    })
    const {textTop, textBottom} = values

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setValues({...values,[name]:value})
    }
    // useEffect(()=>{
    //     console.log(values)
    // },[values])

    const getMemeHandler = (e)=>{
        e.preventDefault()

        let imgUrl = "",width=0,height=0
        fetch('https://api.imgflip.com/get_memes')
        .then(response=>response.json())
        .then(({data})=>{
            const {memes} = data

            // imgUrl = memes[2].url

            //to pick image randomnly
            let randomIndex = Math.floor(Math.random()*memes.length)
            // console.log(randomIndex)
            // console.log(memes.length)
            imgUrl = memes[randomIndex].url
            width = memes[randomIndex].width
            height = memes[randomIndex].height

            setMeme({
                "textTop":textTop.toUpperCase(),
                "textBottom":textBottom.toUpperCase(),
                "imgUrl":imgUrl,
                "width":width,
                "height":height
            })
        })
        .catch(e=>console.log(e))
    }
    return(
        <div>
            <form onSubmit={getMemeHandler}>
                <input 
                    type="text" 
                    value={textTop} 
                    onChange={handleChange}
                    name="textTop"
                    required/>
                <br/>
                <br/>
                <input 
                    type="text" 
                    value={textBottom} 
                    onChange={handleChange}
                    name="textBottom"
                    required/>
                <br/>
                <br/>
                <input type="submit" value="Get Meme"/>
            </form>
            {(Object.entries(meme).length!==0)?(
                <div className="meme">
                    <img src={meme.imgUrl} alt="not loaded" width={meme.width} height={meme.height}/>
                    <h1 className="top">{meme && meme.textTop}</h1>
                    <h1 className="bottom">{meme && meme.textBottom}</h1>
                </div>
            ):(null)}
        </div>
    )
}
export default Meme