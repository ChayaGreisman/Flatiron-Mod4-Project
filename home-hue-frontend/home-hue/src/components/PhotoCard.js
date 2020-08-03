import React from 'react'

// const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
//     const hex = x.toString(16)
//     return hex.length === 1 ? '0' + hex : hex
//   }).join('')

// const turnToNumbers = (str) => {
//     let arrOfNumberStrings= str.slice(4,-1).split(', ')
//     return rgbToHex(parseInt(arrOfNumberStrings[0]), parseInt(arrOfNumberStrings[1]), parseInt(arrOfNumberStrings[2]))
// }





const PhotoCard = (props) => {

    const  getHex=(color)=>{

        fetch(`https://www.thecolorapi.com/id?rgb=${color.slice(4,-1).split(', ').join()}`)
         .then(res=>res.json())
         .then(res=>{
            window.open(`https://encycolorpedia.com/${res.hex.clean}`,'_blank') 
            console.log(res.hex.clean)
         })
     }

    return(
        <div>
            <div className="ui card">
                <div className="image photo-image">
                    <img src={props.img_url} alt='pic'/>
                </div>
                <div className="content">
                    <button className="ui button" onClick={()=>getHex(props.color1)} style={{backgroundColor: props.color1}}><i class="info circle big icon"></i></button>
                    <button className="ui button" onClick={()=>getHex(props.color2)} style={{backgroundColor: props.color2}}><i class="info circle big icon"></i></button>
                    <button className="ui button" onClick={()=>getHex(props.color3)} style={{backgroundColor: props.color3}}><i class="info circle big icon"></i></button>
                    {/* <button className="ui button" onClick={()=>window.open(`https://encycolorpedia.com/${props.color2.substr(1)}`,'_blank')} style={{backgroundColor: props.color2}}><i class="info circle big icon"></i></button>
                    <button className="ui button" onClick={()=>window.open(`https://encycolorpedia.com/${props.color3.substr(1)}`,'_blank')} style={{backgroundColor: props.color3}}><i class="info circle big icon"></i></button> */}
                </div>
            </div>
        </div>
    )
}

export default PhotoCard