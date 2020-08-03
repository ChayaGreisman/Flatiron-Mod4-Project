import React from 'react';
import RoomCard from '../components/RoomCard'
import NavBar from '../components/NavBar'
import { Button, Card, Image, Icon } from 'semantic-ui-react'


class HomeContainer extends React.Component{

    render(){

        

        return(
            <div>
                <NavBar history={this.props.history} currentUser={this.props.currentUser} logout={this.props.logout}/>
                
            
                {/* <img className="banner-img" src="./logobanner.png" alt="banner" /> */}

                {/* <img className="banner-img" src="./bannerimg2.png" alt="banner" /> */}

                <img className="logo-banner-img " src="./bannerimg3.png" alt="banner" />

                <img className="banner-img" src="./bannerimg5.gif" alt="banner" />

                {/* <img className="banner-img" src="./bannerimg1.png" alt="banner" /> */}

                <img onClick={()=>this.props.history.push('/login')} className="banner-img" src="./bannerimg4.png" alt="banner" />
        
                <img onClick={()=>this.props.history.push('/rooms')} className="banner-img" src="./roomsbanner.gif" alt="banner" />
      
                <div class="ui inverted vertical footer segment" style={{textAlign: 'center'}}>
                    <img src="./LogoWhite.png" alt="logo" className="navbar-logo"/>
                    <div></div>
                    <div class="ui container">
                        ©️ Tsering Norbu & Chaya Greisman  
                    </div>
                </div>

            </div>
            
        )
    }
}

export default HomeContainer