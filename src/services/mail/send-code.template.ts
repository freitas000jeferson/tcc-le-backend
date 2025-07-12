export const SendCodeTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Bora Talk - Código de Confirmação</title>
    <style>
      body {
        background-color: #f2f4f6;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .email-wrapper {
        width: 100%;
        background-color: #f2f4f6;
        padding: 20px;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .header {
        background-color: #7966fe;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .body {
        padding: 30px;
        text-align: center;
        color: #333333;
      }
      .body p {
        font-size: 16px;
        margin: 0 0 20px;
      }
      .code {
        display: inline-block;
        padding: 12px 24px;
        background-color: #7966fe;
        color: #ffffff;
        font-size: 22px;
        letter-spacing: 4px;
        border-radius: 6px;
        margin: 10px 0;
        text-decoration: none;
      }
      .footer {
        border-top: 1px solid #ddd;
        background-color: #f2f4f6;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-content">
        <div class="header">
          Bora Talk
        </div>
        <div class="body">
          <p>Olá!</p>
          <p>Seu código de confirmação está abaixo. Use-o para continuar:</p>
          <div class="code">{{code}}</div>
          <p>Se você não solicitou este código, basta ignorar este e-mail.</p>
        </div>
        <div class="footer">
          &copy; 2025 Bora Talk. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </body>
</html>
`;
