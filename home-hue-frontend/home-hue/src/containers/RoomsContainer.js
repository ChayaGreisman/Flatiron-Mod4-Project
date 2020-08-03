import React from 'react';
import RoomCard from '../components/RoomCard'


class RoomsContainer extends React.Component {

    state = {
        search: '',
        sort: 'None'
    }

    handleSearchChange = (e) => {
        this.setState({search: e.target.value})
    }

    handleSortChange = (e) => {
        this.setState({sort: e.target.value})
    }

    render(){

        let publicRooms= this.props.rooms.filter(room=>room.pvt===false)
        let filteredRooms=publicRooms.filter(room=> room.name.concat(room.description, room.user.username).toLowerCase().includes(this.state.search.toLowerCase()))
        
        if (this.state.sort==='Top Ranked'){
            filteredRooms.sort((a,b)=> a.likes.length < b.likes.length ? 1 : -1)
        } else if (this.state.sort==='Most Recent'){
            filteredRooms.sort((a,b)=> a.created_at < b.created_at ? 1 : -1)
        }

        // let mostRecentRooms = publicRooms.slice(Math.max(publicRooms.length - 15, 0))
        // let mostRecentRooms = publicRooms.sort((a,b)=> a.created_at < b.created_at ? 1 : -1)
        // let mostLikedRooms = publicRooms.sort((a,b)=> a.likes.length < b.likes.length ? 1 : -1)

        return(

            <div>

                <i className="home basic huge icon" onClick={()=>this.props.history.push('/')} style={{marginLeft: '1em', marginTop: '1em', position: 'fixed', zIndex: '3' }}></i>
                <img className="rooms-banner-img" src="./roomsTitle.png" alt="banner" />
                <div className='rooms-container-content'>
                    

                    <div className="ui " id="sort">
                    <div className="field">
                        <label><strong>Sort By: </strong></label>
                        <select className="ui selection dropdown" value={this.state.sort} onChange={this.handleSortChange}>
                            <option value="None">None</option>
                            <option value="Top Ranked">Top Ranked</option>
                            <option value="Most Recent">Most Recent</option>
                        </select>
                    </div>
                    </div>

                    <div className="ui icon input" id="search">
                        <input className="navbar-search ui icon input" onChange={this.handleSearchChange} type="text" value= {this.state.search} placeholder="Search..."/>
                        <i className="circular search link icon"></i>
                    </div>

                </div>
                <div className="room-card-container">
                    {filteredRooms.map(room=>(<RoomCard key ={room.id} {...room} currentUser={this.props.currentUser} history={this.props.history} handleNewRoomLike={this.props.handleNewRoomLike} handleUnlike={this.props.handleUnlike} handleNewComment={this.props.handleNewComment} users={this.props.users} handleUnComment={this.props.handleUnComment} handleEditComment={this.props.handleEditComment}/>))}
                </div>
            </div>
            
        )
    }
}


export default RoomsContainer