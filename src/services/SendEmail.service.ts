import nodemailer from "nodemailer";
import User from "../models/People.model";
import config from 'config';
import Token from "../models/Email.model";
import { string } from 'zod';

export const  sendEmail = async (email:string, subject:string, message:string,isRegister?:boolean) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: 'zmamznan66@gmail.com',
                pass:''
            },
        });

        await transporter.sendMail({
            from: '"SUL" <zmamznan66@gmail.com>',
            to: email,
            subject: subject,
            text: message,
        });
        console.log('The email send successful ...');
        return true
    } catch (err) {
        if (isRegister) {
            let theUser = await User.findOne({email: email})
            if(theUser){
                await User.findOneAndRemove({email: email})
            }
        }
        throw new Error('The email  didn`t send...')
    }
}

export const CreateToken = async (
    id: string,
    email: string
) => {
    try {
        const URL = config.get<string>('host');
        const the_token = GenerateToken();
        const message = `http://192.168.1.9:3000/humen/verify/${id}/${the_token}`
        await sendEmail(email, 'Verify the Email', message,true)
        const tokenObj = await Token.create({
            HumenId: id,
            token: the_token
        });
        if (tokenObj) {
            // for production
            // return true
            return tokenObj
        } else {
            throw new Error("an error happened when save the token")
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const findUser = async (
    id: string,
    token: string
) => {
    const findById = await User.findById(id);
    if (findById) {
        const findToken = await Token.findOne({
            HumenId: findById._id,
            token: token
        })
        if (findToken) {
            await User.findByIdAndUpdate(id, {
                confirmEmail: true
            })
            await Token.findByIdAndDelete(findToken._id)
            return findById
        }
    }
} 


function GenerateToken() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCEFGHIJUVWXYZ0123456789"
    let the_token = new String()
    for (let i = 0; i < charset.length; i++) {
        the_token += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return the_token
}

