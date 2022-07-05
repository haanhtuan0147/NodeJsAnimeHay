const token=require('./createtoken');
const dotenv=require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const Gmail=require('../repository/Gmail')
const Repository = new Gmail();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports=class Gmail {
     ramdom(){
        return (Math.floor(Math.random()*(99999 - 10000) )+ 10000).toString()
    }
     Gmail = async (item) => {
         try {
            console.log(item)
            var Email=/^[a-z0-9](.?[a-z0-9]){5,}@gmail.com$/g
            if (!item.Email.match(Email)) {
                return Promise.reject({message :"failed create gmail"} );
            }
           item.NumberAcces=this.ramdom();
           const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
          );
        
          oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
          });
          const accessToken =await new Promise((resolve, reject) => {
              oauth2Client.getAccessToken((err, token) => {
              if (err) {
                  
                  resolve(null);
              }
              resolve(token);
            });
          })
          //console.log(accessToken)
          if(!accessToken)
          return Promise.reject({message :"failed create gmail Accectoken"} );
        
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.Gmail,
              accessToken,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN
            }
          });
           var mailOptions = {
            from: process.env.Gmail,
            to: item.Email,
            subject: 'Gửi email dùng Node.js --- dammio.com',
            text: item.numberCheck
          }
           transporter.sendMail(mailOptions,function(error, info){
            if(error){
                console.log(error)
            }
            else{
                console.log(info)

            }
          })
            //if(!transporters)
            //return Promise.reject({message :"failed Seed gmail"} )
            const rs=await Repository.create(item);
                if(rs) {
                    return Promise.resolve({
                    message : "Sucsuess"
                })
                }
         return Promise.reject({message :"failed create gmail"} )
             
         } catch (error) {
            return Promise.reject({message :"failed send gmail"} )
         }

                    
    }
    CheckNumberRegisterToken=async (item) => {
        try {
            console.log(item)
           const rs = await Repository.findItem({Email:item.Email});
           //console.log(rs)
           if (Object.keys(rs).length == 0) {
               return Promise.reject({message :"Not NumberAcces Found"} );
           }
           const Datecreate=new Date(rs[0].CreateDate);
           const Datenow=new Date();
           if(Datecreate.getTime()-(Datenow.getTime()+25200000)>-300000&&item.NumberAcces==Number(rs[0].NumberAcces))
           return Promise.resolve(rs);
           return Promise.reject({message :"Incorrect check number"});
            
        } catch (error) {
           return Promise.reject({message :error});
        }
    
    }
}