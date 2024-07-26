const { useState } = require("react");




const RegisterCat = () => {
    const [cat , setCat] = useState({
        nameCat : ""
    })

    const hundelChange =(e)=>{
        setCat({...setCat , [e.target.name]:e.target.value})
    }



    return (
        <div>
            <form>
                <input type = "text" name= "nameCat" onChange={hundelChange}/>
                <button></button>
            </form>

        </div>
    )
} ;

export default RegisterCat ;