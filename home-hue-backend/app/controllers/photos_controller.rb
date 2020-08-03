require 'net/http'
require 'openssl'
require "uri"
require "json"

class PhotosController < ApplicationController

    def index
    photos=Photo.all
    render json: photo
    end

    def create
            image_url = photo_params['img_url']
            colorIndex=1   
        
                
                url = URI("https://image-color-tag.p.rapidapi.com/cloudVision/imageAttributesDetection")
            
                http = Net::HTTP.new(url.host, url.port)
                http.use_ssl = true
                http.verify_mode = OpenSSL::SSL::VERIFY_NONE
            
                request = Net::HTTP::Post.new(url)
                request["x-rapidapi-host"] = 'image-color-tag.p.rapidapi.com'
                request["x-rapidapi-key"] = 'ca14dfbae1msh2c3dd74df481cc5p117533jsn775062a7fcc8'
                request["content-type"] = 'application/json'
                request["accept"] = 'application/json'
                request.body = "{ \"source\": \"#{image_url}\", \"sourceType\": \"url\"}"
            
                response = http.request(request)
                result= JSON.parse(response.read_body)['dominantColors']
                colors={}
                colorIndex=1
                    result.each do |color|
                        colors["color#{colorIndex}"]= "RGB(#{color['red']}, #{color['green']}, #{color['blue']})"
                        
                        colorIndex +=1
                        if(colorIndex>3)
                            break
                        end
                    end
          
                colors['img_url']=image_url
                colors['room_id']=photo_params['room_id']

       photo=Photo.create(colors)
       render json: photo
         
    end

 

    private

    def photo_params
        params.require(:photo).permit!
    end

end
