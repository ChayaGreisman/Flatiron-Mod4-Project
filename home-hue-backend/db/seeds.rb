# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comment.delete_all
Photo.delete_all
Like.delete_all
Room.delete_all
User.delete_all

user2=User.create(name: 'Tsering', username: 'tsering', password: '123', email: '123@321.to', image_url: 'https://ca.slack-edge.com/T02MD9XTF-U012Z0KTBTP-ccd5ca6c499c-512')
user1=User.create(name: 'Chaya', username: 'chaya', password: '123', email: '123@321.to',image_url: 'https://ca.slack-edge.com/T02MD9XTF-U013D0MNMEV-5c8e0c26c74b-512')
r1=Room.create(user_id: user1.id, name: 'kitchen', description: 'goin for a rustic feel', img_url:'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80', pvt: false)

