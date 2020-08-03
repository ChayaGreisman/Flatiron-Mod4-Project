import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomeContainer from './containers/HomeContainer'
import RoomsContainer from './containers/RoomsContainer'
import UserPage from './containers/UserPage'
import Login from './components/Login'
import RoomPage from './containers/RoomPage'

class  App extends React.Component {
state={
    users: [],
    rooms:[],
    currentUser: null
  }

  componentDidMount(){
        fetch("http://localhost:3000/users")
        .then(resp=>resp.json())
        .then(users=> this.setState({users}))

        fetch("http://localhost:3000/rooms")
        .then(resp=>resp.json())
        .then(rooms=> this.setState({rooms}))
  }

  handleNewUser = (newUser) => {
    this.setState({users: [...this.state.users, newUser]})
  }

  handleEditedUser = (editedUser) => {
    let newUsersArray = this.state.users.map(user=>{
      if (editedUser.id===user.id){
        return editedUser
      }
      return user
    })
    this.setState({users: newUsersArray})
  }

  updateCurrentUser = (editedUser) => {
    this.setState({currentUser: editedUser})
  }

  handleNewRoom = (newRoom) => {
    console.log(newRoom)
    this.setState({rooms: [...this.state.rooms, newRoom]})
  }

  handleDeleteRoom = (roomId) => {
    let newRoomsArray = this.state.rooms.filter(room=> room.id !== roomId)
    this.setState({rooms: newRoomsArray})
  }

  handleNewRoomLike =(newLike) => {
    let newRoomsArray = this.state.rooms.map(room=>{
      if (room.id===newLike.room_id){
        return {...room, likes:[...room.likes, newLike]}
      }
      return room
    })
    this.setState({rooms: newRoomsArray})
  }

  handleNewComment =(newComment) => {
    let newRoomsArray = this.state.rooms.map(room=>{
      if (room.id===newComment.room_id){
        return {...room, comments:[...room.comments, newComment]}
      }
      return room
    })
    this.setState({rooms: newRoomsArray})
  }

  handleNewRoomPhoto =(newPhoto) => {
    let newRoomsArray = this.state.rooms.map(room=>{
      if (room.id===newPhoto.room_id){
        return {...room, photos:[...room.photos, newPhoto]}
      }
      return room
    })
    this.setState({rooms: newRoomsArray})
  }

  handleUnlike = (likeId, roomId) => {
    let room = this.state.rooms.find(room=> room.id===roomId)
    let editedRoom ={...room, likes: [...room.likes.filter(like=>like.id !== likeId)]}
    console.log('clicked Delete!' , 'like id', likeId, 'Room id', roomId)
    let newRoomsArray = this.state.rooms.map(room=>{
      if (room.id===roomId){
        return editedRoom
      }
      return room
    })

    this.setState({rooms: newRoomsArray})
  }

  handleEditComment=(roomId, editedComment)=>{
    console.log(editedComment)
    let toBeEditedRoom=this.state.rooms.find(room=> room.id==roomId)
    let editedRoom={...toBeEditedRoom, comments:toBeEditedRoom.comments.map(comment=>{
      if(comment.id===editedComment.id){
        return editedComment
      }else return comment
    })}

    this.setState({rooms: [...this.state.rooms.map(room=>{
      if(room.id===roomId){
        return editedRoom
      }else return room
    }) ]})
  }

  handleUnComment = (commentId, roomId) => {
    let room = this.state.rooms.find(room=> room.id===roomId)
    let editedRoom ={...room, comments: [...room.comments.filter(comment=>comment.id !== commentId)]}
    let newRoomsArray = this.state.rooms.map(room=>{
      if (room.id===roomId){
        return editedRoom
      }
      return room
    })
    
    this.setState({rooms: newRoomsArray})
  }

  setCurrentUser=(user)=>{
    this.setState({currentUser: user})

  }

  logout = () => {
    this.setState({currentUser: null})
  }

  



  render(){
   
    return (
      <Router>
        <div>
        
          <Route exact path="/" render= {routerProps => <HomeContainer {...routerProps} rooms={this.state.rooms} currentUser={this.state.currentUser} logout={this.logout} handleNewRoomLike={this.handleNewRoomLike} handleUnlike={this.handleUnlike}/>} />
          <Route exact path="/login" render={routerProps=>
              <Login {...routerProps} users={this.state.users} setCurrentUser={this.setCurrentUser} handleNewUser={this.handleNewUser}/>
            }/>
          <Route exact path='/@:id' render= {routerProps => <UserPage {...routerProps} currentUser={this.state.currentUser} rooms={this.state.rooms} handleNewRoom={this.handleNewRoom} handleNewRoomLike={this.handleNewRoomLike} handleUnlike={this.handleUnlike} handleEditedUser={this.handleEditedUser} updateCurrentUser={this.updateCurrentUser} handleNewComment={this.handleNewComment} users={this.state.users} handleUnComment={this.handleUnComment} handleEditComment={this.handleEditComment} />} />
          <Route exact  path ='/rooms/:id' render={routerProps=><RoomPage {...routerProps} rooms={this.state.rooms} currentUser={this.state.currentUser} handleDeleteRoom={this.handleDeleteRoom} handleNewRoomPhoto={this.handleNewRoomPhoto}/>}/>
          <Route exact path='/rooms' render={routerProps=><RoomsContainer {...routerProps} rooms={this.state.rooms} currentUser={this.state.currentUser}  handleNewRoomLike={this.handleNewRoomLike} handleUnlike={this.handleUnlike} handleNewComment={this.handleNewComment} users={this.state.users} handleUnComment={this.handleUnComment} handleEditComment={this.handleEditComment}/>}/>
        </div>
      </Router>
    )
  }
}

export default App;
