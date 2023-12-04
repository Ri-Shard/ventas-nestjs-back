import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(customerData: any, orderDetails: any[]): any {
    const customerName = customerData.usr.nombre;
    const customerEmail = customerData.usr.correo;
    const itemsTable = this.buildItemsTable(orderDetails);
    const htmlContent = `
    <p>¡Hola!</p>
    <p>Se ha realizado una nueva venta. Aquí están los detalles:</p>
    <h2>Información del Cliente:</h2>
    <p><strong>Nombre:</strong> ${customerName}</p>
    <p><strong>Email:</strong> ${customerEmail}</p>
    
    <h2>Detalles del Pedido:</h2>
    ${itemsTable}
    
    <p>Gracias por tu atención.</p>
  `;

    this.mailerService.sendMail({
      to: 'camilacharrypagina@gmail.com',
      subject: 'Nueva Venta',
      html: htmlContent,
    });

    const json = {
      "status": "success",
      "message": "Se envio el correo"
  }

    return json;
  }

  private buildItemsTable(orderDetails: any[]): string {
    const tableRows = orderDetails.map(
      (item) =>
        `<tr>
          <td>${item.producto.id}</td>
          <td>${item.producto.nombre}</td>
          <td>${item.cantidad}</td>
          <td>${item.color}</td>
          <td>${item.talla}</td>
          <td>${item.producto.precio * item.cantidad}</td>
          
        </tr>`,
    );

    const tableHeader = `
      <tr>
        <th>Código</th>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Color</th>
        <th>Talla</th>
        <th>Total</th>
      </tr>
    `;

    const tableContent = `
      <table border="1">
        ${tableHeader}
        ${tableRows.join('')}
      </table>
    `;

    return tableContent;
  }
}
