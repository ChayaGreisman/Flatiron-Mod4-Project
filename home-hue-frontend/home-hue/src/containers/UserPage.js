import React from 'react';
import RoomCard from '../components/RoomCard'

import {  Modal, Header } from 'semantic-ui-react'


class UserPage extends React.Component{

    state = { 
        
        modalOpen: false,
        modalEditUserOpen: false,
        room: {
            user_id: this.props.currentUser.id,
            name: '',
            description: '',
            img_url: '',
            pvt: false
        },
        editUser: {
            name: this.props.currentUser.name,
            username: this.props.currentUser.username,
            email: this.props.currentUser.email,
            password: this.props.currentUser.password,
            image_url: this.props.currentUser.image_url,
        }
    
    }


    handleEditUserOpen = () => this.setState({ modalEditUserOpen: true })

    handleEditUserClose = () => this.setState({ modalEditUserOpen: false })

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    getUsersRooms = () => {
        let userRooms = this.props.rooms.filter(room => room.user_id===this.props.currentUser.id)
        return userRooms.map(room=>(<RoomCard key ={room.id} {...room} currentUser={this.props.currentUser} handleNewRoomLike={this.props.handleNewRoomLike} handleUnlike={this.props.handleUnlike} handleNewComment={this.props.handleNewComment} history={this.props.history} users={this.props.users} handleUnComment={this.props.handleUnComment} handleEditComment={this.props.handleEditComment} />))
    }

    handleChange = (e) => {
        this.setState({room: {...this.state.room, [e.target.name]: e.target.value}})
    }

    handleCheck = (e) => {
        this.setState({room: {...this.state.room, pvt: !this.state.room.pvt} })
    }

    toTitleCase= (str)=>{
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/rooms', {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.room.user_id,
                name: this.toTitleCase(this.state.room.name),
                description: this.state.room.description,
                img_url: this.state.room.img_url,
                pvt: this.state.room.pvt
             })
        })
        .then(resp=>resp.json())
        .then(newRoom=> {
        this.props.handleNewRoom(newRoom)
        this.setState({
            room: {
                user_id: this.props.currentUser.id,
                name: '',
                description: '',
                img_url: '',
                pvt: false
            }
        })
        this.handleClose()  
        })
    }

    newRoomForm = () => {

        const {name, description, img_url,pvt} = this.state.room

    return (<form onSubmit={this.handleSubmit} >
            <div className="ui large form" id="login-form" >
            <h2>Create a Room</h2>
            <div className="two fields">
            <div className="field">
                <input onChange={this.handleChange} name='name' value={name} className = "input" placeholder="Room Name" type="text"/>
            </div>
            
            </div>
                <div className="two fields">
                    <div className="field">
                        <textarea rows="3" onChange={this.handleChange}  name='description' value={description} className = "input" placeholder="Description"/>
                    </div>
                </div>

                <div className="two fields">
                    <div className="field">
                        <input onChange={this.handleChange}  name='img_url' value={img_url} className = "input" placeholder="Main Room Image URL Here" type="text"/>
                    </div>
                </div>

                <div className="field"> 
                    <div className="ui toggle checkbox">
                        <input onChange={this.handleCheck} checked={pvt} type="checkbox" name="pvt"/>
                        <label style={{color: "grey"}}>Make this room private</label>
                    </div>
                </div>
            
        
            <button className="ui submit grey button" type='submit' >Create Room</button>
            <button className="ui submit grey button" onClick={this.handleClose}>Cancel</button>
        </div>
        </form>)
    }

    

   roomFormModal = () => (
    <Modal
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'>
    
        <Header  />
        <Modal.Content>
        {this.newRoomForm()}
        </Modal.Content>
    </Modal>
   )

   handleEditUserChange = (e) => {
    this.setState({editUser: {...this.state.editUser, [e.target.name]: e.target.value}}) 
   }

   handleEditUserSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: this.toTitleCase(this.state.editUser.name),
                username: this.state.editUser.username.toLowerCase(),
                email: this.state.editUser.email,
                password: this.state.editUser.password,
                image_url: this.state.editUser.image_url
            })
        })
        .then(resp=>resp.json())
        .then(editedUser=>{
            this.props.handleEditedUser(editedUser)
            this.props.updateCurrentUser(editedUser)
            this.handleEditUserClose()
        })
   }

    editUserForm = () => {

        const {name, username, email, password, image_url} = this.state.editUser

        return (<form onSubmit={this.handleEditUserSubmit} >
                    <div className="ui large form" id="login-form" >
                        <h2>Edit Your Account</h2>

                        <div className="two fields">
                            <div className="field">
                                <label style={{color: 'grey'}}>Name</label>
                                <input onChange={this.handleEditUserChange} name='name' value={name} className = "input" placeholder="Name" type="text"/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="field">
                                <label style={{color: 'grey'}}>Username</label>
                                <input onChange={this.handleEditUserChange}  name='username' value={username} className = "input" placeholder="Username" type="text"/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="field">
                                <label style={{color: 'grey'}}>Email</label>
                                <input onChange={this.handleEditUserChange}  name='email' value={email} className = "input" placeholder="Email" type="email"/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="field">
                                <label style={{color: 'grey'}}>Password</label>
                                <input onChange={this.handleEditUserChange}  name='password' value={password} className = "input" placeholder="Password" type="password" onClick={(e)=>{e.target.type==='password' ? e.target.type='text' : e.target.type='password'}}/>
                            </div>
                        </div>

                        <div className="two fields">
                            <div className="field">
                                <label style={{color: 'grey'}}>Profile Picture</label>
                                <input onChange={this.handleEditUserChange}  name='image_url' value={image_url} className = "input" placeholder="Profile Image URL here...." type="text"/>
                            </div>
                        </div>
                    

                    
                        <button className="ui submit grey button" type='submit'>Edit Account</button>
                        <button className="ui submit grey button" onClick={this.handleEditUserClose}>Cancel</button>
                    </div>
                </form>)
    }

   editUserFormModal = () => (
    <Modal
        open={this.state.modalEditUserOpen}
        onClose={this.handleEditUserClose}
        basic
        size='small'>
    
        <Header  />
        <Modal.Content>
        {this.editUserForm()}
        </Modal.Content>
    </Modal>
   )
        

    render(){
        return(
            <div>
                {this.editUserFormModal()}
                {this.roomFormModal()}
                <div className="user-page-nav">
                    <i onClick={()=>this.props.history.push('/')}  className="home basic icon big user-page-icon"></i>
                    <i  onClick={this.handleEditUserOpen} className="pencil icon big user-page-icon" ></i>
                    <i onClick={this.handleOpen} className="add sign icon big user-page-icon"></i>
                </div>
                <div className="user-header-info">
                    <img className="main-profile-picture" src={this.props.currentUser.image_url} alt={this.props.currentUser.name}/>
                    <div className='user-title-name'>
                        <h2>{this.props.currentUser.name}</h2>
                        <h6>@{this.props.currentUser.username}</h6>
                        {/* <h5>{this.props.currentUser.email}</h5> */}
                    </div> 
                </div>

                <div className="room-card-container user-room-cards">
                {this.getUsersRooms()}
                </div>
            </div>
        )
    }

}

export default UserPage