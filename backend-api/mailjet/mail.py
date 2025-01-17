import os
from mailjet_rest import Client
import base64
from jinja2 import Template
from modules.config import sender, subject, api_key, api_secret

mailjet = Client(auth=(api_key, api_secret), version='v3.1')

def send_mail(recipient, attachment_path=None):
    
    html_template = """
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your E-Waste Collection is Confirmed!</title>
    <style>
        @media screen and (max-width: 600px) {
            .container {
                width: 100% !important;
            }
            .content {
                padding: 20px !important;
            }
            .header {
                padding: 30px 20px !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
            .steps {
                padding: 15px !important;
            }
            .icon {
                width: 60px !important;
                height: 60px !important;
            }
            .icon img {
                width: 40px !important;
                height: 40px !important;
                margin-top: 10px !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
            <td>
                <table role="presentation" class="container" align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 20px auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td class="header" style="padding: 40px 30px; text-align: center; background-color: #4CAF50;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Your E-Waste Collection is Confirmed!</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="padding: 30px;">
                            <p style="font-size: 16px; margin-bottom: 20px;">Dear Eco-Warrior,</p>
                            <p style="font-size: 16px; margin-bottom: 20px;">Thank you for taking a step towards a greener future! Your e-waste collection request has been successfully placed. Our eco-friendly agents are gearing up to collect your e-waste soon.</p>
                            <div class="steps" style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                                <h2 style="color: #2E7D32; margin-top: 0;">What's Next?</h2>
                                <ol style="margin: 0; padding-left: 20px;">
                                    <li style="margin-bottom: 10px;">Our agent will contact you to schedule a convenient pickup time.</li>
                                    <li style="margin-bottom: 10px;">Prepare your e-waste for collection by removing any personal data.</li>
                                    <li style="margin-bottom: 10px;">Our agent will arrive at the scheduled time to collect your e-waste.</li>
                                    <li>Sit back and relax, knowing you've made a positive impact on the environment!</li>
                                </ol>
                            </div>
                            <p style="font-size: 16px; margin-bottom: 20px;">Remember, every device recycled is a step towards a cleaner planet. You're not just disposing of old electronics; you're powering the future!</p>
                            
                            <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">Have questions or need support? We're here to help!</p>
                            <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">
                                <a href="mailto:support@ecosphere.com" style="color: #4CAF50; text-decoration: none; font-weight: bold;">support@myecosphere.tech</a>
                            </p>
                            <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">
                                Visit our website for more information:
                                <a href="https://www.myecosphere.tech" style="color: #4CAF50; text-decoration: none; font-weight: bold;">www.myecosphere.tech</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #4CAF50; padding: 20px; text-align: center;">
                            <p style="color: #ffffff; font-size: 14px; margin: 0;">Thank you for choosing EcoSphere for your e-waste recycling needs.</p>
                            <p style="color: #ffffff; font-size: 14px; margin: 10px 0 0;">Together, we're creating a sustainable future!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    """

    template = Template(html_template)
    html_content = template.render()

    data = {
        'Messages': [
            {
                "From": {
                    "Email": sender,
                    "Name": "Ecosphere"
                },
                "To": [
                    {
                        "Email": recipient,
                        "Name": "Eco-Warrior"
                    }
                ],
                "Subject": subject,
                "TextPart": "What's Next?",
                "HTMLPart": html_content,
                "Attachments": []
            }
        ]
    }

    if attachment_path:
        with open(attachment_path, "rb") as f:
            attachment_content = base64.b64encode(f.read()).decode()
            attachment = {
                "ContentType": "application/pdf",
                "Filename": os.path.basename(attachment_path),
                "Base64Content": attachment_content
            }
            data['Messages'][0]['Attachments'].append(attachment)

    result = mailjet.send.create(data=data)
    return result.status_code, result.json()
