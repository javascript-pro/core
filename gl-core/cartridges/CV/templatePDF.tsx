export const templatePDF = (html: string) => {
    return `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            body {
              font-family: 'Roboto', sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .content {
                margin: 0.75in;
            }
            h1, h2, h3, h4, h5, h6 {
              color: #222;
              margin-top: 1.2em;
            }
            a {
              color: #444;
              text-decoration: none;
            }
            a:hover {
              color: #000;
            }
          </style>
        </head>
        <body>
            <div class="content">
                ${html}
            </div>
        </body>
      </html>
    `;
}