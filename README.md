# Amazoom
**This is the client part of an online store of household and industrial equipment (a simple analogue of Amazon). You can find the backend [here](https://github.com/vladikEmmet/amazoom-server)**

## Description
The project is a simple online store of household and industrial equipment. The user can view the list of products, add them to the cart, and place an order. The administrator can add new products, delete them, and view the list of orders. Also the ability to administer the store if you have the appropriate rights (including deleting and adding new products and editing existing ones).

Each product has a rating and reviews that users can leave about it.

Using Redux Persist and React Query combined with axios caching requests allows you to work with state flexibly and quickly, and React Hook Form makes it possible to effectively work with forms, of which there are quite a lot on the site.

## Technologies
- Next.js, TypeScript, React, Redux, Redux Toolkit, Axios, Tailwind CSS, React Hook Form, React Query.

## Future development should focus on:
- Improving the UI and UX of the application;
- Improving website adaptability and responsiveness;
- Improving SEO and a11y.
- 
## Installation
First, run the development server:

```bash
npm install
```

Then, create a `.env.local` file in the root of the project and add the following variables:
```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
# ... other variables
```


Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying any page/component. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
