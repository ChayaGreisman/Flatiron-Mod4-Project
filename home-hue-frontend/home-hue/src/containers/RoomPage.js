import React from 'react'
import PhotoCard from '../components/PhotoCard'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class RoomPage extends React.Component{

    state = {
        img_url: '', 
        loading: false
    }



    thisRoom=()=>{
       return this.props.rooms.find(room=> room.id==this.props.match.params.id)
    }


    handleChange =(e)=>{
        this.setState({img_url: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({loading: true})

        if (this.state.img_url !== ''){
            fetch('http://localhost:3000/photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    img_url: this.state.img_url,
                    room_id: this.thisRoom().id
                })
            })
            .then(resp=>resp.json())
            .then(newPhoto=> {
                this.props.handleNewRoomPhoto(newPhoto)
                this.setState({img_url: ''})
                this.setState({loading: false})
            })  
        }
    }

    deleteRoom = () => {
        fetch(`http://localhost:3000/rooms/${this.thisRoom().id}`,{method: "DELETE",})
        this.props.handleDeleteRoom(this.thisRoom().id)
        this.props.history.push(`/@${this.props.currentUser.username}`)
    }



    roomBelongsToCurrentUser = () =>{
        if (this.props.currentUser && this.props.currentUser.id===this.thisRoom().user_id){
            return true
        } else{
            return false
        }
    }




        modalModalExample = () => (

        
        <Modal open={this.state.loading} basic size='fullscreen' >
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <img src="../loading.gif" className="loading-gif" alt='loading' style={{ margin: 'auto', marginTop: '6em', width: '40%'}}/>
            </div>
        </Modal>
       
        )

    render(){
        console.log(this.props.match.params.id)
        return( 
            
            <div className="room-page" style={{height: '100%', backgroundImage: `url(${this.thisRoom().img_url})`, backgroundSize:'cover', backgroundPosition: 'center', backgroundRepeat: "no-repeat", paddingBottom: "30%" }}>
               

                    {this.modalModalExample()}



                <i className="arrow circle big left icon" onClick={()=>this.props.history.goBack()} style={{margin: '1em'}}></i>
                <div className="room-page-header">
                    <h1 style={{fontSize: '40px'}}>{this.thisRoom().name}</h1>
                    <h6>created by @{this.thisRoom().user.username}</h6> 
                </div>

                <div className='room-page-actions'>
                    {this.roomBelongsToCurrentUser() &&
                        <button className="ui secondary button" onClick={()=>this.deleteRoom()} style={{margin: '1em'}}> <i className="trash alternate icon"></i>Delete Room</button>
                    }
                    <br/>
                    {this.roomBelongsToCurrentUser() &&
                        <div className="add-photo-form">
                            <div class="ui action input" style={{marginLeft: '2em'}}>
                                <form className="ui form" onSubmit={this.handleSubmit} style={{display: 'inline'}}>
                                    <input onChange={this.handleChange} type="text" value={this.state.img_url} placeholder="New Image URL Here"/>
                                    <span><button type="submit" className="ui inverted grey button">Add Image <i className="plus icon"></i></button></span>
                                </form>
                            </div>
                        </div>
                    }
                </div>




                <div className="photo-card-container">
                    {this.thisRoom().photos.map(photo=>
                        <PhotoCard key={photo.id} {...photo}/>
                    )}
                </div>
            </div>
        )
    }
}
export default RoomPage