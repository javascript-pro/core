# Goldlabel Core

Entirely working Next.js App. Free to use and modify as ever.  
Always Free & Open Source.

✅ Newest Features

Email alerts with [Resend](https://resend.com)

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'goldlabel.apps@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});
```

- Lingua
- Bouncer
- CV
- Flickr

![OG Image](https://goldlabel.pro/png/cartridges/lingua.png)
