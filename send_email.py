import os
import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg.set_content("Pipeline executado com sucesso!")
msg["Subject"] = "CI/CD Pipeline OK"
msg["From"] = os.getenv("EMAIL_USER")
msg["To"] = os.getenv("EMAIL")

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))
    server.send_message(msg)
