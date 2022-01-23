import { getAppConfig } from "./app.config";
import * as https from 'https';

const { mailClientApiKey, mailClientSenderEmail } = getAppConfig()

export function sendEmail(recipientEmail: string, subject: string, title: string, text: string) {
    const body = {
        personalizations: [{
            to: [ {
                email: recipientEmail,
                name: recipientEmail     
            }],
        }],
        from: {
            email: mailClientSenderEmail,
            name: `${subject}`      
        },
        subject: "Your RTG report",
        content: [
          {
            type: "text/html",
            value: `
                <h1>${title}</h1>
                <p>${text}</p>
                <a href="http://ratethegame.supercollider.hr/">unsubscribe here</a>
            `
          }
        ],
      }

    const data = new TextEncoder().encode(
        JSON.stringify(body)
    )
    
    const options = {
        hostname: 'api.sendgrid.com',
        port: 443,
        path: '/v3/mail/send',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': `Bearer ${mailClientApiKey}`
        }
    }
    
    const request = https.request(options, (res: any) => {
        console.log('Mailer: ', res.statusCode)
        res.on('data', (d: any) => {
            process.stdout.write(d)
        })
    })
    
    request.on('error', (error: any) => {
        console.error(error)
    })
    
    request.write(data)
    request.end()
}


