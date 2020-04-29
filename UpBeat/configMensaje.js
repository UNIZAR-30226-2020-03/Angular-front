const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: 'soporteupbeat@gmail.com', // Cambialo por tu email
 pass: 'proyectoupbeat' // Cambialo por tu password
}
});

const mailOptions = {
from: "Soporte UpBeat 👻 <soporte@upbeat.com>",
to: formulario.correo, // Cambia esta parte por el destinatario
subject: "Recuperación de contraseña",
html: `Hola ${formulario.nombre} ${formulario.apellidos},<br/><br/>
Hemos recibido una solicitud de recuperación de contraseña de su cuenta de UpBeat.<br/>
Los detalles de la cuenta y sus credenciales son las siguientes:<br/><br/>
<strong>Nombre de usuario:</strong> ${formulario.username}<br/>
<strong>E-mail:</strong> ${formulario.correo}<br/>
<strong>Contraseña:</strong> ${formulario.contrasenya}<br/>
<strong>País:</strong> ${formulario.pais}<br/><br/>
Si no has sido tu, por favor, contacta con nosotros inmediatamente.<br/>
En caso contrario, ignora este mensaje.<br/><br/>
Saludos,<br/><br/>
El equipo de UpBeat.
    `
};

transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}