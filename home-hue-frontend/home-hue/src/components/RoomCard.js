import React from 'react'

 class RoomCard extends React.Component {
    
    state={
        commentId: '',
        edit: false,
        text: '',
        showComments: false
        
    }

    handleCommentsClick = () => {
        this.setState({showComments: !this.state.showComments})
    }

    handleChange = e => {
        this.setState({ text: e.target.value})
    }
    
    handleEnterComment = (e) => {
        if(e.key==='Enter'){ 
            if(this.props.currentUser){
                this.state.edit?this.patchComment():this.submitComment()
            } else {
                this.props.history.push('/login')
            }     
        } 
    }

    submitComment = e=> {
        fetch('http://localhost:3000/comments',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                text: this.state.text,
                user_id: this.props.currentUser.id,
                room_id: this.props.id
            })
        })
        .then(resp=>resp.json())
        .then(newComment => {
            this.props.handleNewComment(newComment)
            this.setState({text: ''})
        })
    }
    
    handleLikeClick = (e) => {
       
        if(this.props.currentUser){ 
            if (this.heartAppearance()){    
                this.deleteLike()
                
                // e.target.classList.remove('outline')
            } else {
                this.postLike()
                // e.target.classList.add('outline')
            } 
        } else {
            this.props.history.push('/login')
        }
    }

    deleteLike = () => {
       
        let likeId = this.props.likes.find(like=>like.user_id===this.props.currentUser.id).id
        
        fetch(`http://localhost:3000/likes/${likeId}`,{method: "DELETE",})
        this.props.handleUnlike(likeId, this.props.id)
       
        
    }

    postLike = () => {
        fetch('http://localhost:3000/likes', {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                room_id: this.props.id
            })
        })
        .then(resp=>resp.json())
        .then(newLike=> {
        console.log(newLike)
         this.props.handleNewRoomLike(newLike)
         
        })
        .catch(error=> console.log(error))
    }

     heartAppearance = () => {
        let fun=0
        if (this.props.currentUser){        
            if (this.props.likes.find(like=>like.user_id===this.props.currentUser.id)){
                fun=1
            } else {
                fun=0
            }
        } else {
         fun=0
        }
        
        return fun>0?true:false
    }

      getTimePassed=(updatedTime)=>{
        let milliseconds=Date.now() - new Date(updatedTime)
        let timePassed
         let seconds = Math.round(milliseconds/1000)
         let minutes=Math.round(milliseconds/(1000*60))
         let hours=Math.round(minutes/60)
         let days=Math.round(hours/24)
         let weeks=Math.round(days/7)
         let years=Math.round(weeks/52)
         if(years>0){
             timePassed=`${years} year${years>1 ? 's': ''}` 
         }else if(weeks>0){
             timePassed=`${weeks} week${weeks>1 ? 's': ''}`
         }else if(days>0){
             timePassed=`${days} day${days>1 ? 's': ''}`
         }else if(hours>0){
             timePassed=`${hours} hour${hours>1 ? 's': ''}`
         }else if(minutes>0){
             timePassed=`${minutes} minute${minutes>1 ? 's': ''}`
         }else timePassed=`${seconds} second${seconds>1 ? 's': ''}`
         return timePassed
     }


     deleteComment=(id)=>{
        fetch(`http://localhost:3000/comments/${id}`,{method: "DELETE"})
            this.props.handleUnComment(id, this.props.id) 
     }

     patchComment=()=>{
         
        fetch(`http://localhost:3000/comments/${this.state.commentId}`,
        {method: "PATCH",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            text: this.state.text
        })
         })
        .then(res=>res.json())
        .then(editedComment=>{
            this.props.handleEditComment( this.props.id, editedComment)
            this.setState({text: '', edit: false})
        })
    }

     handleChangeComment=(e,comment)=>{
        if(e.target.value==='delete'){
            this.deleteComment(comment.id)
        }else if(e.target.value==='edit'){
            this.setState({edit: true, commentId: comment.id, text: comment.text})
           
        }
    }

    renderEditAndDeleteComment=(comment)=>{
        if(comment.user_id===this.props.currentUser.id){
        return (
            <select selected='' className='final-choice' onChange={event=>this.handleChangeComment(event, comment)}>
            <option selected null hidden style={{display: 'none'}} value='b'></option>
            <option>delete</option>
            <option>edit</option>
           </select>
        )}
    }

    

     renderComment = (comment) => {
        let commentAuthor = this.props.users.find(user=>user.id===comment.user_id)
         
        return (
            <p className='comments'>
            <p><img style={{width: '20px', height: '20px'}}className="ui avatar image" src={commentAuthor.image_url} alt="user"/>
                <strong>@{commentAuthor.username}</strong>
                <span className="right floated">
                    <small>{this.getTimePassed(comment.updated_at)}</small>
                       {this.props.currentUser&&this.renderEditAndDeleteComment(comment)}
                    </span></p>
            <p>{comment.text}</p>
            </p>
            )
    }


    render(){

        return(   
                    
        <div className="ui card room-card" >
            <div className="content">
                <div className="right floated meta">{this.getTimePassed(this.props.created_at)} ago</div>
                <img className="ui avatar image" src={this.props.user.image_url} alt="user"/> @{this.props.user.username}
            </div>
            <div className="image">
                <img className='room-image' src={this.props.img_url} alt={this.props.name}/>
            </div>

            <div className="extra content" style={{backgroundColor: 'lightGrey'}}>
                <div className="center aligned">
                    <button onClick={()=>this.props.history.push(`/rooms/${this.props.id}`)} className="ui basic button ">
                    <i className="eye icon"></i>
                        View Room
                    </button>
                </div>
            </div>
            
            <div className="content">
                <h5><strong>{this.props.name}</strong></h5>
                {this.props.description}
            </div>
            <div className="content">
                <span className="right floated">
                {this.heartAppearance()?<i onClick={this.handleLikeClick} className=  "heart red like icon"></i>
                :<i onClick={(e)=>this.handleLikeClick()} className=  "heart outline red like icon"></i>}
                {this.props.likes.length}
                </span>
                <span onClick={this.handleCommentsClick}>
                    <i className="comment icon"></i>
                    {this.props.comments.length} comment{this.props.comments.length!==1 ? 's' : ''}
                </span>
                <br/>
                <hr/>
               
                {this.state.showComments && this.props.comments.map(comment=>this.renderComment(comment))}
            </div>
            <div className="extra content">
                <div className="ui large transparent left icon input">
                <i className="heart outline icon"></i>
                <input type="text"  value={this.state.text} onKeyDown={this.handleEnterComment}  onChange={this.handleChange} placeholder="Add Comment..."/>
                </div>
            </div>
        </div> 
    
        )
    }
}


export default RoomCard